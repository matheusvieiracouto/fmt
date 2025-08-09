# Go Fmt TS: A Go-Style Formatting Library for TypeScript

`go-fmt-ts` is a TypeScript library that brings the power and convenience of Go's `fmt` package to the TypeScript world. It provides a type-safe implementation of `sprintf` that allows you to format strings using Go-style verbs, flags, and precision specifiers.

This guide is designed to be educational, helping you understand the concepts behind `sprintf`-style formatting, which are directly applicable to both this library and Go itself.

## Installation

```bash
npm install go-fmt-ts
```

## Core Concepts: The Format String

The core of the library is the **format string**, a string that contains plain text mixed with **format verbs**. Each verb is a placeholder that corresponds to an argument passed to the `sprintf` function.

A verb has the following structure: `%[flags][width][.precision]verb`

- **`%`**: The character that starts a format verb.
- **`verb`**: A character that specifies the type of formatting to apply (e.g., `s` for string, `d` for decimal).
- **`[flags]` (optional)**: Characters that modify the formatting, such as ` -` for left-alignment or `0` for zero-padding.
- **`[width]` (optional)**: A number that specifies the minimum width of the output.
- **`[.precision]` (optional)**: A dot followed by a number that specifies the precision for numbers or the max length for strings.

**Example:**
In the format string `"%05.2f"`, `%` is the start, `f` is the verb, `0` is a flag, `5` is the width, and `.2` is the precision.

## Verbs in Detail

The verb determines how a value is formatted. This library aims to replicate the behavior of Go's `fmt` verbs.

| Verb | Go Type | TS Type | Description & Example |
| :--- | :--- | :--- | :--- |
| **`%s`** | `string` | `string` | Formats a simple string. `sprintf("%s", "hello")` -> `"hello"` |
| **`%q`** | `string` | `string` | Formats a string in double quotes, with Go-syntax escaping. `sprintf("%q", "hi")` -> `"\"hi\""` |
| **`%d`** | `int` | `number` | Formats a number in base-10 decimal. `sprintf("%d", 123)` -> `"123"` |
| **`%b`** | `int` | `number` | Formats a number in base-2 binary. `sprintf("%b", 10)` -> `"110"` |
| **`%o`** | `int` | `number` | Formats a number in base-8 octal. `sprintf("%o", 8)` -> `"10"` |
| **`%x`** | `int` | `number` | Formats a number in base-16 hexadecimal (lowercase). `sprintf("%x", 255)` -> `"ff"` |
| **`%X`** | `int` | `number` | Formats a number in base-16 hexadecimal (uppercase). `sprintf("%X", 255)` -> `"FF"` |
| **`%c`** | `int` | `number` | Formats a character from its integer code point. `sprintf("%c", 65)` -> `"A"` |
| **`%f`** | `float` | `number` | Formats a floating-point number. `sprintf("%.2f", 3.1415)` -> `"3.14"` |
| **`%t`** | `bool` | `boolean`| Formats a boolean as `true` or `false`. `sprintf("%t", true)` -> `"true"` |
| **`%j`** | `any` | `object` | Formats an object as a JSON string (a `go-fmt-ts` specific addition). `sprintf("%j", {a:1})` -> `"{\"a\":1}"` |
| **`%T`** | `any` | `any` | Prints the type of the value. `sprintf("%T", "s")` -> `"string"`, `sprintf("%T", func)` -> `"func myFunc"` |
| **`%v`** | `any` | `any` | The default format. For structs, this prints the fields. For other values, it's similar to `%s` or `%d`. |

## Flags, Width, and Precision

You can control the alignment and padding of your formatted strings.

### Width

Width specifies the minimum number of characters to output. If the value is shorter, it will be padded.

```typescript
// Right-alignment (default)
sprintf("|%10s|", "hello"); // -> "|     hello|"

// Left-alignment with the '-' flag
sprintf("|%-10s|", "hello"); // -> "|hello     |"
```

### Zero-Padding

For numbers, you can use the `0` flag to pad with leading zeros instead of spaces.

```typescript
sprintf("%05d", 123); // -> "00123"
```

### Precision

Precision has different meanings for different verbs:
- **For floats (`%f`):** The number of digits after the decimal point.
- **For strings (`%s`):** The maximum number of characters to output.

```typescript
// Float precision
sprintf("%.2f", 123.4567); // -> "123.46"

// String precision
sprintf("%.3s", "hello, world"); // -> "hel"

// Combined with width
sprintf("%10.2f", 123.4567); // -> "    123.46"
```

## Custom Formatting with `toString()`

If you pass an object with a custom `toString()` method to `%v` or `%s`, its method will be called to get the string representation, similar to Go's `Stringer` interface.

```typescript
class Person {
  constructor(public name: string) {}
  toString() {
    return `Person<${this.name}>`;
  }
}
const person = new Person('John');
sprintf("User: %v", person); // -> "User: Person<John>"
```

## Type Safety

This library uses advanced TypeScript features to provide compile-time type safety. It parses the format string and infers the expected types of the arguments.

```typescript
// This will show a TypeScript error because %d expects a number.
sprintf("Name: %s, Age: %d", "John", "thirty"); // Error!
```
