import { describe, it, expect } from 'vitest';
import { sprintf } from './sprintf';

describe('sprintf', () => {
  it('should format a simple string', () => {
    expect(sprintf('Hello, %s!', 'world')).toBe('Hello, world!');
  });

  it('should format a decimal number', () => {
    expect(sprintf('The answer is %d.', 42)).toBe('The answer is 42.');
  });

  it('should format a boolean', () => {
    expect(sprintf('Is this true? %t.', true)).toBe('Is this true? true.');
  });

  it('should handle multiple placeholders', () => {
    expect(sprintf('%s is %d years old.', 'John', 30)).toBe('John is 30 years old.');
  });

  // New format specifiers
  it('should format a float', () => {
    expect(sprintf('The value of pi is approx %f.', 3.14159)).toBe('The value of pi is approx 3.14159.');
  });

  it('should format a number as binary', () => {
    expect(sprintf('10 in binary is %b.', 10)).toBe('10 in binary is 110.');
  });

  it('should format a number as lowercase hex', () => {
    expect(sprintf('255 in hex is %x.', 255)).toBe('255 in hex is ff.');
  });

  it('should format a number as uppercase hex', () => {
    expect(sprintf('255 in hex is %X.', 255)).toBe('255 in hex is FF.');
  });

  it('should format a string as quoted', () => {
    expect(sprintf('He said: %q.', 'Hello there')).toBe('He said: "Hello there".');
  });

  it('should format an object as JSON', () => {
    const obj = { name: 'John', age: 30 };
    expect(sprintf('The user object is %j.', obj)).toBe('The user object is {"name":"John","age":30}.');
  });

  it('should print the type of a value', () => {
    expect(sprintf('Type of "hello" is %T', 'hello')).toBe('Type of "hello" is string');
    expect(sprintf('Type of 123 is %T', 123)).toBe('Type of 123 is number');
    expect(sprintf('Type of null is %T', null)).toBe('Type of null is null');
    expect(sprintf('Type of [] is %T', [])).toBe('Type of [] is array');
  });

  // %v (default format)
  describe('%v specifier', () => {
    it('should format a string with %v', () => {
      expect(sprintf('Value: %v', 'hello')).toBe('Value: hello');
    });

    it('should format a number with %v', () => {
      expect(sprintf('Value: %v', 123)).toBe('Value: 123');
    });

    it('should format an object with %v', () => {
      const obj = { a: 1 };
      expect(sprintf('Value: %v', obj)).toBe('Value: {"a":1}');
    });

    it('should use custom toString method for %v', () => {
      class Person {
        constructor(public name: string) {}
        toString() {
          return `Person(${this.name})`;
        }
      }
      const person = new Person('John');
      expect(sprintf('User: %v', person)).toBe('User: Person(John)');
    });
  });

  // Edge cases
  it('should handle escaped percent signs', () => {
    expect(sprintf('This is a 100%% test.')).toBe('This is a 100% test.');
  });

  it('should handle more placeholders than arguments', () => {
    // @ts-expect-error - Testing invalid usage
    expect(sprintf('First: %s, Second: %d', 'hello')).toBe('First: hello, Second: %!(d)');
  });

  it('should ignore extra arguments', () => {
    expect(sprintf('Hello, %s!', 'world', 'extra')).toBe('Hello, world!');
  });
});
