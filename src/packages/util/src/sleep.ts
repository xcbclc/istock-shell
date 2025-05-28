/**
 * 异步等待指定时间（毫秒）。
 *
 * @param timeout - 等待的毫秒数，默认 0
 * @returns Promise<void>
 * @example
 * await sleep(1000); // 等待 1 秒
 */
export const sleep = async (timeout: number = 0) => {
  return await new Promise((resolve) => setTimeout(resolve, timeout));
};
