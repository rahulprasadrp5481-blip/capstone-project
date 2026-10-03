import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
  it("shows one button per page", () => {
    render(<Pagination total={25} perPage={10} page={1} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "4" })).not.toBeInTheDocument();
  });

  it("calls onChange with the clicked page", async () => {
    const onChange = vi.fn();
    render(<Pagination total={25} perPage={10} page={1} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "2" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("disables Prev on first page and Next on last page", () => {
    const { rerender } = render(
      <Pagination total={25} perPage={10} page={1} onChange={() => {}} />
    );
    expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();

    rerender(<Pagination total={25} perPage={10} page={3} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("renders nothing when there is only one page", () => {
    const { container } = render(
      <Pagination total={5} perPage={10} page={1} onChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});