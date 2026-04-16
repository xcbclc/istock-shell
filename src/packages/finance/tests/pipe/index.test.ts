import { describe, it, expect } from 'vitest';
import { pipe, flow, Flow } from '../../src/pipe';

describe('pipe function', () => {
  it('should compose functions correctly', () => {
    const add = (x: number) => x + 1;
    const multiply = (x: number) => x * 2;
    const process = pipe(add, multiply);
    expect(process(5)).toBe(12); // (5 + 1) * 2 = 12
  });

  it('should handle single function', () => {
    const double = (x: number) => x * 2;
    const process = pipe(double);
    expect(process(5)).toBe(10);
  });

  it('should handle multiple functions', () => {
    const add = (x: number) => x + 1;
    const multiply = (x: number) => x * 2;
    const subtract = (x: number) => x - 3;
    const process = pipe(add, multiply, subtract);
    expect(process(5)).toBe(9); // ((5 + 1) * 2) - 3 = 9
  });

  it('should work with different types', () => {
    const toStr = (x: number) => x.toString();
    const addExclamation = (s: string) => s + '!';
    const process = pipe(toStr, addExclamation);
    expect(process(5)).toBe('5!');
  });
});

describe('Flow class', () => {
  it('should chain operations correctly', () => {
    const result = flow([1, 2, 3, 4, 5])
      .pipe((arr) => arr.filter((x) => x > 2))
      .pipe((arr) => arr.map((x) => x * 2))
      .pipe((arr) => arr.reduce((a, b) => a + b, 0))
      .value();
    expect(result).toBe(24); // [3,4,5] -> [6,8,10] -> 24
  });

  it('should create new Flow instance on pipe', () => {
    const flow1 = flow(10);
    const flow2 = flow1.pipe((x) => x * 2);
    expect(flow1).not.toBe(flow2);
    expect(flow1.value()).toBe(10);
    expect(flow2.value()).toBe(20);
  });

  it('should have get() method as alias of value()', () => {
    const f = flow(42);
    expect(f.get()).toBe(42);
    expect(f.value()).toBe(42);
  });
});

describe('flow function', () => {
  it('should create Flow instance', () => {
    const result = flow(100);
    expect(result).toBeInstanceOf(Flow);
    expect(result.value()).toBe(100);
  });
});
