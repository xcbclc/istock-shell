import { BaseModel, Column, Index, Model, PrimaryColumn } from '@istock/iswork';

@Model('kzzsd_result')
export class KzzsdResultModel extends BaseModel {
  @Index()
  @PrimaryColumn()
  id!: string;

  // 转债代码
  @Index()
  @Column()
  bond_id!: string;

  // 时间
  @Column()
  updateDate!: Date;

  @Column()
  rowStatus!: number;
}
