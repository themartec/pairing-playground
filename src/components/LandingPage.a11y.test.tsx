import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import LandingPage from "./LandingPage";

describe("LandingPage - Accessibility", () => {
  if (import.meta.env.VITE_CHALLENGE_ONE) {
    it("should have no a11y violations for progress bar", async () => {
      const { getByTestId } = render(<LandingPage />);
      const results = await axe(getByTestId("progress-bar"));
      expect(results).toHaveNoViolations();
    });

    it("should have no a11y violations for autocomplete", async () => {
      const { getByTestId } = render(<LandingPage />);
      const results = await axe(getByTestId("auto-complete"));
      expect(results).toHaveNoViolations();
    });

    it("should have no a11y violations for image", async () => {
      const { getByTestId } = render(<LandingPage />);
      const results = await axe(getByTestId("image"));
      expect(results).toHaveNoViolations();
    });

    it("should have no a11y violations for unordered list", async () => {
      const { getByTestId } = render(<LandingPage />);
      const results = await axe(getByTestId("unordered-list"));
      expect(results).toHaveNoViolations();
    });
  }

  it("should have no accessibility violations", async () => {
    const { container } = render(<LandingPage />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
