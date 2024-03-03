import type { ApplicationContext, IDomainClass } from '@istock/iswork';
import type { TCmdRequest } from '@/worker/common';

interface IGlobalDomain extends IDomainClass {
  getStockCodeList: () => Promise<Array<{ name: string; code: string }>>;
}

/**
 * 将股票名称转换成股票代码
 * @param ctx
 * @param next
 */
export const transformStockName = async (ctx: ApplicationContext, next: () => Promise<unknown>) => {
  const { app, cmdp } = ctx;
  const data = cmdp.getPayload<TCmdRequest<{ 股票名称?: string; 股票代码?: string }>>();
  const domain = app.getDomain<IGlobalDomain>('global');
  if (domain?.domainClassInstance && data?.options?.['股票名称']) {
    const stockCodeList = await domain.domainClassInstance.getStockCodeList();
    if (stockCodeList.length) {
      const stockCode = stockCodeList.find((item) => item.name === data.options.股票名称);
      if (stockCode) {
        data.options.股票代码 = stockCode.code;
      }
    }
  }
  await next();
};
