import { ExtractArgs, Placeholder } from './types';
import { formatValue } from './formatValue';

/**
 * Represents the formatting options for a single placeholder.
 */
interface FormatOptions {
  verb: Placeholder;
  flags: string;
  width?: number;
  precision?: number;
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
  // Regex to capture: %% or %<flags><width><.precision><verb>
  const regex = /%%|%(\+|-|0| )*?(\d+)?(\.\d+)?([vTjtsqfdbxXoc])/g;

  return format.replace(regex, (match, flags: string = '', widthStr: string, precisionStr: string, verb: Placeholder) => {
    if (match === '%%') {
      return '%';
    }

    if (argIndex < args.length) {
      const arg = args[argIndex];
      argIndex++;

      const options: FormatOptions = {
        verb,
        flags: flags || '',
        width: widthStr ? parseInt(widthStr, 10) : undefined,
        // Remove the leading dot from precision
        precision: precisionStr ? parseInt(precisionStr.substring(1), 10) : undefined,
      };

      // The formatValue function will be updated in the next step to handle options
      // @ts-ignore - We will fix this in the next step
      return formatValue(options, arg);
    }

    // This case happens if there are more placeholders than arguments.
    return `%!(${verb})`;
  });
}
