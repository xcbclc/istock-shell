/**
 * 等待一段时间
 * @param timeout
 */
export const sleep = async (timeout: number = 0) => {
  return await new Promise((resolve) => setTimeout(resolve, timeout));
};
