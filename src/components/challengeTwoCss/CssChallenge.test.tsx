import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, describe, it, vi } from "vitest";
import CssChallenge from "./CssChallenge";

vi.mock("antd", () => vi.importActual("antd"));

describe("CssChallenge", () => {
  it("renders", () => {
    const { getByText } = render(<CssChallenge />);

    const title = getByText("Name: John Doe");
    expect(title).toBeInTheDocument();
  });
});
