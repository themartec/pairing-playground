import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import LandingPage from "./LandingPage";

describe("LandingPage - Accessibility", () => {
  it("should have no accessibility violations", async () => {
    const { container } = render(<LandingPage />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
