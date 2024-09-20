import { BaseModel, Model } from '@istock/iswork';

@Model('tzrl')
export class TzrlModel extends BaseModel {
  code!: string;
  description!: string;
  id!: number;
  start!: string;
  title!: string;
  url!: string;
  color!: string;
}
