/**
 * Formats a date to ISO string with timezone
 */
export function formatDateToISO(date: Date): string {
  return date.toISOString();
}

/**
 * Checks if a date is in the past
 */
export function isPast(date: Date): boolean {
  return date < new Date();
}

/**
 * Checks if a date is in the future
 */
export function isFuture(date: Date): boolean {
  return date > new Date();
}

/**
 * Adds days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtracts days from a date
 */
export function subtractDays(date: Date, days: number): Date {
  return addDays(date, -days);
}
