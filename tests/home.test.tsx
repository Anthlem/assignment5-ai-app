import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../app/page";

describe("Home page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getByText("Study Notes Assistant")).toBeInTheDocument();
  });

  it("renders the ask button", () => {
    render(<Home />);
    expect(screen.getByText("Ask")).toBeInTheDocument();
  });

  it("updates the textarea when the user types a question", () => {
    render(<Home />);
    const textarea = screen.getByPlaceholderText("Type your question here...") as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "What is supervised learning?" } });

    expect(textarea.value).toBe("What is supervised learning?");
  });

  it("shows the default answer text before asking a question", () => {
    render(<Home />);
    expect(screen.getByText("Your answer will appear here.")).toBeInTheDocument();
  });
});
