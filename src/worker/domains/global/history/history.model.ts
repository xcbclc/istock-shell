import { BaseModel, Model, PrimaryColumn, Index, Column } from '@istock/iswork';

@Model('history')
export class HistoryModel extends BaseModel {
  @PrimaryColumn()
  id!: number | string;

  @Index()
  @Column()
  cmd!: string;

  @Column()
  input!: string;

  @Column()
  output!: Array<{ component: string; props: Record<string, any> }>;

  @Column()
  source!: string;

  @Column()
  promptTexts!: Array<{ text: string; type: string }>;

  @Column()
  port!: string;

  @Column()
  updateDate?: Date;

  @Column()
  @Index()
  createDate!: Date;

  @Column()
  rowStatus!: number;
}
