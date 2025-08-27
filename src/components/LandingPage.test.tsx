import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, describe, it, vi } from "vitest";
import React from "react";
import LandingPage from "./LandingPage";

vi.mock("antd", () => vi.importActual("antd"));

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

  describe("Conditional challenge rendering", () => {
    it("renders A11yChallenge if challengeOneEnabled is true", () => {
      const { queryByTestId } = render(<LandingPage challengeOneEnabled />);
      expect(queryByTestId("a11y-challenge")).toBeInTheDocument();
      expect(queryByTestId("css-challenge")).not.toBeInTheDocument();
    });

    it("renders CssChallenge if challengeTwoEnabled is true", () => {
      const { queryByTestId } = render(<LandingPage challengeTwoEnabled />);
      expect(queryByTestId("a11y-challenge")).not.toBeInTheDocument();
      expect(queryByTestId("css-challenge")).toBeInTheDocument();
    });
  });

  describe("Form submission", () => {
    beforeEach(() => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: "Fake response" }),
      });
    });

    it("calls onFinish and renders output on form submission", async () => {
      const { container } = render(<LandingPage />);
      const form = container.querySelector("form");

      if (form) {
        const messageInput = screen.getByLabelText(
          "message",
        ) as HTMLTextAreaElement;
        const submitButton = screen.getByRole("button", { name: "Submit" });

        messageInput.value = "Test message";
        await React.act(() => submitButton.click());

        expect(await screen.findByTestId("submit-response")).toHaveTextContent(
          "Fake response",
        );
      } else {
        throw new Error("Form not found");
      }
    });
  });
});
