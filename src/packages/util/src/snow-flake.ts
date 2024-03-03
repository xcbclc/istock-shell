/**
 * 雪花算法字符串
 */
export class FESnowflake {
  private static readonly EPOCH = new Date('2023-03-30').getTime();
  private static readonly WORKER_ID_BITS = 4;
  private static readonly PORT_ID_BITS = 4;
  private static readonly SEQUENCE_BITS = 12;

  private readonly workerId: number;
  private readonly portId: number;
  private sequence: number = 0;
  private lastTimestamp: number = -1;

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

  private getCurrentTimestamp(): number {
    return Date.now();
  }

  private waitNextMillis(lastTimestamp: number): number {
    let timestamp = this.getCurrentTimestamp();
    while (timestamp <= lastTimestamp) {
      timestamp = this.getCurrentTimestamp();
    }
    return timestamp;
  }
}
