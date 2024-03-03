import type { BaseModel } from '../model/base-model';

export type TModelOnlyId = {
  id: string | number;
};

export type TModelType = typeof BaseModel;

export type TModelMethod = 'save' | 'toObject';

// 不带id的创建模型
export type TModelCreateNoId<Model extends BaseModel> = Omit<Model, 'id' | TModelMethod>;

// 创建模型，必须有id
export type TModelCreate<Model extends BaseModel> = Omit<Model, TModelMethod> & TModelOnlyId;

// 更新模型，必须有id
export type TModelUpdate<Model extends BaseModel> = Partial<Omit<Model, TModelMethod>> & TModelOnlyId;

// 模型对象数据
export type TModelData<Model extends BaseModel> = Omit<Model, TModelMethod>;

// 模型对象全部必填
export type TModelRequireData<Model extends BaseModel> = Required<Omit<Model, TModelMethod>>;

// 模型对象选项数据
export type TModelPartialData<Model extends BaseModel> = Partial<Omit<Model, TModelMethod>>;
