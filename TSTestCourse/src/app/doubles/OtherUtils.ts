// OtherUtils.ts - Example implementations for functions and classes

export function calculateComplexity(data: {
  length: number;
  extraInfo: any;
}): number {
  // Example implementation of calculateComplexity
  return data.length + 10; // Simulated complexity calculation
}

export function toUpperCaseWithCb(
  str: string,
  callback: (msg: string) => void
): string | undefined {
  if (str.length === 0) {
    callback("Invalid argument!");
    return undefined;
  }
  callback(`called function with ${str}`);
  return str.toUpperCase();
}

export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

export function toLowerCaseWithId(str: string): string {
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
  return `${str.toLowerCase()}${uuid}`;
}

export class OtherStringUtils {
  toUpperCase(str: string): string {
    return str.toUpperCase();
  }

  logString(str: string): void {
    console.log(str);
  }

  callExternalService(): void {
    console.log("calling external service...");
  }
}
