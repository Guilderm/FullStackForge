// Define MockService class with all methods as mocks
class MockService {
  private callCount: number = 0;

  getData(): { id: number; name: string } {
    this.callCount++;
    return { id: 1, name: "Test Data" };
  }

  throwError(): void {
    throw new Error("Mock error!");
  }

  getCallCount(): number {
    return this.callCount;
  }

  reset(): void {
    this.callCount = 0;
  }
}

// Define MockModule class that uses the MockService
class MockModule {
  constructor(private mockService: MockService | null) {}

  useService(): void {
    if (!this.mockService) {
      throw new Error("Service is not available");
    }
    this.mockService.getData();
  }
}

describe("MockModules test suite should", () => {
  let mockService: jest.Mocked<MockService>;

  beforeEach(() => {
    // Create a mock instance of MockService
    mockService = {
      getData: jest.fn().mockReturnValue({ id: 1, name: "Test Data" }),
      throwError: jest.fn(() => {
        throw new Error("Mock error!");
      }),
      getCallCount: jest.fn().mockReturnValue(2),
      reset: jest.fn(),
    } as unknown as jest.Mocked<MockService>;
  });

  describe("MockService functionality should", () => {
    it("return mock data correctly", () => {
      const result = mockService.getData();
      expect(result).toEqual({ id: 1, name: "Test Data" });
    });

    it("throw an error when the method is called incorrectly", () => {
      expect(() => {
        mockService.throwError();
      }).toThrow("Mock error!");
    });

    it("track the number of times a method is called", () => {
      expect(mockService.getCallCount()).toBe(2);
    });

    it("reset call count correctly", () => {
      mockService.reset();
      expect(mockService.reset).toHaveBeenCalled();
    });
  });

  describe("MockModule functionality should", () => {
    it("create an instance of MockModule correctly", () => {
      const mockModule = new MockModule(mockService);
      expect(mockModule).toBeInstanceOf(MockModule);
    });

    it("invoke MockService correctly within MockModule", () => {
      const mockModule = new MockModule(mockService);
      mockModule.useService();
      expect(mockService.getData).toHaveBeenCalled();
    });

    it("handle null service gracefully", () => {
      const mockModule = new MockModule(null);
      expect(() => {
        mockModule.useService();
      }).toThrow("Service is not available");
    });
  });
});
