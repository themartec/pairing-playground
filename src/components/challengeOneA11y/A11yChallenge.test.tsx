import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, describe, it, vi } from "vitest";
import A11yChallenge from "./A11yChallenge";

vi.mock("antd", () => vi.importActual("antd"));

describe("A11yChallenge", () => {
  it("renders", () => {
    const { getByText } = render(<A11yChallenge />);

    const title = getByText("Employee Branding AI Platform Demo");
    expect(title).toBeInTheDocument();
  });

  it("calls window.open when image is clicked", () => {
    vi.spyOn(window, "getComputedStyle").mockImplementation(() => ({}) as any);
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const { getByTestId } = render(<A11yChallenge />);
    const image = getByTestId("image");
    React.act(() => {
      image.click();
    });
    expect(openSpy).toHaveBeenCalled();
    openSpy.mockRestore();
  });
});
