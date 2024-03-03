import { type ApplicationContext, BaseModel, Decorator, type TModelType } from '@istock/iswork';
import { ScopeError } from '@istock/util';
import { CONTROLLER_AKSHARE_RETURN_METADATA } from '../constants';
import { parseFilterConditions, parseCmdInfoToUnit } from '../index';

export type TAkShareReturnOptions = {
  Model: TModelType;
  caption?: string;
  unit?: string; // 某些数据不是以个分位开始的，初始值需要重置单位。 列名称:行名称·单位
  pipe?: string; // 某些数据不是想要的格式，需要重新格式化。  列名称:行名称·单位
};

/**
 * 控制器方法装饰器，定义控制器方法返回数据，针对akshare返回的数据
 *
 */
export class ControllerAKshareReturnDecorator extends Decorator.ControllerMethodReturnDecorator {
  readonly #defaultPipeName = 'AKShare·二维表格';
  constructor() {
    super(CONTROLLER_AKSHARE_RETURN_METADATA);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error 为了复用ControllerMethodReturnDecorator装饰器代码
  handler(options: TAkShareReturnOptions): MethodDecorator {
    const { Model, caption, unit, pipe } = options;
    const filterConditions = parseFilterConditions(pipe);
    if (Model && Model.prototype instanceof BaseModel) {
      return super.handler([
        // 转成标准表格数据
        {
          name: this.#defaultPipeName,
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
          name: '返回·标准表格',
          args: [caption ?? ''],
        },
      ]);
    } else {
      throw new ScopeError(`domains.${this.constructor.name}`, 'AKshare装饰器参数错误');
    }
  }
}
