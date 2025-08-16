import "@testing-library/jest-dom";
import { vi } from "vitest";
import { toHaveNoViolations } from "jest-axe";

// Mock window.matchMedia for antd components
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);
