import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';

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
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Generates a salted hash for a given password.
 * @param {string} password - The plain text password to hash.
 * @returns {string} The salted hash in the format `salt:hash`.
 */
export function saltAndHashPassword(password: string): string {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');

  // Create a hash of the password and salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  // Return the salt and hash as a single string
  return `${salt}:${hash}`;
}

/**
 * Verifies a password against a stored salted hash.
 * @param {string} password - The plain text password to verify.
 * @param {string} storedHash - The stored salted hash in the format `salt:hash`.
 * @returns {boolean} True if the password matches the hash, false otherwise.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  // Split the stored hash to retrieve the salt
  const [salt, originalHash] = storedHash.split(':');

  // Generate a hash from the provided password using the same salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  // Compare the generated hash with the original hash
  return hash === originalHash;
}
