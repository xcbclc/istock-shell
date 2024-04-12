import { Global, Domain } from '@istock/iswork';
import { GlobalDomain } from './global/global.domain';
import { InputDomain } from './input/input.domain';
import { AgDomain } from './ag/ag.domain';
import { WzdhDomain } from './wzdh/wzdh.domain';

@Global()
@Domain({
  name: 'root',
  viewName: '根',
  imports: [GlobalDomain, InputDomain, AgDomain, WzdhDomain],
  providers: [],
})
export class RootDomain {}
