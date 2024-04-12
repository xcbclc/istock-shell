import { BaseModel, Model } from '@istock/iswork';

@Model('cj')
export class CjModel extends BaseModel {
  title!: string;
  url!: string;
  tag!: string;
  updateDate?: Date;
  createDate?: Date;
  rowStatus?: number;
}
