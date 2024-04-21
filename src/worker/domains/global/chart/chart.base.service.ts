import { type TControllerMethodComponentOutput } from '@istock/iswork';
import type { G2Spec } from '@antv/g2';
import { isNil, ScopeError, getMessageDataPK, EMessageDataFieldType } from '@istock/util';
import type { TUiTableProps, TTableFilterConditionRange, TTableFilterItem } from '@/worker/common';
import { parseFilterConditions } from '@/worker/common';
import type { TBarOption, TLineOption, TPieOption, TStockOption } from './chart.cmd';

export type TChartData = Array<Record<string, unknown>>;

export type TChartOptions = G2Spec;

export class ChartBaseService {
  readonly #theme: 'dark' = 'dark';
  readonly #textColor = '#958881';
  #getDefaultConfig() {
    return {
      autoFit: false,
    };
  }

  #getThemeConfig() {
    return {
      type: this.#theme,
      ...{
        view: {
          viewFill: 'transparent',
        },
        label: {
          fill: this.#textColor,
        },
        legendCategory: {
          itemLabelFill: this.#textColor,
        },
      },
    };
  }

  /**
   * 判断是否是表格UI输出数据
   * @param output
   * @private
   */
  protected isUiTableOutput(output: unknown): output is Array<TControllerMethodComponentOutput<TUiTableProps>> {
    return !isNil(output);
  }

  /**
   * 自动转换成图表需要的标准数据
   * @param outputs
   */
  protected autoToChartData(outputs: Array<TControllerMethodComponentOutput<TUiTableProps>>): TChartData | undefined {
    let chatData: TChartData | undefined;
    // 说明是管道符操作
    const output = outputs[0];
    if (output.component) {
      switch (output.component) {
        case 'ShTable':
          chatData = this.uiTableDataToChartData(output);
      }
    }
    return chatData;
  }

  /**
   * 表格组件数据转图表标准数据
   */
  protected uiTableDataToChartData(output: TControllerMethodComponentOutput<TUiTableProps>): TChartData {
    const { thead, tbody } = output.props;
    return tbody.map((row) => {
      const newRow: Record<string, unknown> = {};
      thead.forEach((header, columnIndex) => {
        const rowItem = row[columnIndex];
        newRow[header.value] = rowItem.value;
      });
      return newRow;
    });
  }

  /**
   * 过滤条件处理
   * @param data
   * @param filterStr
   */
  protected filterConditionHandler(data: TChartData, filterStr: string): TChartData {
    const filterConditions = parseFilterConditions(filterStr);
    const filterRowConditions: TTableFilterItem[] = [];
    const filterColumnConditions: TTableFilterItem[] = [];
    const filterRangeConditions: Array<{ range: TTableFilterConditionRange; pipe?: string }> = [];
    filterConditions.forEach((filterCondition) => {
      if (filterCondition.row) filterRowConditions.push(filterCondition.row);
      if (filterCondition.column) filterColumnConditions.push(filterCondition.column);
      if (filterCondition.range) {
        const { range, pipe } = filterCondition;
        filterRangeConditions.push({ range, pipe });
      }
    });
    // 条件互斥
    if (filterRangeConditions.length) {
      // todo
      throw new ScopeError(`global.${this.constructor.name}`, `暂未实现`);
    } else {
      data = data.filter((item, index) => {
        if (!filterRowConditions.length) return true;
        return filterRowConditions.every((filter) => {
          if (filter.name) {
            const { name, value } = filter;
            if (Number.isNaN(Number(name))) {
              if (name === '*') return true;
              return value ? item[name] === value : item[name];
            } else {
              return Number(name) === index + 1;
            }
          } else if (filter.value) {
            return Object.values(item).some((v) => v === filter.value);
          }
          return true;
        });
      });
      if (filterColumnConditions.length) {
        data = data.map((item) => {
          let newItem: Record<string, unknown> = {};
          filterColumnConditions.forEach((filter) => {
            if (!filter.name) {
              if (filter.value) {
                const isPass = Object.values(item).some((value) => value === filter.value);
                if (isPass) newItem = item;
              } else {
                newItem = item;
              }
              return;
            }
            if (filter.name === '*') {
              newItem = item;
              return;
            }
            if (isNil(filter.value) && item[filter.name]) {
              newItem[filter.name] = item[filter.name];
            }
            if (filter.value && filter.value === item[filter.name]) {
              newItem[filter.name] = item[filter.name];
            }
          });
          return newItem;
        });
      }
    }
    return data;
  }

  /**
   * 饼图数据转换
   */
  protected getPieChartConfig(chatData: TChartData, opt: TPieOption): TChartOptions {
    const { 纵轴: y, 类别: category, 单位: unit } = opt;
    if (!y) return {};
    const ctx = { y, category, unit };
    const chatOptions: TChartOptions = {
      type: 'interval',
      ...this.#getDefaultConfig(),
      theme: this.#getThemeConfig(),
      data: chatData,
      encode: { y, color: category ?? y },
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta', outerRadius: 0.8 },
      labels: [
        {
          position: 'outside',
          text: function (this: typeof ctx, data: Record<string, any>) {
            let text = '';
            const value = data[this.y] ?? null;
            if (this.category) {
              text = `${data[this.category]}: ${value}`;
            } else {
              text = `${value}`;
            }
            if (this.unit) {
              text += ` ${this.unit}`;
            }
            return text;
          },
          [getMessageDataPK('text', EMessageDataFieldType.Function)]: ctx,
        },
      ],
    };
    return chatOptions;
  }

  /**
   * 条形图数据转换
   * @param chatData
   * @param opt
   * @protected
   */
  protected getBarChartConfig(chatData: TChartData, opt: TBarOption): TChartOptions {
    const { 横轴: x, 纵轴: y, 类别: category } = opt;
    if (!y) return {};
    // const ctx = { x, y, category, unit };
    const chatOptions: TChartOptions = {
      type: 'interval',
      ...this.#getDefaultConfig(),
      theme: this.#getThemeConfig(),
      data: chatData,
      encode: { x, y },
    };
    if (category && chatOptions.encode) {
      chatOptions.encode.color = category;
    }
    return chatOptions;
  }

  /**
   * 折线图数据转换
   * @param chatData
   * @param opt
   * @protected
   */
  protected getLineChartConfig(chatData: TChartData, opt: TLineOption): TChartOptions {
    const { 横轴: x, 纵轴: y, 类别: category } = opt;
    if (!y) return {};
    // const ctx = { x, y, category, unit };
    const chatOptions: TChartOptions = {
      type: 'line',
      ...this.#getDefaultConfig(),
      theme: this.#getThemeConfig(),
      data: chatData,
      encode: { x, y },
    };
    if (category && chatOptions.encode) {
      chatOptions.encode.color = category;
    }
    return chatOptions;
  }

  /**
   * 获取股票蜡烛图
   * @param chatData
   * @param opt
   * @protected
   */
  protected getStockChartConfig(chatData: TChartData, opt: TStockOption): TChartOptions {
    const rangeColors = ['#028127', '#744f36', '#b50c2e'];
    const domainTexts = ['跌', '平', '涨'];
    const domainRecord: Record<string, string> = ['-1', '0', '1'].reduce<Record<string, string>>(
      (record, key, index) => {
        record[key] = domainTexts[index];
        return record;
      },
      {}
    );
    const { 横轴: x, 纵轴1: y1, 纵轴2: y2 } = opt;
    const [open, close] = y1.split(',');
    const [high, low] = y2.split(',');
    const ctx = { x, y1, y2, open, close, high, low, domainRecord };
    const chatOptions: TChartOptions = {
      type: 'view',
      ...this.#getDefaultConfig(),
      theme: this.#getThemeConfig(),
      data: {
        value: chatData,
        transform: [
          {
            type: 'map',
            callback: function (this: typeof ctx, d: Record<string, any>) {
              const date = new Date(d[this.x]);
              if (date.getTime()) {
                d[this.x] = date;
              }
              return d;
            },
            [getMessageDataPK('callback', EMessageDataFieldType.Function)]: ctx,
          },
        ],
      },
      scale: {
        color: { domain: domainTexts, range: rangeColors },
      },
      children: [
        {
          type: 'link',
          encode: {
            x,
            y: [low, high],
            color: function (this: typeof ctx, d: Record<string, any>) {
              return this.domainRecord[`${Math.sign(d[this.close] - d[this.open])}`];
            },
            [getMessageDataPK('color', EMessageDataFieldType.Function)]: ctx,
          },
        },
        {
          type: 'link',
          encode: {
            x,
            y: [open, close],
            color: function (this: typeof ctx, d: Record<string, any>) {
              return this.domainRecord[`${Math.sign(d[this.close] - d[this.open])}`];
            },
            [getMessageDataPK('color', EMessageDataFieldType.Function)]: ctx,
          },
          style: { lineWidth: 3 },
        },
      ],
    };
    return chatOptions;
  }
}
