import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements';

type HTMLProps<Property extends string, Override> = Omit<SvelteHTMLElements[Property], keyof Override> & Override;
export type TFieldAttributes<Tag extends string> = HTMLProps<Tag, HTMLAttributes<any>>;
export type TFieldRule = {
  required?: boolean;
  message?: string;
  trigger: string;
  validate?: (value: unknown) => Promise<void>;
};
export type IDynamicFormValue = Record<string, unknown>;
export interface IDynamicFormField<Tag extends string> {
  componentName: string;
  name: string;
  label?: string;
  attributes: TFieldAttributes<Tag>;
  rules: TFieldRule[];
}

export interface IDynamicFormData {
  title?: string;
  size?: string;
  labelWidth?: string;
  fields: Array<IDynamicFormField<any>>;
  values: IDynamicFormValue;
}
