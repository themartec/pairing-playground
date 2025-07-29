import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, describe, it } from "vitest";
import LandingPage from "./LandingPage";

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
