/**
 * @fileoverview AKShare接口文档解析模块
 * 解析data目录下的所有markdown文档，提取接口信息并生成TypeScript文件
 * @author iStock Shell Team
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { pinyin } from 'pinyin-pro';

const cwdPath = process.cwd();
/** @type {string} 当前文件路径 */
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);
/** @type {string} CLI src路径 */
const cliSrcPath = path.resolve(currentDirPath, '..');
/** @type {string} 项目根目录路径 */
const rootPath = path.resolve(cliSrcPath, '../../../..');
/** @type {string} 数据目录路径 */
const dataPath = path.resolve(cwdPath, './docs/akshare');
/** @type {string} 输出目录路径 */
const outputPath = path.resolve(cwdPath, './src/worker/akshare');

/**
 * 接口参数类型定义
 * @typedef {Object} Parameter
 * @property {string} name - 参数名称
 * @property {string} type - 参数类型
 * @property {string} description - 参数描述
 * @property {string|undefined} defaultValue - 默认值
 * @property {boolean} isRequired - 是否必需
 */

/**
 * 接口定义类型
 * @typedef {Object} ApiInterface
 * @property {string} moduleTitle - 所属文件标题
 * @property {string} moduleName - 所属文件名
 * @property {string} name - 接口名称
 * @property {string} api - API函数名
 * @property {string} targetUrl - 目标地址
 * @property {string} description - 接口描述
 * @property {string} remarks - 限量说明
 * @property {Parameter[]} inputParameters - 输入参数
 * @property {Parameter[]} outputParameters - 输出参数
 */

/**
 * 递归获取所有markdown文件
 * @param {string} directoryPath - 目录路径
 * @param {string[]} files - 文件数组
 * @returns {string[]} markdown文件路径数组
 */
