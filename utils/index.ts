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