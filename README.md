# Go Fmt TS

A TypeScript library for Go-style string formatting, with type inference.

## Installation

```bash
npm install go-fmt-ts
```

## Usage

This library provides `sprintf` for formatting strings and `println` for printing to the console, similar to Go's `fmt` package.

### `sprintf`

The `sprintf` function formats a string according to a format specifier.

```typescript
import { sprintf } from 'go-fmt-ts';

const name = 'world';
const formatted = sprintf('Hello, %s!', name);
console.log(formatted); // "Hello, world!"

const year = 2023;
const population = 8000000000;
const info = sprintf('In %d, the world population is %d.', year, population);
console.log(info); // "In 2023, the world population is 8000000000."
```

### `println`

The `println` function formats a string and prints it to the console.

```typescript
import { println } from 'go-fmt-ts';

println('Hello, %s!', 'world'); // Prints "Hello, world!" to the console.
```

## Format Specifiers

The following format specifiers are supported:

| Specifier | Type      | Description                               |
|-----------|-----------|-------------------------------------------|
| `%s`      | `string`  | Formats a string.                         |
| `%d`      | `number`  | Formats a number as a decimal integer.    |
| `%b`      | `number`  | Formats a number as a binary integer.     |
| `%t`      | `boolean` | Formats a boolean as `true` or `false`.   |
| `%j`      | `object`  | Formats an object as a JSON string.       |
| `%v`      | `any`     | Formats any value in a default way.       |

### Custom Formatting with `toString()`

If an object with a custom `toString()` method is passed to `%s` or `%v`, its `toString()` method will be used for formatting.

```typescript
class Person {
  constructor(public name: string, public age: number) {}

  toString(): string {
    return `${this.name} (${this.age} years old)`;
  }
}

const person = new Person('John Doe', 30);
println('User: %v', person); // "User: John Doe (30 years old)"
```
