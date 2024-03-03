/**
 * 附带股票代码前缀
 * @param stockCode
 */
export function withStockCodePrefix(stockCode: string): string {
  let prefix = '';
  if (stockCode.startsWith('600')) {
    prefix = 'sh';
  } else if (stockCode.startsWith('601') || stockCode.startsWith('603')) {
    prefix = 'sh';
  } else if (stockCode.startsWith('000') || stockCode.startsWith('001')) {
    prefix = 'sz';
  } else if (stockCode.startsWith('002')) {
    prefix = 'sz'; // 注意：这里可能需要根据新的规则调整
  } else if (stockCode.startsWith('300')) {
    prefix = 'cy'; // 创业板股票前缀，这里使用 'cy' 作为示例
  } else if (stockCode.startsWith('688')) {
    prefix = 'ke'; // 科创板股票前缀，这里使用 'ke' 作为示例
  }

  return prefix ? `${prefix}${stockCode}` : stockCode;
}
