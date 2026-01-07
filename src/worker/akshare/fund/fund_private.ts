/**
 * @fileoverview fund_private AKShare接口定义
 * 自动生成，请勿手动修改
 */

/**
 * 接口参数定义
 */
export interface Parameter {
  /** 参数标题 */
  title: string;
  /** 参数名称 */
  name: string;
  /** 参数类型 */
  type: string;
  /** 参数描述 */
  description: string;
}

/**
 * 输入接口参数定义
 */
export interface InputParameter extends Parameter {
  /** 是否必需 */
  isRequired: boolean;
  /** 默认值 */
  defaultValue?: any;
  /** 可选项 */
  choices?: string[];
}

/**
 * 输出接口参数定义
 */
export interface OutputParameter extends Parameter {
  /** 单位 */
  unit: string;
}

/**
 * 接口定义
 */
export interface ApiInterface {
  /** 所属文件标题 */
  moduleTitle: string;
  /** 所属文件名 */
  moduleName: string;
  /** 接口标题 */
  title: string;
  /** 接口名称 */
  name: string;
  /** API函数名 */
  api: string;
  /** 目标地址 */
  targetUrl: string;
  /** 接口描述 */
  description: string;
  /** 限量说明 */
  remarks: string;
  /** 输入参数 */
  inputParameters: InputParameter[];
  /** 输出参数 */
  outputParameters: OutputParameter[];
}

/**
 * fund_private接口数据
 */
