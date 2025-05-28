import { BaseModel, Model } from '@istock-shell/iswork';

@Model('tzrl')
export class TzrlModel extends BaseModel {
  code!: string;
  description!: string;
  id!: number;
  start!: string;
  title!: string;
  url!: string;
  color!: string;
  tag!: string;
  priority!: number;
}
