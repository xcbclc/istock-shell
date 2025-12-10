import { BaseModel, Model, PrimaryColumn, Index, Column } from '@istock-shell/iswork';

/**
 * 历史记录模型
 * 用于存储终端命令执行的历史记录
 */
@Model('history')
export class HistoryModel extends BaseModel {
  @PrimaryColumn()
  id!: number | string;

  /**
   * 命令名称/关键字
   */
  @Index()
  @Column()
  cmd!: string;

  /**
   * 完整的用户输入内容
   */
  @Column()
  input!: string;

  /**
   * 命令执行输出结果
   * 存储结构化数据用于前端渲染组件
   */
  @Column()
  output!: Array<{ messageId: string; component: string; props: Record<string, any> }>;

  /**
   * 命令来源
   */
  @Column()
  source!: string;

  /**
   * 所属应用领域名称
   */
  @Column()
  domainName!: string;

  /**
   * 提示文本信息
   */
  @Column()
  promptTexts!: Array<{ text: string; type: string }>;

  /**
   * 终端端口/实例标识
   * 用于区分不同终端窗口的历史记录
   */
  @Column()
  port!: string;

  /**
   * 更新时间
   */
  @Column()
  updateDate?: Date;

  /**
   * 创建时间
   */
  @Column()
  @Index()
  createDate!: Date;

  /**
   * 数据状态
   * 1: 有效, 0: 删除
   */
  @Column()
  rowStatus!: number;
}
