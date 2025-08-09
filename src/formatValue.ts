import { Placeholder } from './types';

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
 * Applies padding to a string based on width and flags.
 */
function applyPadding(s: string, options: FormatOptions): string {
  const { width, flags } = options;
  if (!width || s.length >= width) {
    return s;
  }

  const padChar = flags.includes('0') ? '0' : ' ';
  const padding = padChar.repeat(width - s.length);

  return flags.includes('-') ? s + padding : padding + s;
}

/**
 * Formats a value based on the provided placeholder verb and options.
 * @param options The formatting options.
 * @param value The value to format.
 * @returns The formatted string.
 */
export function formatValue(options: FormatOptions, value: any): string {
  const { verb, precision } = options;
  let formatted: string;

  switch (verb) {
    case 's':
      formatted = String(value);
      if (precision !== undefined) {
        formatted = formatted.substring(0, precision);
      }
      break;
    case 'd':
      formatted = String(Math.trunc(Number(value)));
      break;
    case 'b':
      formatted = (Number(value)).toString(2);
      break;
    case 'o':
      formatted = (Number(value)).toString(8);
      break;
    case 'c':
      formatted = String.fromCharCode(Number(value));
      break;
    case 't':
      formatted = String(Boolean(value));
      break;
    case 'j':
      formatted = JSON.stringify(value);
      break;
    case 'f':
      formatted = (Number(value)).toFixed(precision ?? 6);
      break;
    case 'x':
      formatted = (Number(value)).toString(16);
      break;
    case 'X':
      formatted = (Number(value)).toString(16).toUpperCase();
      break;
    case 'q':
      formatted = JSON.stringify(String(value));
      break;
    case 'T':
      if (typeof value === 'function') {
        formatted = value.name ? `func ${value.name}` : 'func';
      } else if (value === null) {
        formatted = 'null';
      } else if (Array.isArray(value)) {
        formatted = 'array';
      } else {
        formatted = typeof value;
      }
      break;
    case 'v':
      if (value && typeof value.toString === 'function' && value.toString !== Object.prototype.toString) {
        formatted = value.toString();
      } else if (typeof value === 'object' && value !== null) {
        formatted = JSON.stringify(value);
      } else {
        formatted = String(value);
      }
      break;
    default:
      formatted = String(value);
  }

  return applyPadding(formatted, options);
}
