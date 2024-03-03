import { BaseModel, Model, PrimaryColumn, Index, Column } from '@istock/iswork';
@Model('user')
export class UserModel extends BaseModel {
  @PrimaryColumn()
  id!: string | number;

  @Index()
  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @Column()
  nickname!: string;

  @Column()
  updateDate!: Date;

  @Column()
  createDate?: Date;

  @Column()
  rowStatus!: number;
}
