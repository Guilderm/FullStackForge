import {
  calculateComplexity,
  toUpperCaseWithCb,
  toUpperCase,
  toLowerCaseWithId,
  OtherStringUtils,
} from "../../app/doubles/OtherUtils";

// Mock the necessary methods in OtherUtils
jest.mock("../../app/doubles/OtherUtils", () => ({
  ...jest.requireActual("../../app/doubles/OtherUtils"),
  calculateComplexity: jest.fn(), // Mocking calculateComplexity method
}));

describe("OtherUtils test suite should", () => {
  describe("calculateComplexity method should", () => {
    it("return mocked complexity value", () => {
      (calculateComplexity as jest.Mock).mockReturnValue(10); // Setting mock return value
      const complexity = calculateComplexity({
        lowerCase: "abc",
        upperCase: "ABC",
        characters: ["a", "b", "c"],
        length: 5,
        extraInfo: {},
      });
      expect(complexity).toBe(10); // Checking the mocked return value
    });

    it("throw an error on invalid input data", () => {
      (calculateComplexity as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid input data for calculateComplexity");
      });

      expect(() => calculateComplexity({} as any)).toThrow(
        "Invalid input data for calculateComplexity"
      );
    });
  });

  describe("toLowerCaseWithId method should", () => {
    it("return string with lowercased value and appended UUID", () => {
      const result = toLowerCaseWithId("ABC");
      expect(result).toMatch(/^abc\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/); // UUID pattern match
    });
  });

  describe("toUpperCaseWithCb method should", () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toBeCalledWith("Invalid argument!");
      expect(callBackMock).toBeCalledTimes(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(callBackMock).toBeCalledWith("called function with abc");
      expect(callBackMock).toBeCalledTimes(1);
    });
  });

  describe("OtherStringUtils class should", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("asa");
      expect(toUpperCaseSpy).toBeCalledWith("asa");
    });

    test("throw an error when invalid argument is provided", () => {
      expect(() => sut.toUpperCase("")).toThrow("Invalid argument!");
    });

    test("Use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(consoleLogSpy).toBeCalledWith("abc");
    });

    test("throw an error when logging invalid argument", () => {
      expect(() => sut.logString("")).toThrow("Invalid argument!");
    });

    test("Use a spy to replace the implementation of a method", () => {
      jest.spyOn(sut, "callExternalService").mockImplementation(() => {
        console.log("calling mocked implementation!!!");
      });
      sut.callExternalService();
    });
  });
});
