# Guidelines and Best Practices for Creating Tests

## 1. Clear and Consistent Naming

- **Test Suite Names**: Use descriptive names for test suites that clearly convey what is being tested, ending with "should" to reflect the expectations (e.g., `"UserService should"`).
- **Test Case Names**: Begin test names with an action word (e.g., "should validate," "should throw") and describe the behavior being tested (e.g., `"should validate a password with 8 or more characters"`).

## 2. Group Related Tests

- **Organize by Method or Feature**: Group related tests under `describe` blocks to keep your test suite organized and to make it easy to see what functionality is being tested.
- **Use Nested `describe` Blocks**: For complex modules, use nested `describe` blocks to break down tests by method or sub-feature.

## 3. Arrange-Act-Assert (AAA) Pattern

- **Arrange**: Set up the necessary objects and variables.
- **Act**: Perform the action or invoke the function you are testing.
- **Assert**: Verify that the action produced the expected result.
- **Example**:

  ```typescript
  it("should validate a password with 8 or more characters", () => {
    // Arrange
    const sut = new PasswordChecker();

    // Act
    const actual = sut.checkPassword("12345678");

    // Assert
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });
  ```

## 4. Isolate Tests

- **Test One Thing at a Time**: Each test should focus on a single behavior or requirement. This makes it easier to pinpoint failures and ensures tests are clear and concise.
- **Use `beforeEach` for Setup**: Use `beforeEach` to set up common objects or states before each test, ensuring each test starts from a known state.

## 5. Avoid Magic Numbers and Strings

- **Use Constants or Variables**: Avoid hardcoding values directly in assertions. Instead, use constants or variables with meaningful names.
- **Example**:

  ```typescript
  const validPassword = "1234abcD";
  expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  ```

## 6. Comprehensive Test Coverage

- **Test All Edge Cases**: Ensure you are testing not only typical use cases but also edge cases, such as empty inputs, null values, and boundary conditions.
- **Avoid Overlapping Tests**: Make sure each test case covers a unique scenario to avoid redundancy.

## 7. Use Test Data Generators and `it.each` for Parameterized Tests

- **Reduce Redundancy**: For tests that need to check similar behavior with different inputs, use `it.each` or data generators to streamline the process.
- **Example**:

  ```typescript
  it.each([
    { input: "abc", expected: "ABC" },
    { input: "My-String", expected: "MY-STRING" },
  ])("should convert '$input' to '$expected'", ({ input, expected }) => {
    const output = toUpperCase(input);
    expect(output).toBe(expected);
  });
  ```

## 8. Mock External Dependencies

- **Isolate Unit Tests**: Mock external dependencies like APIs, databases, or other services to ensure your unit tests are fast and reliable.
- **Use Tools**: Use mocking libraries like Jest’s built-in mocks or other tools (e.g., Sinon) to create mock implementations.

## 9. Avoid Flaky Tests

- **Deterministic Tests**: Ensure your tests are deterministic and do not rely on factors like time, randomness, or external services that could cause inconsistent results.
- **Set Up and Tear Down**: Properly set up and tear down any state that could affect other tests to prevent interference between tests.

## 10. Maintain Readability and Simplicity

- **Keep Tests Short**: Each test should be short and focused on a single aspect of the code.
- **Descriptive Assertions**: Use clear and descriptive assertions that make it obvious what the expected outcome is.

## 11. Regularly Review and Refactor Tests

- **Refactor When Needed**: Just as with production code, refactor your tests to improve readability and maintainability.
- **Remove Obsolete Tests**: As your code evolves, ensure that tests are still relevant and remove any that no longer apply.

## 12. Measure Code Coverage, But Don’t Worship It

- **Use Coverage as a Guide**: Aim for high code coverage, but ensure that the focus is on meaningful tests rather than simply achieving 100% coverage.
- **Don’t Exclude Lines Unnecessarily**: Avoid excluding lines from coverage unless absolutely necessary, and document the reasons when you do.

## 13. Document Test Cases

- **Add Comments When Necessary**: While tests should generally be self-explanatory, add comments to explain complex logic or unusual cases.
- **Maintain Test Documentation**: Keep any associated test documentation up to date, especially if it explains the testing strategy or non-obvious scenarios.

## 15. Use `actual` and `expected`

### Example

```typescript
test("should return the lowercase string with appended UUID", () => {
  const actual = "HelloWorld";
  const expected = toLowerCaseWithId(actual);

  expect(expected.startsWith("helloworld")).toBe(true);

  const uuidPart = expected.slice("helloworld".length);
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  expect(uuidPart).toMatch(uuidRegex);
});
```
