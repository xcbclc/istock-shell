import { BaseModel, Column, Index, Model, PrimaryColumn } from '@istock/iswork';
@Model('stock_code_result')
export class StockCodeResultModel extends BaseModel {
  @Index()
  @PrimaryColumn()
  id!: string;

  @Index()
  @Column()
  code!: string;

  @Index()
  @Column()
  name!: string;

  // 时间
  @Column()
  updateDate!: Date;

  @Column()
  rowStatus!: number;
}
