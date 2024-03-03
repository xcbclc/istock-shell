import { ScopeError, isString } from '@istock/util';
import type { TAnyObj, TModelType } from '../../types';
import type { ModelMetadataMap } from '../../metadata/metadata';

type Fetch = typeof fetch;

export class FetchWrap {
  fetch: Fetch;
  // 请求相关配置
  readonly #options: RequestInit = {
    headers: { 'Content-Type': 'application/json' },
  };

  #prefixUrl: string = '';
  readonly #modelMetadataMap: ModelMetadataMap;
  constructor(fetch: Fetch, modelMetadataMap: ModelMetadataMap) {
    this.fetch = fetch;
    this.#modelMetadataMap = modelMetadataMap;
  }

  setPrefixUrl(url?: string) {
    this.#prefixUrl = url ?? '';
  }

  /**
   * 内部请求方法，处理了response结果
   * @param input
   * @param init
   */
  async request<Return = unknown>(input: RequestInfo | URL, init?: RequestInit & { query?: TAnyObj }) {
    if (isString(input) && input.includes('/')) {
      input = this.#prefixUrl + input;
      if (init?.query) {
        const queryStr = this.#objectToQueryString(init.query);
        if (queryStr) input += `?${queryStr}`;
      }
    }
    const response = await this.fetch.call(null, input, { ...init, ...this.#options });
    return await this.#toResult<Return>(response);
  }

  /**
   * 内部模型请求方法
   * @param model
   * @param init
   * @param suffixUrl
   */
  async requestModel<Return = unknown>(model: TModelType, init: RequestInit, suffixUrl: string = '') {
    const metadata = this.#modelMetadataMap.get(model);
    if (!metadata) throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到模型元数据实例');
    return await this.request<Return>(`${this.#prefixUrl}/${metadata.name}${suffixUrl}`, init);
  }

  /**
   * 处理响应数据，直接拿返回数据
   * @param response
   * @private
   */
  async #toResult<Return = unknown>(response: Response) {
    const contentType = response.headers.get('Content-Type');
    if (contentType) {
      let result: Return;
      if (contentType.includes('application/json')) {
        const json = await response.json();
        if (json.error_code) {
          throw new ScopeError(
            `iswork.${this.constructor.name}`,
            `请求(${json.request_id})${json.error_msg}(${json.error_code})`
          );
        }
        if (json.error) {
          throw new ScopeError(`iswork.${this.constructor.name}`, `${json.error}`);
        }
        result = json as Return;
      } else if (contentType.includes('text/plain') || contentType.includes('text/html')) {
        const text = await response.text();
        result = text as Return;
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const urlSearchParams = new URLSearchParams(await response.text());
        result = Object.fromEntries(urlSearchParams.entries()) as Return;
      } else if (contentType.includes('multipart/form-data') || contentType.includes('application/octet-stream')) {
        // Upload files and binary data
        const formData = new FormData();
        const fileBlob = await response.blob();
        formData.append('file', fileBlob);
        result = formData as Return;
      } else {
        throw new ScopeError(`iswork.${this.constructor.name}`, 'response返回类型未处理');
      }
      if (response.status >= 400) {
        throw new ScopeError(`iswork.${this.constructor.name}`, `${JSON.stringify(result)}`);
      }
      return result;
    } else {
      throw new ScopeError(`iswork.${this.constructor.name}`, 'response未返回类型');
    }
  }

  /**
   * query对象转query字符串
   * @param params
   */
  #objectToQueryString(params: Record<string, any>): string {
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    return queryString;
  }
}