function getAllMarkdownFiles(directoryPath, files = []) {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      getAllMarkdownFiles(fullPath, files);
    } else if (entry.isFile() && path.extname(entry.name) === '.md') {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * 解析markdown表格为参数数组
 * @param {string} tableContent - 表格内容
 * @param {boolean} isInputParam - 是否为输入参数
 * @returns {Parameter[]} 参数数组
 */
function parseTable(tableContent, isInputParam = true) {
  const lines = tableContent.trim().split('\n');
  const parameters = [];

  // 跳过表头和分隔符行
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === '|' || !line.includes('|')) continue;

    const cells = line
      .split('|')
      .map((cell) => cell.trim())
      .filter((cell) => cell);
    if (cells.length >= 3) {
      let title = (cells[0] || '').trim();
      let type = cells[1] || '';
      let description = cells[2] || '';

      // 输入、输出参数：如果name全是-，则为无效数据，需要过滤
      if (/^-+$/.test(title)) {
        continue;
      }

      // 过滤无效的输出参数数据：
      // 1. 包含数字序列和省略号的模式（如："0 1 ... 600763"）
      // 2. 纯数字开头的行（如："0", "1", "2"等）
      // 3. 包含多个数字和省略号的复杂模式
      if (!isInputParam) {
        if (
          /^\d+\s+\d+\s+\.{3}/.test(title) ||
          /^\d+\s+\.{3}/.test(title) ||
          /^\d+$/.test(title) ||
          /^\d+\s+\d+/.test(title)
        ) {
          continue;
        }
      }

      // type全是-，则为输入参数提供默认类型str，输出参数提供默认类型object
      if (/^-+$/.test(type)) {
        type = isInputParam ? 'str' : 'object';
      }

      // description全是-，则默认值为空字符串
      if (/^-+$/.test(description)) {
        description = '';
      }

      const param = {
        title,
        name: pinyin(title, { pattern: 'first', toneType: 'none', type: 'array' }).join('').replace(/\s+/g, '_').replace(/-/g, '_').replace(/\(([^)]+)\)/g, '_$1'),
        type,
        description,
        defaultValue: undefined,
      };

      // 输出参数无isRequired属性
      if (isInputParam) {
        // 提取defaultValue和choices信息
        let defaultValue = undefined;
        let choices = undefined;

        // 提取默认值的多种模式匹配
        let defaultValueMatch = null;
        
        // 1. 匹配带引号的字符串值：param='value' 或 param="value"（包括空字符串）
        defaultValueMatch = description.match(/[a-zA-Z_]+\s*=\s*["']([^"']*)["']/);
        if (defaultValueMatch) {
          const value = defaultValueMatch[1];
          // 过滤无效的API key值
          if (param.name === 'api_key' && value.includes('此处输入')) {
            defaultValue = undefined; // 跳过无效的API key默认值
          } else {
            defaultValue = value;
          }
        }
        
        // 2. 匹配数字类型的默认值：param=123
        if (!defaultValueMatch) {
          defaultValueMatch = description.match(/[a-zA-Z_]+\s*=\s*(\d+(?:\.\d+)?)/);
          if (defaultValueMatch) {
            const value = defaultValueMatch[1];
            // 如果包含小数点，转换为浮点数，否则转换为整数
            defaultValue = value.includes('.') ? parseFloat(value) : parseInt(value, 10);
          }
        }
        
        // 3. 匹配None值：param=None
        if (!defaultValueMatch) {
          const noneMatch = description.match(/[a-zA-Z_]+\s*=\s*None/);
          if (noneMatch) {
            defaultValue = null; // None转换为null
            defaultValueMatch = noneMatch;
          }
        }

        // 提取choices信息并进行类型转换（跳过adjust参数，因为有专门处理）
        const choicesMatch = description.match(/choice of \{([^}]+)\}/);
        if (choicesMatch && param.name !== 'adjust') {
          // 提取选项并清理格式
          const choicesArray = choicesMatch[1].split(',').map((item) => {
            const cleanItem = item.trim().replace(/["']/g, '');
            // 尝试转换为数字类型
            if (/^\d+(?:\.\d+)?$/.test(cleanItem)) {
              return cleanItem.includes('.') ? parseFloat(cleanItem) : parseInt(cleanItem, 10);
            }
            return cleanItem;
          });
          choices = choicesArray;
        }

        // 特殊处理adjust参数：识别各种adjust参数的描述格式
        if (param.name === 'adjust' && (
          description.includes('默认返回不复权') || 
          description.includes('默认不复权') ||
          description.includes('返回未复权的数据') ||
          description.includes('则返回未复权的数据') ||
          description.includes('返回前复权') ||
          description.includes('返回后复权') ||
          description.includes('前复权') ||
          description.includes('后复权') ||
          description.includes('不复权')
        )) {
          // 如果没有通过正则匹配到默认值，设置为空字符串
          if (defaultValue === undefined) {
            defaultValue = '';
          }
          
          // 从文字描述中提取choices
            const adjustChoices = [''];
            // 先检查基础选项
            if (description.includes('qfq:') || description.includes('qfq ') || (description.includes('qfq') && !description.includes('qfq-factor'))) {
              adjustChoices.push('qfq');
            }
            if (description.includes('hfq:') || description.includes('hfq ') || (description.includes('hfq') && !description.includes('hfq-factor'))) {
              adjustChoices.push('hfq');
            }
            // 再检查因子选项
            if (description.includes('qfq-factor')) adjustChoices.push('qfq-factor');
            if (description.includes('hfq-factor')) adjustChoices.push('hfq-factor');
            choices = adjustChoices;
        }

        param.defaultValue = defaultValue;
        param.choices = choices;

        // 判断是否必需（简单规则：如果描述中包含"可选"、"默认为空"或有默认值则非必需）
        param.isRequired = !description.includes('可选') && !description.includes('默认为空') && title !== '-' && defaultValue === undefined;
      } else {
        // 输出参数：提取单位信息
        let unit = '';
        const unitMatch = description.match(/注意单位:\s*([^，,；;。.\s]+)/);
        if (unitMatch) {
          unit = unitMatch[1].trim();
          console.log(`提取单位: ${description} -> ${unit}`);
        }
        param.unit = unit;
      }

      if (param.title && param.name) {
        parameters.push(param);
      }
    }
  }

  return parameters;
}

