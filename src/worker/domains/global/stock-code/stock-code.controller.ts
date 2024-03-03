import { Controller } from '@istock/iswork';
import { StockCodeService } from './stock-code.service';

@Controller({
  alias: 'stock-code',
})
export class StockCodeController {
  constructor(private readonly stockCodeService: StockCodeService) {}

  async getStockCodeList() {
    return await this.stockCodeService.getStockCodeList();
  }
}
