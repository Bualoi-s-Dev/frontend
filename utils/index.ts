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

  export async function fetchImageAsBase64  (url: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      
      reader.onloadend = () => {
        base64Image.value = reader.result as string;
      };
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };