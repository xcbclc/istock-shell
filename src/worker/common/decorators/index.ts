import { decoratorRegister, registerAndWrapHandler } from '@istock/iswork';
import { ControllerTableReturnDecorator } from './controller-table-return.decorator';

export const TableReturn = registerAndWrapHandler<ControllerTableReturnDecorator>(
  decoratorRegister,
  ControllerTableReturnDecorator
);
