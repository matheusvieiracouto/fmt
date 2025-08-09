import { Placeholder } from './types';

/**
 * Formats a value based on the provided placeholder verb.
 * @param verb The format specifier verb (e.g., 's', 'd').
 * @param value The value to format.
 * @returns The formatted string.
 */
export function formatValue(verb: Placeholder, value: any): string {
  switch (verb) {
    case 's':
      return String(value);
    case 'd':
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
    case 'f':
        return String(Number(value));
    case 'x':
        return (Number(value)).toString(16);
    case 'X':
        return (Number(value)).toString(16).toUpperCase();
    case 'q':
        return JSON.stringify(String(value));
    case 'T':
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';
        return typeof value;
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
