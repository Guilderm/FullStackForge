import {
  PasswordChecker,
  PasswordErrors,
} from "../../app/PasswordChecker/PasswordChecker";

describe("PasswordChecker Test Suite", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  describe("checkPassword method", () => {
    it("should invalidate a password with less than 8 characters", () => {
      const actual = sut.checkPassword("1234567");
      expect(actual.valid).toBe(false);
      expect(actual.reasons).toContain(PasswordErrors.TOO_SHORT);
    });

    it("should validate a password with 8 or more characters", () => {
      const actual = sut.checkPassword("12345678");
      expect(actual.reasons).not.toContain(PasswordErrors.TOO_SHORT);
    });

    it("should invalidate a password with no uppercase letters", () => {
      const actual = sut.checkPassword("abcd");
      expect(actual.valid).toBe(false);
      expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
    });

    it("should validate a password with at least one uppercase letter", () => {
      const actual = sut.checkPassword("abcD");
      expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
    });

    it("should invalidate a password with no lowercase letters", () => {
      const actual = sut.checkPassword("ABCD");
      expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
    });

    it("should validate a password with at least one lowercase letter", () => {
      const actual = sut.checkPassword("ABCDa");
      expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
    });

    it("should validate a complex password with uppercase, lowercase, and numbers", () => {
      const actual = sut.checkPassword("1234abcD");
      expect(actual.reasons).toHaveLength(0);
      expect(actual.valid).toBe(true);
    });
  });

  describe("checkAdminPassword method", () => {
    it("should invalidate an admin password with no numbers", () => {
      const actual = sut.checkAdminPassword("abcdABCD");
      expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
      expect(actual.valid).toBe(false);
    });

    it("should validate an admin password with at least one number", () => {
      const actual = sut.checkAdminPassword("abcdABCD7");
      expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
    });
  });
});
