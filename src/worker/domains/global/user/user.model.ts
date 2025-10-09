import { BaseModel, Model, PrimaryColumn, Index, Column } from '@istock-shell/iswork';
@Model('user')
export class UserModel extends BaseModel {
  @PrimaryColumn()
  id!: string | number;

  @Index()
  @Column()
  userId!: string;

  @Column()
  username!: string;

  @Column()
  account!: string;

  @Column()
  avatar!: string;

  @Column()
  gender!: string;

  @Column()
  mobile!: string;

  @Column()
  nickname!: string;

  @Column()
  phone!: string;

  @Column()
  isMember!: boolean;

  @Column()
  hasUnionid!: boolean;

  @Column()
  updateDate!: Date;

  @Column()
  createDate?: Date;

  @Column()
  rowStatus!: number;
}
