import { BaseModel, Column, Index, Model, PrimaryColumn } from '@istock/iswork';

@Model('cookie')
export class CookieModel extends BaseModel {
  @Index()
  @PrimaryColumn()
  id!: string;

  @Index()
  @Column()
  host!: string;

  @Column()
  cookie!: string;

  @Column()
  rowStatus!: number;

  @Column()
  createDate!: Date;

  @Column()
  updateDate!: Date;
}
