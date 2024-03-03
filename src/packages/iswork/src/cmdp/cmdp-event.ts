import type { TCmdpInfo, TCmdpMessage } from '../types';
import { Cmdp } from './cmdp';

/**
 * 事件协议实现
 */
export class CmdpEvent extends Cmdp {
  constructor(msgOrInfo: TCmdpMessage | TCmdpInfo) {
    super(msgOrInfo, { protocol: 'event://' });
  }
}
// Event
