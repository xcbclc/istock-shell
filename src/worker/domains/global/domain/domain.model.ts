import { BaseModel, Model, PrimaryColumn, Column, Index } from '@istock/iswork';

@Model('domain')
export class DomainModel extends BaseModel {
  @PrimaryColumn()
  id!: number | string;

  @Index()
  @Column()
  name!: string;

  @Index()
  @Column()
  viewName!: string;

  @Column()
  isGlobal!: boolean;

  @Column()
  parentId!: string;

  @Column()
  updateDate?: Date;

  @Column()
  createDate?: Date;

  @Column()
  rowStatus!: number;
}
