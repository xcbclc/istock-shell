/**
 * @fileoverview ORM 模型类型定义
 * @description 定义了 ORM 系统中模型相关的类型，包括创建、更新、查询等操作的数据类型
 */

import type { BaseModel } from '../model/base-model';

/**
 * 仅包含 ID 的模型类型
 * @description 定义只包含 ID 字段的模型结构
 */
export type ModelOnlyId = {
  /** 模型唯一标识符 */
  id: string | number;
};

/**
 * 模型类型
 * @description 定义模型类的类型，指向 BaseModel 的构造函数
 */
export type ModelType = typeof BaseModel;

/**
 * 模型方法类型
 * @description 定义模型实例的方法名称
 */
export type ModelMethod = 'save' | 'toObject';

/**
 * 创建模型类型（不包含 ID）
 * @description 定义创建新模型时的数据结构，排除 ID 和方法
 * @template Model 继承自 BaseModel 的模型类型
 */
export type ModelCreateNoId<Model extends BaseModel> = Omit<Model, 'id' | ModelMethod>;

/**
 * 创建模型类型（包含 ID）
 * @description 定义创建模型时的数据结构，必须包含 ID
 * @template Model 继承自 BaseModel 的模型类型
 */
export type ModelCreate<Model extends BaseModel> = Omit<Model, ModelMethod> & ModelOnlyId;

/**
 * 更新模型类型
 * @description 定义更新模型时的数据结构，必须包含 ID，其他字段可选
 * @template Model 继承自 BaseModel 的模型类型
 */
export type ModelUpdate<Model extends BaseModel> = Partial<Omit<Model, ModelMethod>> & ModelOnlyId;

/**
 * 模型数据类型
 * @description 定义模型的纯数据结构，排除方法
 * @template Model 继承自 BaseModel 的模型类型
 */
export type ModelData<Model extends BaseModel> = Omit<Model, ModelMethod>;

/**
 * 模型必填数据类型
 * @description 定义模型的完整数据结构，所有字段都是必填的
 * @template Model 继承自 BaseModel 的模型类型
 */
export type ModelRequireData<Model extends BaseModel> = Required<Omit<Model, ModelMethod>>;

/**
 * 模型可选数据类型
 * @description 定义模型的部分数据结构，所有字段都是可选的
 * @template Model 继承自 BaseModel 的模型类型
 */
export type ModelPartialData<Model extends BaseModel> = Partial<Omit<Model, ModelMethod>>;