export const fund_privateInterfaces: ApiInterface[] = [
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '会员机构综合查询',
    name: 'smjj_hyjgzhcx',
    api: 'amac_member_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/member/index.html',
    description: '中国证券投资基金业协会-信息公示-会员信息-会员机构综合查询',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '机构（会员）名称',
        name: 'jg（hy）mc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '会员代表',
        name: 'hydb',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '会员类型',
        name: 'hylx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '会员编号',
        name: 'hybh',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '入会时间',
        name: 'rhsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '机构类型',
        name: 'jglx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '是否星标',
        name: 'sfxb',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '基金从业人员资格注册信息',
    name: 'smjj_jjcyryzgzcxx',
    api: 'amac_person_fund_org_list',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/person/personOrgList.html',
    description: '中国证券投资基金业协会-信息公示-从业人员信息-基金从业人员资格注册信息',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [
      {
        title: 'symbol',
        name: 'symbol',
        type: 'str',
        description:
          'symbol="公募基金管理公司"; choice of {"公募基金管理公司", "公募基金管理公司资管子公司", "商业银行", "证券公司", "证券公司子公司", "私募基金管理人", "保险公司子公司", "保险公司", "外包服务机构", "期货公司", "期货公司资管子公司", "媒体机构", "证券投资咨询机构", "评价机构", "外资私募证券基金管理人", "支付结算", "独立服务机构", "地方自律组织", "境外机构", "律师事务所", "会计师事务所", "交易所", "独立第三方销售机构", "证券公司资管子公司", "证券公司私募基金子公司", "其他"}',
        defaultValue: '公募基金管理公司',
        choices: [
          '公募基金管理公司',
          '公募基金管理公司资管子公司',
          '商业银行',
          '证券公司',
          '证券公司子公司',
          '私募基金管理人',
          '保险公司子公司',
          '保险公司',
          '外包服务机构',
          '期货公司',
          '期货公司资管子公司',
          '媒体机构',
          '证券投资咨询机构',
          '评价机构',
          '外资私募证券基金管理人',
          '支付结算',
          '独立服务机构',
          '地方自律组织',
          '境外机构',
          '律师事务所',
          '会计师事务所',
          '交易所',
          '独立第三方销售机构',
          '证券公司资管子公司',
          '证券公司私募基金子公司',
          '其他',
        ],
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: '序号',
        name: 'xh',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '机构名称',
        name: 'jgmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '员工人数',
        name: 'ygrs',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '基金从业资格',
        name: 'jjcyzg',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '基金销售业务资格',
        name: 'jjxsywzg',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '基金经理',
        name: 'jjjl',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '投资经理',
        name: 'tzjl',
        type: 'int64',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '债券投资交易相关人员公示',
    name: 'smjj_zqtzjyxgrygs',
    api: 'amac_person_bond_org_list',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/person/personOrgList.html',
    description: '中国证券投资基金业协会-信息公示-从业人员信息-债券投资交易相关人员公示',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '序号',
        name: 'xh',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '机构类型',
        name: 'jglx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '机构名称',
        name: 'jgmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '公示网址',
        name: 'gswz',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '私募基金管理人综合查询',
    name: 'smjj_smjjglrzhcx',
    api: 'amac_manager_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/manager/index.html',
    description: '中国证券投资基金业协会-信息公示-私募基金管理人公示-私募基金管理人综合查询',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '私募基金管理人名称',
        name: 'smjjglrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '法定代表人/执行事务合伙人(委派代表)姓名',
        name: 'fddbr/zxswhhr_wpdbxm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '机构类型',
        name: 'jglx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '注册地',
        name: 'zcd',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '登记编号',
        name: 'djbh',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '成立时间',
        name: 'clsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '登记时间',
        name: 'djsj',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '私募基金管理人分类公示',
    name: 'smjj_smjjglrflgs',
    api: 'amac_manager_classify_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/manager/managerList.html',
    description: '中国证券投资基金业协会-信息公示-私募基金管理人公示-私募基金管理人分类公示',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '私募基金管理人名称',
        name: 'smjjglrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '法定代表人/执行事务合伙人(委派代表)姓名',
        name: 'fddbr/zxswhhr_wpdbxm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '机构类型',
        name: 'jglx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '登记编号',
        name: 'djbh',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '注册地',
        name: 'zcd',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '办公地',
        name: 'bgd',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '成立时间',
        name: 'clsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '登记时间',
        name: 'djsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '在管基金数量',
        name: 'zgjjsl',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '会员类型',
        name: 'hylx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '是否有提示信息',
        name: 'sfytsxx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '是否有诚信信息',
        name: 'sfycxxx',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '证券公司私募基金子公司管理人信息公示',
    name: 'smjj_zqgssmjjzgsglrxxgs',
    api: 'amac_member_sub_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/member/index.html?primaryInvestType=private',
    description: '中国证券投资基金业协会-信息公示-私募基金管理人公示-证券公司私募基金子公司管理人信息公示',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '机构（会员）名称',
        name: 'jg（hy）mc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '会员代表',
        name: 'hydb',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '会员类型',
        name: 'hylx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '会员编号',
        name: 'hybh',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '入会时间',
        name: 'rhsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '公司类型',
        name: 'gslx',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '私募基金管理人基金产品',
    name: 'smjj_smjjglrjjcp',
    api: 'amac_fund_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/fund/index.html',
    description: '中国证券投资基金业协会-信息公示-基金产品公示-私募基金管理人基金产品',
    remarks: '单次返回指定页码之间的所有历史数据, 其中与每页 100 条的目标网站对应; 默认返回所有数据',
    inputParameters: [
      {
        title: 'start_page',
        name: 'start_page',
        type: 'str',
        description: "start_page='1'; 开始页码",
        defaultValue: '1',
        isRequired: false,
      },
      {
        title: 'end_page',
        name: 'end_page',
        type: 'str',
        description: 'end_page="2000"; 结束页码',
        defaultValue: '2000',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: '基金名称',
        name: 'jjmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '私募基金管理人名称',
        name: 'smjjglrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '私募基金管理人类型',
        name: 'smjjglrlx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '运行状态',
        name: 'yxzt',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '备案时间',
        name: 'basj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '建立时间',
        name: 'jlsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '托管人名称',
        name: 'tgrmc',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '证券公司集合资管产品公示',
    name: 'smjj_zqgsjhzgcpgs',
    api: 'amac_securities_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/securities/index.html',
    description: '中国证券投资基金业协会-信息公示-基金产品公示-证券公司集合资管产品公示',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '产品名称',
        name: 'cpmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '产品编码',
        name: 'cpbm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '管理人名称',
        name: 'glrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '成立日期',
        name: 'clrq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '到期时间',
        name: 'dqsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '投资类型',
        name: 'tzlx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '是否分级',
        name: 'sffj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '托管人名称',
        name: 'tgrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '备案日期',
        name: 'barq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '运作状态',
        name: 'yzzt',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '证券公司直投基金',
    name: 'smjj_zqgsztjj',
    api: 'amac_aoin_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/aoin/product/index.html',
    description: '中国证券投资基金业协会-信息公示-基金产品公示-证券公司直投基金',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '产品编码',
        name: 'cpbm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '产品名称',
        name: 'cpmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '直投子公司',
        name: 'ztzgs',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '管理机构',
        name: 'gljg',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '设立日期',
        name: 'slrq',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '证券公司私募投资基金',
    name: 'smjj_zqgssmtzjj',
    api: 'amac_fund_sub_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/subfund/index.html',
    description: '中国证券投资基金业协会-信息公示-基金产品公示-证券公司私募投资基金',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '产品编码',
        name: 'cpbm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '产品名称',
        name: 'cpmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '私募基金管理人名称',
        name: 'smjjglrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '托管人名称',
        name: 'tgrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '成立日期',
        name: 'clrq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '备案日期',
        name: 'barq',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '基金公司及子公司集合资管产品公示',
    name: 'smjj_jjgsjzgsjhzgcpgs',
    api: 'amac_fund_account_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/fund/account/index.html',
    description: '中国证券投资基金业协会-信息公示-基金产品公示-基金公司及子公司集合资管产品公示',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '成立日期',
        name: 'clrq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '产品编码',
        name: 'cpbm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '产品名称',
        name: 'cpmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '管理人名称',
        name: 'glrmc',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '资产支持专项计划',
    name: 'smjj_zczczxjh',
    api: 'amac_fund_abs',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/fund/abs/index.html',
    description: '中国证券投资基金业协会-信息公示-产品公示-资产支持专项计划',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '编号',
        name: 'bh',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '备案编号',
        name: 'babh',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '专项计划全称',
        name: 'zxjhqc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '管理人',
        name: 'glr',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '托管人',
        name: 'tgr',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '成立日期',
        name: 'clrq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '预期到期时间',
        name: 'yqdqsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '备案通过时间',
        name: 'batgsj',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '期货公司集合资管产品公示',
    name: 'smjj_qhgsjhzgcpgs',
    api: 'amac_futures_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/pof/futures/index.html',
    description: '中国证券投资基金业协会-信息公示-基金产品公示-期货公司集合资管产品公示',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '产品名称',
        name: 'cpmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '产品编码',
        name: 'cpbm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '管理人名称',
        name: 'glrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '托管人名称',
        name: 'tgrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '成立日期',
        name: 'clrq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '投资类型',
        name: 'tzlx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '是否分级',
        name: 'sffj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '备案日期',
        name: 'barq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '到期日',
        name: 'dqr',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '运作状态',
        name: 'yzzt',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '私募基金数据',
    moduleName: 'fund_private',
    title: '已注销私募基金管理人名单',
    name: 'smjj_yzxsmjjglrmd',
    api: 'amac_manager_cancelled_info',
    targetUrl: 'https://gs.amac.org.cn/amac-infodisc/res/cancelled/manager/index.html',
    description: '中国证券投资基金业协会-信息公示-诚信信息-已注销私募基金管理人名单',
    remarks: '单次返回当前时刻所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '管理人名称',
        name: 'glrmc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '统一社会信用代码',
        name: 'tyshxydm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '登记时间',
        name: 'djsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '注销时间',
        name: 'zxsj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '注销类型',
        name: 'zxlx',
        type: 'object',
        description: '',
        unit: '',
      },
    ],
  },
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return fund_privateInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return fund_privateInterfaces.find((item) => item.name === name);
}

export default fund_privateInterfaces;
