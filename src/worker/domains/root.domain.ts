import { Global, Domain } from '@istock/iswork';
import { GlobalDomain } from './global/global.domain';
import { InputDomain } from './input/input.domain';
import { AgDomain } from './ag/ag.domain';
import { WzdhDomain } from './wzdh/wzdh.domain';
import { KzzDomain } from './kzz/kzz.domain';
import { TzrlDomain } from './tzrl/tzrl.domain';

@Global()
@Domain({
  name: 'root',
  viewName: '根',
  imports: [GlobalDomain, InputDomain, AgDomain, WzdhDomain, KzzDomain, TzrlDomain],
  providers: [],
})
export class RootDomain {}
