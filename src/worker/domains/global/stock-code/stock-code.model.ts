import { BaseModel, Model } from '@istock/iswork';

@Model('stock_code')
export class StockCodeModel extends BaseModel {
  id!: string;
  code!: string;
  name!: string;
}
