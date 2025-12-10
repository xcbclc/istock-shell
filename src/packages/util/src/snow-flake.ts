/**
 * 前端雪花算法（FE Snowflake）- 分布式唯一ID生成器
 *
 * 用于前端分布式环境生成全局唯一的字符串ID，适用场景：
 * - WebWorker 通讯消息ID标识
 * - IndexedDB 数据库主键生成
 * - 前端点对点消息传输唯一标识
 * - 分布式前端应用的会话ID
 *
 * ## 算法原理
 *
 * 基于Twitter雪花算法改进，生成64位整数ID，然后转换为Base62字符串：
 *
 * ```
 * 64位ID结构：
 * +----------+----------+----------+----------+
 * | 时间戳   | 数据中心 | 工作节点 | 序列号   |
 * | 42位     | 5位      | 5位      | 12位     |
 * +----------+----------+----------+----------+
 * ```
 *
 * ### 各部分说明：
 *
 * 1. **时间戳（42位）**：
 *    - 记录ID生成时的毫秒时间戳（相对于epoch起始时间）
 *    - 支持约139年的时间范围（2^42 / (1000 * 60 * 60 * 24 * 365) ≈ 139年）
 *    - 确保时间维度的唯一性
 *
 * 2. **数据中心ID（5位）**：
 *    - 支持32个不同的数据中心（2^5 = 32）
 *    - 用于区分不同的部署环境或地理位置
 *
 * 3. **工作节点ID（5位）**：
 *    - 支持32个不同的工作节点（2^5 = 32）
 *    - 用于区分同一数据中心内的不同实例
 *
 * 4. **序列号（12位）**：
 *    - 同一毫秒内的递增序列（2^12 = 4096）
 *    - 支持每毫秒生成4096个不同ID
 *    - 序列溢出时等待下一毫秒
 *
 * ### 唯一性保证机制：
 *
 * 1. **时间唯一性**：不同时间戳确保基础唯一性
 * 2. **空间唯一性**：数据中心ID + 工作节点ID 确保不同实例间唯一
 * 3. **序列唯一性**：同一毫秒内通过递增序列号保证唯一
 * 4. **时钟回退保护**：检测系统时钟回退并抛出异常
 *
 * ### 性能特点：
 *
 * - **高性能**：纯内存操作，无需网络通信
 * - **高并发**：每毫秒可生成4096个ID
 * - **趋势递增**：ID大致按时间顺序递增，有利于数据库索引
 * - **紧凑性**：Base62编码生成较短的字符串表示
 *
 * @example
 * ```typescript
 * // 基本使用
 * const snowflake = new FESnowflake(1, 1);
 * const id = snowflake.nextId(); // 生成类似 "2aB9xK7mN" 的ID
 *
 * // 批量生成
 * const ids = snowflake.nextIds(100);
 *
 * // 解析ID信息（调试用）
 * const info = snowflake.parseId(id);
 * console.log(info); // { timestamp, datacenterId, workerId, sequence }
 *
 * // 多实例部署
 * const worker1 = new FESnowflake(1, 1); // 数据中心1，工作节点1
 * const worker2 = new FESnowflake(2, 1); // 数据中心1，工作节点2
 * const worker3 = new FESnowflake(1, 2); // 数据中心2，工作节点1
 * ```
 */
export class FESnowflake {
  private readonly epoch: number = 1640995200000; // 2022-01-01 00:00:00 UTC
  private readonly workerIdBits: number = 5;
  private readonly datacenterIdBits: number = 5;
  private readonly sequenceBits: number = 12;
  private readonly timestampBits: number = 42; // 明确定义时间戳位数

  private readonly maxWorkerId: number = (1 << this.workerIdBits) - 1; // 31
  private readonly maxDatacenterId: number = (1 << this.datacenterIdBits) - 1; // 31
  private readonly maxSequence: number = (1 << this.sequenceBits) - 1; // 4095
  private readonly maxTimestamp: bigint = (1n << BigInt(this.timestampBits)) - 1n; // 时间戳最大值

  private readonly workerIdShift: number = this.sequenceBits;
  private readonly datacenterIdShift: number = this.sequenceBits + this.workerIdBits;
  private readonly timestampShift: number = this.sequenceBits + this.workerIdBits + this.datacenterIdBits;

  private workerId: number;
  private datacenterId: number;
  private sequence: number = 0;
  private lastTimestamp: number = -1;

