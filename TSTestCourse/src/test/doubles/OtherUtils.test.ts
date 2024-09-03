import {
  calculateComplexity,
  OtherStringUtils,
  toUpperCaseWithCb,
  toLowerCaseWithId,
  toUpperCase,
} from "../../app/doubles/OtherUtils";
import * as uuid from "uuid";

jest.mock("uuid");

describe("OtherUtils test suite", () => {
  describe("OtherStringUtils tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("should track calls to toUpperCase", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("asa");
      expect(toUpperCaseSpy).toBeCalledWith("asa");
    });

    test("should track calls to logString method", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(consoleLogSpy).toBeCalledWith("abc");
    });

    test("should replace the implementation of callExternalService method", () => {
      jest.spyOn(sut, "callExternalService").mockImplementation(() => {
        console.log("Mocked call to external service");
      });
      sut.callExternalService();
      expect(console.log).toBeCalledWith("Mocked call to external service");
    });

    test("should log string using logString method", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("test string");
      expect(consoleLogSpy).toHaveBeenCalledWith("test string");
    });

    test("should call external service", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.callExternalService();
      expect(consoleLogSpy).toHaveBeenCalledWith("Calling external service!!!");
    });
  });

  describe("toLowerCaseWithId function", () => {
    test("should return the lowercase string with appended UUID", () => {
      const mockUuid = "1234-5678-9101";
      (uuid.v4 as jest.Mock).mockReturnValue(mockUuid);

      const input = "HelloWorld";
      const actual = toLowerCaseWithId(input);

      expect(actual).toBe(`helloworld${mockUuid}`);
    });

    test("should handle empty string input and still append UUID", () => {
      const mockUuid = "1234-5678-9101";
      (uuid.v4 as jest.Mock).mockReturnValue(mockUuid);

      const actual = toLowerCaseWithId("");

      expect(actual).toBe(mockUuid);
    });
  });

  describe("Tracking callbacks", () => {
    let cbArgs: string[] = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it("should call callback for invalid argument and track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid argument!");
      expect(timesCalled).toBe(1);
    });

    it("should call callback for valid argument and track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(cbArgs).toContain("called function with abc");
      expect(timesCalled).toBe(1);
    });

    it("should not call callback if no callback is provided", () => {
      const actual = toUpperCaseWithCb("abc");
      expect(actual).toBe("ABC");
    });
  });

  it("should return undefined for invalid argument in toUpperCaseWithCb", () => {
    const actual = toUpperCaseWithCb("", () => {});
    expect(actual).toBeUndefined();
  });

  it("should return uppercased string for valid argument in toUpperCaseWithCb", () => {
    const actual = toUpperCaseWithCb("abc", () => {});
    expect(actual).toBe("ABC");
  });

  describe("calculateComplexity function", () => {
    it("should calculate complexity correctly", () => {
      const someInfo = {
        length: 5,
        extraInfo: {
          field1: "someInfo",
          field2: "someOtherInfo",
        },
      };

      const actual = calculateComplexity(someInfo as any);
      expect(actual).toBe(10);
    });

    it("should handle missing extraInfo gracefully", () => {
      const someInfo = {
        length: 5,
        extraInfo: {},
      };

      const actual = calculateComplexity(someInfo as any);
      expect(actual).toBe(0);
    });

    it("should handle extraInfo with many fields", () => {
      const someInfo = {
        length: 3,
        extraInfo: {
          field1: "info1",
          field2: "info2",
          field3: "info3",
          field4: "info4",
          field5: "info5",
        },
      };

      const actual = calculateComplexity(someInfo as any);
      expect(actual).toBe(15);
    });

    it("should handle zero length gracefully", () => {
      const someInfo = {
        length: 0,
        extraInfo: {
          field1: "info1",
        },
      };

      const actual = calculateComplexity(someInfo as any);
      expect(actual).toBe(0);
    });
  });

  describe("toUpperCase function", () => {
    it("should convert string to uppercase", () => {
      const input = "testString";
      const actual = toUpperCase(input);
      expect(actual).toBe("TESTSTRING");
    });

    it("should handle empty string input", () => {
      const input = "";
      const actual = toUpperCase(input);
      expect(actual).toBe("");
    });
  });
});
