import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "../components/Accordion";

const items = [
  { q: "First question?", a: "First answer" },
  { q: "Second question?", a: "Second answer" },
];

describe("Accordion", () => {
  it("opens the first item by default", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("First answer")).toBeInTheDocument();
    expect(screen.queryByText("Second answer")).not.toBeInTheDocument();
  });

  it("switches to the clicked item and closes the previous one", async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /second question/i }));
    expect(screen.getByText("Second answer")).toBeInTheDocument();
    expect(screen.queryByText("First answer")).not.toBeInTheDocument();
  });

  it("closes an open item when it is clicked again", async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /first question/i }));
    expect(screen.queryByText("First answer")).not.toBeInTheDocument();
  });
});