  /**
   * 构造函数
   * @param workerId 工作机器ID (0-31)
   * @param datacenterId 数据中心ID (0-31)
   */
  constructor(workerId: number = 0, datacenterId: number = 0) {
    if (workerId > this.maxWorkerId || workerId < 0) {
      throw new Error(`Worker ID must be between 0 and ${this.maxWorkerId}`);
    }
    if (datacenterId > this.maxDatacenterId || datacenterId < 0) {
      throw new Error(`Datacenter ID must be between 0 and ${this.maxDatacenterId}`);
    }

    this.workerId = workerId;
    this.datacenterId = datacenterId;
  }

  /**
   * 生成下一个唯一ID
   * @returns 唯一的字符串ID
   */
  nextId(): string {
    let timestamp = this.getCurrentTimestamp();

    // 如果当前时间小于上次生成ID的时间，说明系统时钟回退了
    if (timestamp < this.lastTimestamp) {
      throw new Error(
        `Clock moved backwards. Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`
      );
    }

    // 如果是同一毫秒内生成的，则序列号自增
    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & this.maxSequence;
      // 如果序列号溢出，则等待下一毫秒
      if (this.sequence === 0) {
        timestamp = this.waitNextMillis(this.lastTimestamp);
      }
    } else {
      // 不同毫秒内，序列号重置为0
      this.sequence = 0;
    }

    this.lastTimestamp = timestamp;

    // 使用BigInt生成64位ID，避免精度丢失
    const timestampBig = BigInt(timestamp - this.epoch);

    // 检查时间戳是否超出范围
    if (timestampBig > this.maxTimestamp) {
      throw new Error(
        `Timestamp exceeds maximum value. Current: ${timestampBig}, Max: ${this.maxTimestamp}. ` +
          `This epoch (${new Date(this.epoch).toISOString()}) can only support timestamps until ${new Date(this.epoch + Number(this.maxTimestamp)).toISOString()}`
      );
    }

    const datacenterIdBig = BigInt(this.datacenterId);
    const workerIdBig = BigInt(this.workerId);
    const sequenceBig = BigInt(this.sequence);

    const id =
      (timestampBig << BigInt(this.timestampShift)) |
      (datacenterIdBig << BigInt(this.datacenterIdShift)) |
      (workerIdBig << BigInt(this.workerIdShift)) |
      sequenceBig;

    // 转换为字符串并返回
    return this.toBase62BigInt(id);
  }

  /**
   * 获取当前时间戳
   * @returns 当前时间戳
   */
  private getCurrentTimestamp(): number {
    return Date.now();
  }

  /**
   * 等待下一毫秒
   * @param lastTimestamp 上次时间戳
   * @returns 新的时间戳
   */
  private waitNextMillis(lastTimestamp: number): number {
    let timestamp = this.getCurrentTimestamp();
    while (timestamp <= lastTimestamp) {
      timestamp = this.getCurrentTimestamp();
    }
    return timestamp;
  }

  /**
   * 将BigInt转换为Base62字符串（更短的字符串表示）
   * @param num 要转换的BigInt
   * @returns Base62字符串
   */
  private toBase62BigInt(num: bigint): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    let n = num < 0n ? -num : num;
    if (n === 0n) return '0';

    while (n > 0n) {
      result = chars[Number(n % 62n)] + result;
      n = n / 62n;
    }

    return result;
  }

  /**
   * 生成批量ID
   * @param count 生成数量
   * @returns ID数组
   */
  nextIds(count: number): string[] {
    const ids: string[] = [];
    for (let i = 0; i < count; i++) {
      ids.push(this.nextId());
    }
    return ids;
  }

  /**
   * 获取ID信息（用于调试）
   * @param id 要解析的ID字符串
   * @returns ID信息对象
   */
  parseId(id: string): { timestamp: number; datacenterId: number; workerId: number; sequence: number } {
    const num = this.fromBase62BigInt(id);

    const sequence = Number(num & BigInt(this.maxSequence));
    const workerId = Number((num >> BigInt(this.workerIdShift)) & BigInt(this.maxWorkerId));
    const datacenterId = Number((num >> BigInt(this.datacenterIdShift)) & BigInt(this.maxDatacenterId));
    const timestamp = Number(num >> BigInt(this.timestampShift)) + this.epoch;

    return {
      timestamp,
      datacenterId,
      workerId,
      sequence,
    };
  }

  /**
   * 将Base62字符串转换为BigInt
   * @param str Base62字符串
   * @returns BigInt
   */
  private fromBase62BigInt(str: string): bigint {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = 0n;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const index = chars.indexOf(char);
      if (index === -1) {
        throw new Error(`Invalid character in Base62 string: ${char}`);
      }
      result = result * 62n + BigInt(index);
    }

    return result;
  }
}
