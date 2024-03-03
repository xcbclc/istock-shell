import { BaseModel, Model } from '@istock/iswork';

@Model('ggxxcx')
export class GgxxcxModel extends BaseModel {
  item!: string;
  value!: number | string;
}
