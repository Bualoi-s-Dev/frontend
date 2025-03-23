import { DayName } from "~/types/api";

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

/**
 * Reads a File or Blob as a base64 data URL.
 *
 * @param file - The File or Blob to read.
 * @returns A Promise that resolves with the base64 data URL.
 */

export function readFileAsDataURL(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Recursively checks if two objects are equal. Works with nested objects and
 * arrays.
 *
 * @param {any} x - The first object to compare.
 * @param {any} y - The second object to compare.
 * @returns {boolean} Whether the two objects are equal.
 * 
 * @see https://stackoverflow.com/a/32922084
 */
export function deepEqual(x: any, y: any): boolean {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
    ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}

export async function fetchImageAsBase64(url: string): Promise<string> {
  return new Promise(async (resolve) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = () => {
      resolve(reader.result as string)
    };
  })
};

export const dayNameToDayIndex = (n: DayName): number => {
  switch (n) {
    case DayName.SUN: return 0;
    case DayName.MON: return 1;
    case DayName.TUE: return 2;
    case DayName.WED: return 3;
    case DayName.THU: return 4;
    case DayName.FRI: return 5;
    case DayName.SAT: return 6;
    default: throw Error("Invalid day name: " + n);
  }
}

export const timeout = function (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}