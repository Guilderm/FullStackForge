import {
  calculateComplexity,
  OtherStringUtils,
  toUpperCaseWithCb,
  toLowerCaseWithId,
  toUpperCase,
} from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite", () => {
  describe("OtherStringUtils tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("asa");
      expect(toUpperCaseSpy).toBeCalledWith("asa");
    });

    test("Use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(consoleLogSpy).toBeCalledWith("abc");
    });

    test("Use a spy to replace the implementation of a method", () => {
      jest.spyOn(sut, "callExternalService").mockImplementation(() => {
        console.log("Mocked call to external service");
      });
      sut.callExternalService();
      expect(console.log).toBeCalledWith("Mocked call to external service");
    });
  });

  describe("toLowerCaseWithId function", () => {
    test("should return the lowercase string with appended UUID", () => {
      const arg = "HelloWorld";
      const result = toLowerCaseWithId(arg);
      expect(result).toMatch(
        /^helloworld-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      );
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

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid argument!");
      expect(timesCalled).toBe(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(cbArgs).toContain("called function with abc");
      expect(timesCalled).toBe(1);
    });
  });

  it("ToUpperCase - calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCb("", () => {});
    expect(actual).toBeUndefined();
  });

  it("ToUpperCase - calls callback for valid argument", () => {
    const actual = toUpperCaseWithCb("abc", () => {});
    expect(actual).toBe("ABC");
  });

  it("Calculates complexity correctly", () => {
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

  it("Handles missing extraInfo gracefully in calculateComplexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {},
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(0);
  });

  it("Converts string to uppercase using toUpperCase function", () => {
    const result = toUpperCase("testString");
    expect(result).toBe("TESTSTRING");
  });

  it("Handles empty string input in toUpperCase", () => {
    const result = toUpperCase("");
    expect(result).toBe("");
  });
});
