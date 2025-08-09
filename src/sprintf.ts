import { ExtractArgs, Placeholder } from './types';
import { formatValue } from './formatValue';

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
  const regex = /%%|%([sdbtjfxXqTv])/g;

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
