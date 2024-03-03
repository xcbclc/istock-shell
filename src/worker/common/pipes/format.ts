import { isDate, isNumber, isString, toLocaleDateString } from '@istock/util';

export const akShareDate = (v: unknown) => {
  if (isString(v) || isNumber(v) || isDate(v)) {
    const date = new Date(v);
    if (isNaN(date.getTime())) return v;
    return toLocaleDateString(date, 'YYYY-MM-DD');
  }
  return v;
};

export const formatAlias = {
  '格式化·AK日期': akShareDate,
};

export default {
  akShareDate,
};
