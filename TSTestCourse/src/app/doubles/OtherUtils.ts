import { v4 } from "uuid";

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object;
};

type LoggerServiceCallBack = (arg: string) => void;

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
  return arg.toLowerCase() + v4();
}

export function calculateComplexity(stringInfo: stringInfo) {
  if (
    !stringInfo ||
    typeof stringInfo.length !== "number" ||
    !stringInfo.extraInfo
  ) {
    throw new Error("Invalid input data for calculateComplexity");
  }
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

export function toUpperCaseWithCb(
  arg: string,
  callBack: LoggerServiceCallBack
) {
  if (!arg) {
    callBack("Invalid argument!");
    return;
  }
  callBack(`called function with ${arg}`);
  return arg.toUpperCase();
}

export class OtherStringUtils {
  public callExternalService() {
    console.log("Calling external service!!!");
  }

  public toUpperCase(arg: string) {
    if (!arg) {
      throw new Error("Invalid argument!");
    }
    return arg.toUpperCase();
  }

  public logString(arg: string) {
    if (!arg) {
      throw new Error("Invalid argument!");
    }
    console.log(arg);
  }
}
