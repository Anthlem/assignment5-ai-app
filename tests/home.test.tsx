import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getByText("Study Notes AI Assistant")).toBeInTheDocument();
  });

  it("renders the ask button", () => {
    render(<Home />);
    expect(screen.getByText("Ask")).toBeInTheDocument();
  });
});