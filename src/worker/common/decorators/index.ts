import { decoratorRegister, registerAndWrapHandler } from '@istock/iswork';
import { ControllerAKshareReturnDecorator } from './controller-akshare-return.decorator';

export const AKshareReturn = registerAndWrapHandler<ControllerAKshareReturnDecorator>(
  decoratorRegister,
  ControllerAKshareReturnDecorator
);