/**
 * 提取markdown文件的首标题
 * @param {string} content - 文件内容
 * @param {string} fileName - 文件名
 * @returns {string} 首标题（不包括链接）
 */
function extractFirstTitle(content, fileName) {
  // 特殊处理article.md
  if (fileName === 'article') {
    return '政策不确定性数据';
  }
  
  const lines = content.split('\n');
  for (const line of lines) {
    // 匹配一级或二级标题
    const titleMatch = line.match(/^#{1,2}\s+(.+)/);
    if (titleMatch) {
      let title = titleMatch[1].trim();
      // 移除链接格式 [text](url)
      title = title.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      // 移除 'AKShare ' 前缀
      title = title.replace(/^AKShare\s+/, '');
      // 移除多余的空格
      title = title.trim();
      return title;
    }
  }
  return fileName; // 如果没有找到标题，返回文件名
}

/**
 * 解析qhkc格式的markdown文件中的接口信息
 * @param {string} fileName - 文件名
 * @param {string} filePath - 文件路径
 * @param {string} moduleTitle - 模块标题
 * @returns {ApiInterface[]} 接口数组
 */
function parseQhkcMarkdownFile(fileName, filePath, moduleTitle) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const interfaces = [];
  const lines = content.split('\n');
  
  let currentInterface = null;
  let currentSection = null;
  let inRequestTable = false;
  let inResponseTable = false;
  let requestTableLines = [];
  let responseTableLines = [];
  
  for (const line of lines) {
    // 匹配二级标题（接口开始）
    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      // 保存上一个接口
      if (currentInterface && currentInterface.api) {
        currentInterface.inputParameters = parseTable(requestTableLines.join('\n'), true);
        currentInterface.outputParameters = parseTable(responseTableLines.join('\n'), false);
        
        if (!currentInterface.remarks) {
          currentInterface.remarks = '';
        }
        if (!currentInterface.targetUrl) {
          currentInterface.targetUrl = '';
        }
        if (!currentInterface.description) {
          currentInterface.description = '';
        }
        
        interfaces.push(currentInterface);
      }
      
      // 开始新接口
      const title = h2Match[1].trim();
      currentInterface = {
        moduleTitle,
        moduleName: fileName,
        title,
        name: pinyin(title, { pattern: 'first', toneType: 'none', type: 'array' }).join('').toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_').replace(/\(([^)]+)\)/g, '_$1'),
      };
      currentSection = null;
      inRequestTable = false;
      inResponseTable = false;
      requestTableLines = [];
      responseTableLines = [];
      continue;
    }
    
    if (!currentInterface) continue;
    
    // 匹配三级标题（接口字段）
    const h3Match = line.match(/^###\s+(.+)/);
    if (h3Match) {
      const sectionTitle = h3Match[1].trim();
      currentSection = sectionTitle;
      inRequestTable = false;
      inResponseTable = false;
      
      if (sectionTitle === '请求参数') {
        inRequestTable = true;
        requestTableLines = [];
      } else if (sectionTitle === '返回参数') {
        inResponseTable = true;
        responseTableLines = [];
      }
      continue;
    }
    
    // 处理接口字段内容
    if (currentSection === '接口名称' && line.trim() && !line.startsWith('|') && !line.startsWith('#')) {
      currentInterface.api = line.trim();
    } else if (currentSection === '接口描述' && line.trim() && !line.startsWith('|') && !line.startsWith('#')) {
      currentInterface.description = line.trim();
    } else if (inRequestTable && line.trim()) {
      requestTableLines.push(line);
    } else if (inResponseTable && line.trim()) {
      responseTableLines.push(line);
    }
  }
  
  // 处理最后一个接口
  if (currentInterface && currentInterface.api) {
    currentInterface.inputParameters = parseTable(requestTableLines.join('\n'), true);
    currentInterface.outputParameters = parseTable(responseTableLines.join('\n'), false);
    
    if (!currentInterface.remarks) {
      currentInterface.remarks = '';
    }
    if (!currentInterface.targetUrl) {
      currentInterface.targetUrl = '';
    }
    if (!currentInterface.description) {
      currentInterface.description = '';
    }
    
    interfaces.push(currentInterface);
  }
  
  return interfaces;
}

