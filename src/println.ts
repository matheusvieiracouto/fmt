import { sprintf } from './sprintf.ts';
import { ExtractArgs } from './types.ts';

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
