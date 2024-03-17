import { BaseModel, Column, Index, Model, PrimaryColumn } from '@istock/iswork';

@Model('cmd_alias')
export class CmdAliasModel extends BaseModel {
  @PrimaryColumn()
  id!: string;

  @Index()
  @Column()
  cmd!: string;

  @Column()
  alias!: string;

  @Column()
  domainName!: string;

  @Column()
  description!: string;

  @Column()
  updateDate?: Date;

  @Index()
  @Column()
  createDate?: Date;

  @Column()
  rowStatus!: number;
}
