import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using `clsx` and merges them using `twMerge`.
 *
 * @param {...ClassValue[]} inputs - The class names to combine and merge.
 * @returns {string} - The combined and merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Extracts the initials from a name string. If the name is a single word,
 * returns the first two letters of the word. If the name consists of multiple
 * words, return the first letter of each word.
 *
 * @param {string} name - The name string to extract initials from.
 * @returns {string} - The initials extracted from the name.
 */
export function getInitials(name: string): string {
  const names = name.split(' ');
  return names.length === 1
    ? names[0].substring(0, 2)
    : names.map((n) => n[0]).join('');
}

/**
 * Formats a date string or Date object into a human-readable string in the
 * format "Month, Day, Year".
 *
 * @param {string | Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
