import { BaseModel, Column, Index, Model, PrimaryColumn } from '@istock-shell/iswork';

@Model('shortcut')
export class ShortcutModel extends BaseModel {
  @Index()
  @PrimaryColumn()
  id!: string;

  @Index()
  @Column()
  key!: string;

  @Column()
  shortcut!: string;

  @Column()
  label!: string;

  @Column()
  description!: string;

  @Column()
  rowStatus!: number;

  @Column()
  createDate!: Date;

  @Column()
  updateDate!: Date;
}
