import { BaseModel, Model } from '@istock-shell/iswork';

@Model('ggxxcx')
export class GgxxcxModel extends BaseModel {
  item!: string;
  value!: number | string;
}
