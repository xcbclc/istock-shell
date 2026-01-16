import { name, title, version, description, author, license, homepage, repository, engines } from '@root/package.json';

export const LOCAL_STORE_SHELL_INFO_READ_TOKEN = 'istock_local_store_shell_info_read_token';
export const shellInfoStoreAsciiTitle: string = `
    _  _____  __                __      _____  __           __ __
   (_)/ ___/ / /_ ____   _____ / /__   / ___/ / /_   ___   / // /
  / / \\__ \\ / __// __ \\ / ___// //_/   \\__ \\ / __ \\ / _ \\ / // /
 / / ___/ // /_ / /_/ // /__ / /<     ___/ // / / //  __// // /
/_/ /____/ \\__/ \\____/ \\___//_/|_|   /____//_/ /_/ \\___//_//_/
`;

export const shellInfoStoreDisclaimer: string = `
【重要法律声明】本软件（iStock Shell）系纯粹技术研究工具，仅限教育科研及技术交流用途。软件所涉任何数据、信息、分析结果或展示内容均不构成且不应被解释为任何形式的投资建议、推荐、暗示或保证，亦不得作为证券买卖、投资决策之依据或参考。\n
【信息来源与准确性】软件展示之全部信息均来源于公开渠道，开发者及关联方不就其真实性、准确性、完整性、时效性、适用性、安全性或无中断性作任何明示或默示之保证。鉴于市场环境瞬息万变，相关信息可能存在重大偏差、遗漏或过时，用户对此应予充分认知并自行承担相应风险。\n
【投资风险警示】证券投资蕴含重大风险，包括但不限于本金损失、市场波动、流动性、信用及政策风险等。任何基于本软件信息所作之投资决策，均属用户独立、自主且经审慎判断后之行为，由此产生之全部收益、损失、责任及后果概由用户自行承担，本软件及开发者对此不承担任何形式之责任。\n
【责任限制条款】在适用法律允许之最大范围内，本软件及开发者对因软件使用、无法使用、信息依赖、系统故障、数据传输错误、病毒感染、黑客攻击、第三方服务中断或其他原因所致之任何直接、间接、附带、特殊、衍生或惩罚性损害（包括但不限于利润损失、商业中断、信息丢失、数据损坏、系统崩溃、商誉受损等），均不承担任何赔偿责任，即使已被告知可能发生此类损害。\n
【软件功能说明】本软件按"现状"及"可用"基础提供，开发者不保证软件之适用性、稳定性、无错误或持续可用性，亦不保证软件能满足用户之特定需求或期望。软件可能因技术维护、功能升级、政策调整或其他原因而随时修改、暂停、终止或限制部分功能，用户对此应予理解并接受。\n
【用户行为规范】用户承诺仅将本软件用于合法、正当之技术研究目的，不得利用软件从事任何违法违规活动，包括但不限于内幕交易、市场操纵、非法证券咨询、传播虚假信息、侵犯他人合法权益等。因用户违反法律法规、监管要求或本声明条款所产生之全部法律责任及后果，概由用户自行承担。\n
【条款效力与适用】本声明构成用户与本软件之间关于软件使用之完整协议，其效力、解释及争议解决均适用中华人民共和国法律。如用户对本声明之任何条款存在异议，应立即停止使用本软件。继续使用即视为已充分阅读理解并完全接受本声明全部条款，且同意受其约束。\n
【版本更新权利】开发者保留随时修改、更新或补充本声明条款之权利，更新后的条款自公布之日起生效，恕不另行通知。用户应定期查阅最新版本声明，如继续使用软件，即视为接受更新后之条款。
`;

// 项目基本信息
export const shellInfoProjectInfo = {
  name,
  title,
  version,
  description,
  author: author.name,
  contact: 'https://istock.red/contact/',
  license,
  homepage,
  repository: repository.url,
  engines: engines,
  techStack: ['Svelte 5', 'TypeScript 5', 'DaisyUI 5', 'Tailwind CSS 4', 'Vite 6', 'pnpm workspace'],
};

// 获取系统环境信息的函数
export const getSystemInfo = () => {
  const now = new Date();
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: now.getTimezoneOffset(),
    hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
    maxTouchPoints: navigator.maxTouchPoints || 0,
    deviceMemory: (navigator as any).deviceMemory || 'Unknown',
    connection: (navigator as any).connection
      ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink,
          rtt: (navigator as any).connection.rtt,
        }
      : null,
    localTime: now.toLocaleString('zh-CN'),
    utcTime: now.toUTCString(),
  };
};
