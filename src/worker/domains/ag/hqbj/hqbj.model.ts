import { BaseModel, Model } from '@istock-shell/iswork';

@Model('hqbj')
export class HqbjModel extends BaseModel {
  item!: string;
  value!: number | string;
}
