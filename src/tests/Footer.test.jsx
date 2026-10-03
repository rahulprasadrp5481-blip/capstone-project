import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "../components/Footer";
import { renderWithProviders } from "./test-utils";

describe("Footer newsletter", () => {
  it("asks for an email when the field is empty", async () => {
    renderWithProviders(<Footer />);
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
  });

  it("rejects an invalid email", async () => {
    renderWithProviders(<Footer />);
    await userEvent.type(screen.getByLabelText("Email for newsletter"), "abc");
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("accepts a valid email and clears the field", async () => {
    renderWithProviders(<Footer />);
    const input = screen.getByLabelText("Email for newsletter");
    await userEvent.type(input, "rahul@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(screen.getByText("Thanks for subscribing!")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });
});

describe("Footer privacy modal", () => {
  it("opens and closes with the Escape key", async () => {
    renderWithProviders(<Footer />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Privacy Policy" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});