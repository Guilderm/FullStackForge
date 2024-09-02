import { getStringInfo, StringUtils, toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
  describe("StringUtils tests should", () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
    });

    it("convert string to uppercase", () => {
      const output = sut.toUpperCase("abc");
      expect(output).toBe("ABC");
    });

    it("throw an error on invalid argument (function)", () => {
      function expectError() {
        sut.toUpperCase("");
      }
      expect(expectError).toThrow("Invalid argument!");
    });

    it("throw an error on invalid argument (arrow function)", () => {
      expect(() => {
        sut.toUpperCase("");
      }).toThrow("Invalid argument!");
    });

    it("throw an error on invalid argument (try-catch block)", (done) => {
      try {
        sut.toUpperCase("");
        done("toUpperCase should throw an error for invalid argument!");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid argument!");
        done();
      }
    });
  });

  it("convert a valid string to uppercase", () => {
    const sut = toUpperCase;
    const expected = "ABC";

    const output = sut("abc");

    expect(output).toBe(expected);
  });

  describe("ToUpperCase examples should", () => {
    it.each([
      { input: "abc", expected: "ABC" },
      { input: "My-String", expected: "MY-STRING" },
      { input: "def", expected: "DEF" },
    ])("convert '$input' to '$expected'", ({ input, expected }) => {
      const output = toUpperCase(input);
      expect(output).toBe(expected);
    });
  });

  describe("getStringInfo for 'My-String' should", () => {
    test("return the correct length", () => {
      const output = getStringInfo("My-String");
      expect(output.characters).toHaveLength(9);
    });
    test("return the lowercase version", () => {
      const output = getStringInfo("My-String");
      expect(output.lowerCase).toBe("my-string");
    });
    test("return the uppercase version", () => {
      const output = getStringInfo("My-String");
      expect(output.upperCase).toBe("MY-STRING");
    });
    test("return the individual characters", () => {
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
        expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"]),
      );
    });
    test("return defined extra info", () => {
      const output = getStringInfo("My-String");
      expect(output.extraInfo).toBeDefined();
    });

    test("return the correct extra info", () => {
      const output = getStringInfo("My-String");
      expect(output.extraInfo).toEqual({});
    });
  });
});
