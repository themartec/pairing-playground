import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, describe, it, vi } from "vitest";
import LandingPage from "./LandingPage";

vi.mock("antd", () => ({
  // Mock only the components you use, or add more as needed
  Layout: (props: any) => props.children,
  StyledContent: (props: any) => props.children,
  // Add more as needed
}));

describe("LandingPage", () => {
  it("renders the main title", () => {
    render(<LandingPage />);

    const title = screen.getByText("Pairing Playground");
    expect(title).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<LandingPage />);

    const subtitle = screen.getByText("This is where the magic happens");
    expect(subtitle).toBeInTheDocument();
  });
});
