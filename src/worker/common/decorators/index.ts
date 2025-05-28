import { decoratorRegister, registerAndWrapHandler } from '@istock-shell/iswork';
import { ControllerTableReturnDecorator } from './controller-table-return.decorator';

export const TableReturn = registerAndWrapHandler<ControllerTableReturnDecorator>(
  decoratorRegister,
  ControllerTableReturnDecorator
);
