import { BaseModel, Column, Index, Model, PrimaryColumn } from '@istock-shell/iswork';

@Model('cookie')
export class ProxyModel extends BaseModel {
  @Index()
  @PrimaryColumn()
  id!: string;

  @Index()
  @Column()
  url!: string;

  @Column()
  pathRewrite!: [string, string];

  @Column()
  headers!: Record<string, string>;

  @Column()
  rowStatus!: number;

  @Column()
  createDate!: Date;

  @Column()
  updateDate!: Date;
}