/**
 * 解析单个markdown文件中的接口信息
 * @param {string} fileName - 文件名
 * @param {string} filePath - 文件路径
 * @param {string} moduleTitle - 模块标题
 * @returns {ApiInterface[]} 接口数组
 */
function parseMarkdownFile(fileName, filePath, moduleTitle) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const interfaces = [];

  // 使用更简单的方式查找接口块
  const lines = content.split('\n');
  let currentInterface = null;
  let inInputTable = false;
  let inOutputTable = false;
  let inputTableLines = [];
  let outputTableLines = [];

  for (const line of lines) {
    const titleMatch = line.match(/^(#{3,6})\s+(.+)/);

    if (titleMatch) {
      // 如果有当前接口，先保存
      if (currentInterface && currentInterface.api) {
        currentInterface.inputParameters = parseTable(inputTableLines.join('\n'), true);
        currentInterface.outputParameters = parseTable(outputTableLines.join('\n'), false);

        // 确保remarks字段存在
        if (!currentInterface.remarks) {
          currentInterface.remarks = '';
        }

        // 修复目标URL格式
        if (currentInterface.targetUrl && !currentInterface.targetUrl.startsWith('http')) {
          if (currentInterface.targetUrl.includes('交易所')) {
            currentInterface.targetUrl = '';
          } else {
            currentInterface.targetUrl = 'https://' + currentInterface.targetUrl;
          }
        }

        interfaces.push(currentInterface);
      }

      // 重置状态
      const title = titleMatch[2].trim();
      currentInterface = {
        moduleTitle,
        moduleName: fileName,
        title,
        name: pinyin(title, { pattern: 'first', toneType: 'none', type: 'array' }).join('').toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_').replace(/\(([^)]+)\)/g, '_$1'),
      };
      inInputTable = false;
      inOutputTable = false;
      inputTableLines = [];
      outputTableLines = [];
      continue;
    }

    if (!currentInterface) continue;

    // 检查接口字段
    if (line.startsWith('接口:')) {
      currentInterface.api = line.replace('接口:', '').trim();
    } else if (line.startsWith('目标地址:')) {
      currentInterface.targetUrl = line.replace('目标地址:', '').trim();
    } else if (line.startsWith('描述:')) {
      currentInterface.description = line.replace('描述:', '').trim();
    } else if (line.startsWith('限量:')) {
      currentInterface.remarks = line.replace('限量:', '').trim();
    } else if (line.trim() === '输入参数') {
      inInputTable = true;
      inOutputTable = false;
      inputTableLines = [];
    } else if (line.trim().startsWith('输出参数')) {
      inInputTable = false;
      inOutputTable = true;
      outputTableLines = [];
    } else if (line === '接口示例' || titleMatch) {
      inInputTable = false;
      inOutputTable = false;
    } else if (line.includes('一览表') || line.includes('数据示例') || line.startsWith('```')) {
      // 遇到一览表、数据示例或代码块时，停止收集表格数据
      inInputTable = false;
      inOutputTable = false;
    } else if (inInputTable && line.trim()) {
      inputTableLines.push(line);
    } else if (inOutputTable && line.trim()) {
      outputTableLines.push(line);
    }
  }
  currentInterface.remarks = currentInterface.remarks ?? '';
  // 处理最后一个接口
  if (currentInterface && currentInterface.api) {
    currentInterface.inputParameters = parseTable(inputTableLines.join('\n'), true);
    currentInterface.outputParameters = parseTable(outputTableLines.join('\n'), false);

    // 确保remarks字段存在
    if (!currentInterface.remarks) {
      currentInterface.remarks = '';
    }

    // 修复目标URL格式
    if (currentInterface.targetUrl && !currentInterface.targetUrl.startsWith('http')) {
      if (currentInterface.targetUrl.includes('交易所')) {
        currentInterface.targetUrl = ''; // 为交易所类型提供默认URL
      } else {
        currentInterface.targetUrl = 'https://' + currentInterface.targetUrl;
      }
    }

    interfaces.push(currentInterface);
  }

  return interfaces;
}

/**
 * 生成TypeScript接口定义
 * @param {ApiInterface[]} interfaces - 接口数组
 * @param {string} moduleName - 模块名称
 * @returns {string} TypeScript代码
 */
function generateTypeScriptCode(interfaces, moduleName) {
  const code = `/**
 * @fileoverview ${moduleName} AKShare接口定义
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
  defaultValue?: string;
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
 * ${moduleName}接口数据
 */
export const ${moduleName}Interfaces: ApiInterface[] = ${JSON.stringify(interfaces, null, 2)};

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return ${moduleName}Interfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return ${moduleName}Interfaces.find(item => item.name === name);
}

export default ${moduleName}Interfaces;
`;

  return code;
}

/**
 * 主函数：解析所有AKShare接口文档
 * @async
 * @returns {Promise<void>}
 */
export default async function parseAkshare() {
  console.log('开始解析AKShare接口文档...');

  console.log(`数据目录: ${dataPath}`);
  console.log(`输出目录: ${outputPath}`);

  // 检查数据目录是否存在
  if (!fs.existsSync(dataPath)) {
    console.error(`数据目录不存在: ${dataPath}`);
    return;
  }

  // 确保输出目录存在
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  } else {
    // 清空输出目录下的所有文件
    const clearDirectory = (dirPath) => {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          clearDirectory(fullPath);
          fs.rmdirSync(fullPath);
        } else {
          fs.unlinkSync(fullPath);
        }
      }
    };
    clearDirectory(outputPath);
    console.log('已清空输出目录');
  }

  // 获取所有markdown文件
  const markdownFiles = getAllMarkdownFiles(dataPath);
  console.log(`找到 ${markdownFiles.length} 个markdown文件`);

  let totalInterfaces = 0;

  // 处理每个markdown文件
  for (const filePath of markdownFiles) {
    const relativePath = path.relative(dataPath, filePath);
    const moduleName = path.basename(filePath, '.md');
    const moduleDir = path.dirname(relativePath);

    console.log(`正在处理: ${relativePath}`);

    try {
      // 读取文件内容并提取首标题
      const content = fs.readFileSync(filePath, 'utf-8');
      const moduleTitle = extractFirstTitle(content, moduleName);
      
      // 检测是否为qhkc文件，使用相应的解析函数
      const isQhkcFile = filePath.includes('qhkc');
      const interfaces = isQhkcFile 
        ? parseQhkcMarkdownFile(moduleName, filePath, moduleTitle)
        : parseMarkdownFile(moduleName, filePath, moduleTitle);
      console.log(`  解析到 ${interfaces.length} 个接口`);
      console.log(`  模块标题: ${moduleTitle}`);

      if (interfaces.length > 0) {
        console.log(`  接口列表: ${interfaces.map((i) => i.name).join(', ')}`);
      }

      if (interfaces.length > 0) {
        // 生成TypeScript代码
        const tsCode = generateTypeScriptCode(interfaces, moduleName);

        // 创建输出目录
        const outputDir = path.join(outputPath, moduleDir);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        // 写入文件
        const outputFile = path.join(outputDir, `${moduleName}.ts`);
        fs.writeFileSync(outputFile, tsCode, 'utf-8');

        console.log(`  生成 ${interfaces.length} 个接口定义 -> ${path.relative(rootPath, outputFile)}`);
        totalInterfaces += interfaces.length;
      } else {
        console.log(`  未找到接口定义`);
      }
    } catch (error) {
      console.error(`  解析失败: ${error.message}`);
    }
  }

  console.log(`\n解析完成！共生成 ${totalInterfaces} 个接口定义`);
  console.log(`输出目录: ${path.relative(rootPath, outputPath)}`);
}

