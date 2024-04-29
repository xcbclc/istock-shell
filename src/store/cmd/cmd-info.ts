import { readable, writable, type Readable } from 'svelte/store';
import { title, version } from '@root/package.json';

export interface ICmdInfo
  extends Readable<{
    asciiTitle: string;
    title: string;
    version: string;
    disclaimer: string;
  }> {}

const asciiTitle: string = `
    _  _____  __                __      _____  __           __ __
   (_)/ ___/ / /_ ____   _____ / /__   / ___/ / /_   ___   / // /
  / / \\__ \\ / __// __ \\ / ___// //_/   \\__ \\ / __ \\ / _ \\ / // /
 / / ___/ // /_ / /_/ // /__ / /<     ___/ // / / //  __// // /
/_/ /____/ \\__/ \\____/ \\___//_/|_|   /____//_/ /_/ \\___//_//_/
`;

const disclaimer = `
本软件（iStock Shell）提供的所有信息仅供参考之用，不构成任何投资建议或买卖股票的依据。用户在使用本软件提供的信息时，应自行判断信息的准确性、完整性和可靠性，并承担相应的风险和责任。\n
本软件提供的任何信息均来自于公开渠道，我们不保证信息的及时性、准确性、完整性、可靠性、适用性、安全性和不中断性。同时，由于市场环境的变化，上市公司的经营状况和财务状况也可能随时发生变化，因此本软件提供的信息可能存在不准确、过时等情况。\n
用户在使用本软件提供的信息进行投资时，应根据自身的风险承受能力和投资经验做出独立决策，对因投资决策而造成的风险和损失，本软件概不负责。同时，本软件不对任何因使用或依赖本软件提供的信息所造成的直接或间接损失承担责任。\n
本软件不提供任何担保或保证，包括但不限于不保证软件符合用户要求，不保证软件不会受到干扰、中断、延迟或错误，不保证软件能够满足用户的需求，不保证软件中的信息不会出现错误或瑕疵等。\n
本软件有权根据需要对软件的内容、功能和服务进行升级、修订、暂停或终止。用户应当在使用本软件时注意查看本软件的公告、更新说明等，以获取最新的信息和服务。\n
使用本软件即表示用户已经完全阅读、理解和同意本免责声明的所有条款和条件。如用户对本免责声明的任何内容存在异议，请立即停止使用本软件。
`;

/**
 * 命令行基本信息store
 */
export const cmdInfo: ICmdInfo = Object.create(
  readable({
    asciiTitle,
    title,
    version,
    disclaimer,
  })
);

export const showCmdInfo = Object.create(writable(false));

console.log(asciiTitle);
console.info(title, version);
