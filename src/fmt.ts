/**
 * Defines the supported format specifiers.
 */
type Placeholder = 's' | 'd' | 'b' | 't' | 'v' | 'j';

/**
 * Maps a format specifier to its corresponding TypeScript type.
 */
type TypeFromPlaceholder<P extends Placeholder> =
  P extends 's' ? string :
  P extends 'd' ? number :
  P extends 'b' ? number :
  P extends 't' ? boolean :
  P extends 'j' ? object :
  P extends 'v' ? any :
  never;

/**
 * Recursively parses a format string and extracts the types of the arguments
 * that should be provided.
 *
 * @example
 * // returns [string, number]
 * type Args = ExtractArgs<"Hello %s, the year is %d">
 */
type ExtractArgs<T extends string> =
  // Check for an escaped '%%'
  T extends `${string}%%${infer Rest}`
    // If found, ignore it and continue parsing the rest of the string.
    ? ExtractArgs<Rest>
    // Check for a format specifier like '%s' or '%d'
    : T extends `${string}%${infer P}${infer Rest}`
      // Check if the character after '%' is a valid placeholder
      ? P extends Placeholder
        // If it's a valid placeholder, create a tuple with the mapped type
        // and recursively parse the rest of the string.
        ? [TypeFromPlaceholder<P>, ...ExtractArgs<Rest>]
        // If it's not a valid placeholder (e.g., %z), ignore it and continue.
        : ExtractArgs<Rest>
      // Base case: If no more placeholders are found, return an empty tuple.
      : [];

/**
 * Formats a value based on the provided placeholder verb.
 * @param verb The format specifier verb (e.g., 's', 'd').
 * @param value The value to format.
 * @returns The formatted string.
 */
function formatValue(verb: Placeholder, value: any): string {
  switch (verb) {
    case 's':
      return String(value);
    case 'd':
      // The type system ensures this is a number, but we cast for safety.
      return String(Number(value));
    case 'b':
      return (Number(value)).toString(2);
    case 't':
      return String(Boolean(value));
    case 'j':
      try {
        return JSON.stringify(value);
      } catch (e) {
        if (e instanceof Error) {
            return `[JSON.stringify error: ${e.message}]`;
        }
        return '[JSON.stringify error]';
      }
    case 'v':
      if (value && typeof value.toString === 'function' && value.toString !== Object.prototype.toString) {
        return value.toString();
      }
      if (typeof value === 'object' && value !== null) {
        try {
            return JSON.stringify(value);
        } catch (e) {
            if (e instanceof Error) {
                return `[JSON.stringify error: ${e.message}]`;
            }
            return '[JSON.stringify error]';
        }
      }
      return String(value);
    default:
      // This should not be reachable if the regex is correct.
      return String(value);
  }
}

/**
 * Formats a string according to a format specifier and returns the resulting string.
 *
 * @param format The format string, containing placeholders like %s, %d, etc.
 * @param args The values to substitute into the format string.
 * @returns The formatted string.
 */
export function sprintf<T extends string>(
  format: T,
  ...args: ExtractArgs<T>
): string {
  let argIndex = 0;
  const regex = /%%|%([sdbtjv])/g;

  return format.replace(regex, (match, verb: Placeholder) => {
    if (match === '%%') {
      return '%';
    }

    if (argIndex < args.length) {
      const arg = args[argIndex];
      argIndex++;
      return formatValue(verb, arg);
    }

    // This case happens if there are more placeholders than arguments.
    // Go's fmt prints e.g., "%!(BADINDEX)"
    return `%!(${verb})`;
  });
}

/**
 * Formats a string according to a format specifier and prints it to the console.
 *
 * @param format The format string, containing placeholders like %s, %d, etc.
 * @param args The values to substitute into the format string.
 */
export function println<T extends string>(
  format: T,
  ...args: ExtractArgs<T>
): void {
  const output = sprintf(format, ...args);
  console.log(output);
}
