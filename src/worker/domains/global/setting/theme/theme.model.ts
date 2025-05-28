import { BaseModel, Column, Index, Model, PrimaryColumn } from '@istock-shell/iswork';

@Model('theme')
export class ThemeModel extends BaseModel {
  @Index()
  @PrimaryColumn()
  id!: string;

  @Index()
  @Column()
  name!: string;

  @Column()
  variables!: Record<string, string>;

  @Column()
  rowStatus!: number;

  @Column()
  createDate!: Date;

  @Column()
  updateDate!: Date;
}
