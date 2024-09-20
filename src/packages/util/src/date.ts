/**
 * 格式化日期为符串 YYYY-MM-DD hh:mm:ss
 */
export const toLocaleDateString = (date: Date, format: string): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 获取一周的范围时间
 * @param today
 */
export const getStartAndEndOfWeek = (today: Date): { startOfWeek: Date; endOfWeek: Date } => {
  const dayOfWeek = today.getDay(); // 周日为0，周一为1，依此类推

  // 计算本周一的日期（保持时间为00:00:00）
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek + 1);
  startOfWeek.setHours(0, 0, 0, 0); // 确保时间是当天的开始

  // 计算本周日的日期，并设置为当天的23:59:59.999
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999); // 设置为当天的结束，但注意JavaScript中的毫秒是整数

  return { startOfWeek, endOfWeek };
};
