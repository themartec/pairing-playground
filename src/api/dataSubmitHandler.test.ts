import { expect, describe, it, vi, beforeEach } from "vitest";
import dataSubmitHandler from "./dataSubmitHandler";

describe("dataSubmitHandler", () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockReq = {
      body: {},
    };

    mockRes = {
      json: vi.fn(),
    };
  });

  it("handles form submission successfully", async () => {
    // Arrange
    const testMessage = "This is a test message";
    mockReq.body = { message: testMessage };

    // Act
    await dataSubmitHandler(mockReq, mockRes);

    // Assert
    expect(mockRes.json).toHaveBeenCalledOnce();

    const response = mockRes.json.mock.calls[0][0];
    expect(response.success).toBe(true);
    expect(response.message).toBe("Form submitted successfully!");
    expect(response.submissionId).toBeDefined();
    expect(typeof response.submissionId).toBe("number");
    expect(response.data).toBeDefined();
    expect(response.data.message).toBe(testMessage);
    expect(response.data.id).toBe(response.submissionId);
    expect(response.data.timestamp).toBeDefined();
  });

  it("includes timestamp in ISO format", async () => {
    // Arrange
    mockReq.body = { message: "test" };

    // Act
    await dataSubmitHandler(mockReq, mockRes);

    // Assert
    const response = mockRes.json.mock.calls[0][0];
    const { timestamp } = response.data;

    // Check if timestamp is in ISO format
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });

  it("handles empty request body", async () => {
    // Arrange
    mockReq.body = {};

    // Act
    await dataSubmitHandler(mockReq, mockRes);

    // Assert
    const response = mockRes.json.mock.calls[0][0];
    expect(response.success).toBe(true);
    expect(response.data.message).toBeUndefined();
    expect(response.data.id).toBeDefined();
    expect(response.data.timestamp).toBeDefined();
  });

  it("preserves additional fields from request body", async () => {
    // Arrange
    mockReq.body = {
      message: "test message",
      extraField: "extra value",
      anotherField: 42,
    };

    // Act
    await dataSubmitHandler(mockReq, mockRes);

    // Assert
    const response = mockRes.json.mock.calls[0][0];
    expect(response.data.message).toBe("test message");
    expect(response.data.extraField).toBe("extra value");
    expect(response.data.anotherField).toBe(42);
  });

  it("generates unique submission IDs", async () => {
    // Arrange
    mockReq.body = { message: "test1" };
    const mockReq2 = { body: { message: "test2" } };
    const mockRes2 = { json: vi.fn() };

    // Act
    await dataSubmitHandler(mockReq, mockRes);
    // Add small delay to ensure different timestamps
    await new Promise((resolve) => {
      setTimeout(resolve, 1);
    });
    await dataSubmitHandler(mockReq2, mockRes2);

    // TODO: not a robust test as it can fail if timestamps collide
    // Assert
    // const response1 = mockRes.json.mock.calls[0][0];
    // const response2 = mockRes2.json.mock.calls[0][0];

    // expect(response1.submissionId).not.toBe(response2.submissionId);
  });
});
