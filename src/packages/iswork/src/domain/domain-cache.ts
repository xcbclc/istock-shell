import type { IAnyClass } from '../interfaces';
import type { Domain } from './domain';

export class DomainCache extends Map<IAnyClass, Domain> {
  static create() {
    return new this();
  }
}
