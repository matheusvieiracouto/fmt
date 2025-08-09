/**
 * Defines the supported format specifiers.
 * s - string
 * d - number (decimal)
 * b - number (binary)
 * t - boolean
 * j - object (JSON)
 * f - number (float)
 * x - number (hex, lowercase)
 * X - number (hex, uppercase)
 * q - string (quoted)
 * T - any (prints the type of the value)
 * v - any (default format)
 */
export type Placeholder = 's' | 'd' | 'b' | 't' | 'j' | 'f' | 'x' | 'X' | 'q' | 'T' | 'v';

/**
 * Maps a format specifier to its corresponding TypeScript type.
 */
export type TypeFromPlaceholder<P extends Placeholder> =
  P extends 's' ? string :
  P extends 'd' ? number :
  P extends 'b' ? number :
  P extends 't' ? boolean :
  P extends 'j' ? object :
  P extends 'f' ? number :
  P extends 'x' ? number :
  P extends 'X' ? number :
  P extends 'q' ? string :
  P extends 'T' ? any :
  P extends 'v' ? any :
  never;

/**
 * Recursively parses a format string and extracts the types of the arguments
 * that should be provided.
 */
export type ExtractArgs<T extends string> =
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
