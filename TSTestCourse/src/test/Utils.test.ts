import { getStringInfo, StringUtils, toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
  describe("StringUtils tests", () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
    });

    it("Should return correct upperCase", () => {
      const output = sut.toUpperCase("abc");
      expect(output).toBe("ABC");
    });

    it("Should throw error on invalid argument - function", () => {
      function expectError() {
        const output = sut.toUpperCase("");
      }
      expect(expectError).toThrow("Invalid argument!");
    });

    it("Should throw error on invalid argument - arrow function", () => {
      expect(() => {
        sut.toUpperCase("");
      }).toThrow("Invalid argument!");
    });

    it("Should throw error on invalid argument - try catch block", (done) => {
      try {
        sut.toUpperCase("");
        done("GetStringInfo should throw error for invalid arg!");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid argument!");
        done();
      }
    });
  });

  it("should return uppercase of valid string", () => {
    const sut = toUpperCase;
    const expected = "ABC";

    const output = sut("abc");

    expect(output).toBe(expected);
  });

  describe("ToUpperCase examples", () => {
    it.each([
      { input: "abc", expected: "ABC" },
      { input: "My-String", expected: "MY-STRING" },
      { input: "def", expected: "DEF" },
    ])("$input toUpperCase should be $expected", ({ input, expected }) => {
      const output = toUpperCase(input);
      expect(output).toBe(expected);
    });
  });

  describe("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      const output = getStringInfo("My-String");
      expect(output.characters).toHaveLength(9);
    });
    test("return right lower case", () => {
      const output = getStringInfo("My-String");
      expect(output.lowerCase).toBe("my-string");
    });
    test("return right upper case", () => {
      const output = getStringInfo("My-String");
      expect(output.upperCase).toBe("MY-STRING");
    });
    test("return right characters", () => {
      const output = getStringInfo("My-String");
      expect(output.characters).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "r",
        "i",
        "n",
        "g",
      ]);
      expect(output.characters).toContain<string>("M");
      expect(output.characters).toEqual(
        expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"])
      );
    });
    test("return defined extra info", () => {
      const output = getStringInfo("My-String");
      expect(output.extraInfo).toBeDefined();
    });

    test("return right extra info", () => {
      const output = getStringInfo("My-String");
      expect(output.extraInfo).toEqual({});
    });
  });
});
