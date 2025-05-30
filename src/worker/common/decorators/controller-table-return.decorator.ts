import { type ApplicationContext, BaseModel, Decorator, type ModelType } from '@istock-shell/iswork';
import { ScopeError } from '@istock-shell/util';
import { CONTROLLER_TABLE_RETURN_METADATA } from '../constants';
import { parseFilterConditions, parseCmdInfoToUnit } from '../index';

export type TTableReturnOptions = {
  Model: ModelType;
  caption?: string;
  unit?: string; // 某些数据不是以个分位开始的，初始值需要重置单位。 列名称:行名称·单位
  pipe?: string; // 某些数据不是想要的格式，需要重新格式化。  列名称:行名称·单位
};

/**
 * 控制器方法装饰器，定义控制器方法返回数据，处理成标准表格返回数据
 *
 */
export class ControllerTableReturnDecorator extends Decorator.ControllerMethodReturnDecorator {
  constructor() {
    super(CONTROLLER_TABLE_RETURN_METADATA);
  }

  // @ts-expect-error 为了复用ControllerMethodReturnDecorator装饰器代码
  handler(options: TTableReturnOptions): MethodDecorator {
    const { Model, caption, unit, pipe } = options;
    const filterConditions = parseFilterConditions(pipe);
    if (Model && Model.prototype instanceof BaseModel) {
      return super.handler([
        // 转成标准表格数据
        {
          name: '表格·标准数据',
          args: [Object.keys(new Model()), unit ?? ''],
        },
        {
          name: '表格·格式化',
          args: [filterConditions, (ctx: ApplicationContext) => ctx.app.getPipeRecord()],
        },
        // 处理单位换算并表格数据对象化
        {
          name: '表格·单位',
          args: [parseCmdInfoToUnit],
        },
        // 返回表格ui所需要的数据
        {
          name: '表格·标准返回',
          args: [caption ?? ''],
        },
      ]);
    } else {
      throw new ScopeError(`domains.${this.constructor.name}`, 'Table装饰器参数错误');
    }
  }
}
