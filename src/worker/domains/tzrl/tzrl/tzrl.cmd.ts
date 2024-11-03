import { typeRecord } from './tzrl.jisilu';

const lxParameterText = Object.entries(typeRecord)
  .map(([k, v]) => {
    return `${k}（${v}）`;
  })
  .join('、');
export default {
  投资日历: {
    name: '投资日历',
    cmd: 'tzrl',
    usage: 'tzrl',
    options: {
      lx: {
        name: 'lx',
        parameter: ['-lx', '--类型'],
        parameterType: ['string'],
        description: `投资日历类型，参数说明：${lxParameterText}`,
        default: 'newstock_apply,newstock_onlist,kzzsg',
        optional: true,
        choices: Object.keys(typeRecord),
      },
    },
    source: {
      title: '集思录-投资日历',
      url: 'https://www.jisilu.cn/data/calendar/',
    },
    description: '查看投资日历',
    remarks: '',
    example: `tzrl -lx ${Object.keys(typeRecord).join(',')}`,
  },
};
