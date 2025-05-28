/**
 * 雪花算法字符串生成器。
 *
 * 用于生成分布式唯一字符串 ID，基于时间戳、工作线程 ID、服务端口 ID 和序列号。
 *
 * @example
 * const snowflake = new FESnowflake(1, 1);
 * const id = snowflake.nextId();
 */
export class FESnowflake {
  /**
   * 雪花算法起始时间戳（毫秒）。
   */
  private static readonly EPOCH = new Date('2023-03-30').getTime();
  /**
   * 工作线程 ID 占用的比特数。
   */
  private static readonly WORKER_ID_BITS = 4;
  /**
   * 服务端口 ID 占用的比特数。
   */
  private static readonly PORT_ID_BITS = 4;
  /**
   * 序列号占用的比特数。
   */
  private static readonly SEQUENCE_BITS = 12;

  /**
   * 当前实例的工作线程 ID。
   */
  private readonly workerId: number;
  /**
   * 当前实例的服务端口 ID。
   */
  private readonly portId: number;
  /**
   * 当前毫秒内的序列号。
   */
  private sequence: number = 0;
  /**
   * 上一次生成 ID 的时间戳。
   */
  private lastTimestamp: number = -1;

  /**
   * 创建雪花算法实例。
   * @param workerId - 工作线程 ID（0-15）
   * @param portId - 服务端口 ID（0-15）
   * @throws {Error} 如果 workerId 或 portId 超出范围
   */
  constructor(workerId: number, portId: number) {
    if (workerId < 0 || workerId >= 1 << FESnowflake.WORKER_ID_BITS) {
      throw new Error(`线程id必须在0-${(1 << FESnowflake.WORKER_ID_BITS) - 1}之间`);
    }
    if (portId < 0 || portId >= 1 << FESnowflake.PORT_ID_BITS) {
      throw new Error(`服务id必须在0-${(1 << FESnowflake.PORT_ID_BITS) - 1}之间`);
    }
    this.workerId = workerId;
    this.portId = portId;
  }

  /**
   * 生成下一个唯一字符串 ID。
   * @returns 唯一字符串 ID
   * @throws {Error} 如果系统时间回退
   */
  public nextId(): string {
    let timestamp = this.getCurrentTimestamp();

    if (timestamp < this.lastTimestamp) {
      throw new Error('系统时间错误');
    }

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & ((1 << FESnowflake.SEQUENCE_BITS) - 1);
      if (this.sequence === 0) {
        timestamp = this.waitNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0;
    }

    this.lastTimestamp = timestamp;

    const id = (timestamp - FESnowflake.EPOCH).toString() + this.workerId + this.portId + this.sequence;
    return id;
  }

  /**
   * 获取当前时间戳（毫秒）。
   * @returns 当前时间戳
   */
  private getCurrentTimestamp(): number {
    return Date.now();
  }

  /**
   * 等待直到下一个毫秒。
   * @param lastTimestamp - 上一次的时间戳
   * @returns 新的时间戳
   */
  private waitNextMillis(lastTimestamp: number): number {
    let timestamp = this.getCurrentTimestamp();
    while (timestamp <= lastTimestamp) {
      timestamp = this.getCurrentTimestamp();
    }
    return timestamp;
  }
}
