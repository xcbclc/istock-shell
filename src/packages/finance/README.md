# @istock-shell/finance

一个成熟的金融数据分析工具包，提供数据清洗、技术指标、财务指标、统计计算和表格处理等功能。

## 特性

- **数据清洗与预处理**：缺失值处理、异常值检测、标准化、归一化、格式转换
- **技术指标计算**：MA、EMA、MACD、RSI、KDJ、布林带、ATR、ROC等
- **财务指标计算**：DCF估值、PE、PB、PS、ROE、ROA、财务比率等
- **常规统计计算**：均值、中位数、标准差、方差、相关系数、回归分析等
- **表格数据处理**：转置、旋转、排序、过滤、合并、分组、聚合、透视表
- **函数管道支持**：提供`pipe`函数和`Flow`类支持链式调用
- **类型安全**：完整的TypeScript类型定义
- **单元测试**：全面的测试覆盖

## 安装

```bash
npm install @istock-shell/finance
# 或
pnpm add @istock-shell/finance
# 或
yarn add @istock-shell/finance
```

## 快速开始

```typescript
import {
  // 管道工具
  pipe,
  flow,

  // 数据清洗
  handleMissingValues,
  standardize,

  // 技术指标
  sma,
  ema,
  macd,
  rsi,

  // 财务指标
  pe,
  pb,
  roe,

  // 统计计算
  mean,
  std,
  correlation,

  // 表格操作
  sortTable,
  groupBy,
  pivotTable,
} from '@istock-shell/finance';

// 使用管道处理数据
const processData = pipe(
  (data: number[]) => handleMissingValues(data, { missingValueStrategy: 'fill' }),
  standardize,
  (data) => sma(data, 5)
);

const result = processData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 使用流式处理
const total = flow([1, 2, 3, 4, 5])
  .pipe((arr) => arr.filter((x) => x > 2))
  .pipe((arr) => arr.map((x) => x * 2))
  .pipe((arr) => arr.reduce((a, b) => a + b, 0))
  .value(); // 24

// 计算财务指标
const peRatio = pe(100, 5); // 20
const roeRatio = roe(10, 100); // 10%

// 表格操作
const salesData = [
  { region: 'North', product: 'A', sales: 100 },
  { region: 'North', product: 'B', sales: 150 },
  { region: 'South', product: 'A', sales: 200 },
];

const pivot = pivotTable(salesData, 'region', 'product', 'sales', 'sum');
```

## 模块说明

### 1. 管道工具 (`pipe`)

- `pipe(...fns)`：组合多个函数
- `flow(value)`：创建流式处理实例
- `Flow` 类：支持链式调用的数据处理管道

### 2. 数据清洗与预处理 (`data-cleaning`)

- 缺失值处理：`handleMissingValues`
- 异常值检测：`detectOutliersIQR`, `detectOutliersZScore`
- 标准化和归一化：`standardize`, `normalize`
- 数据格式转换：`convertOHLCFormat`, `convertTableTypes`

### 3. 技术指标计算 (`technical-indicators`)

- 移动平均线：`sma`, `ema`, `wma`, `ma`
- 趋势指标：`macd`, `rsi`, `kdj`
- 波动指标：`bollingerBands`, `atr`
- 动量指标：`roc`

### 4. 财务指标计算 (`financial-metrics`)

- 估值指标：`dcf`, `pe`, `pb`, `ps`
- 盈利能力：`roe`, `roa`, `grossMargin`, `netMargin`
- 偿债能力：`debtToAssetRatio`, `currentRatio`, `quickRatio`
- 每股指标：`eps`, `bvps`
- 批量计算：`calculateFinancialRatios`

### 5. 常规统计计算 (`statistics`)

- 描述性统计：`mean`, `median`, `mode`, `std`, `variance`
- 分布分析：`skewness`, `kurtosis`, `percentile`, `quartiles`
- 关系分析：`covariance`, `correlation`, `linearRegression`
- 综合统计：`descriptiveStats`

### 6. 表格数据处理 (`table-operations`)

- 结构变换：`transposeMatrix`, `transposeTable`, `rotateMatrix`
- 数据操作：`sortTable`, `filterTable`, `selectColumns`, `renameColumns`
- 数据合并：`concatTables`, `leftJoin`, `innerJoin`
- 分组聚合：`groupBy`, `aggregate`, `pivotTable`
- 统计分析：`tableDescriptiveStats`

## 类型定义

包提供了完整的TypeScript类型定义，包括：

- `OHLC`：开盘、最高、最低、收盘数据
- `Series`：数值序列
- `TableData`：表格数据
- 各种配置选项接口

## 开发

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 运行测试（监视模式）
pnpm test:watch

# 生成测试覆盖率报告
pnpm test:coverage

# 构建包
pnpm build
```

## 测试

项目使用Vitest进行单元测试，测试覆盖所有主要功能模块。

## 许可证

MIT
