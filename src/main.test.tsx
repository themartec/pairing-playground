import { vi } from "vitest";

beforeAll(() => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
});

afterAll(() => {
  const root = document.getElementById("root");
  if (root) root.remove();
});

// Mock ReactDOM.createRoot and its render method
vi.mock("react-dom/client", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    // vi.mock("react-dom/client", () => {
    //   return {
    createRoot: () => ({
      render: vi.fn(),
    }),
  };
});

it("renders the app without crashing", async () => {
  // Import main.tsx, which should call createRoot and render
  await import("./main");
});
