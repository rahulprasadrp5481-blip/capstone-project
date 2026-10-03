import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HotelCard from "../components/HotelCard";
import { renderWithProviders } from "./test-utils";

const hotel = {
  id: "lpb2782",
  name: "The Taj Mahal Palace",
  city: "Mumbai",
  main_photo: "https://example.com/photo.jpg",
  rating: 9.2,
  reviewCount: 3714,
  stars: 5,
  hotelDescription: "<p><strong>Luxury</strong> stay by the sea</p>",
};

describe("HotelCard", () => {
  it("shows name, city, reviews and cleaned description", () => {
    renderWithProviders(<HotelCard hotel={hotel} price={21559.71} />);
    expect(screen.getByText("The Taj Mahal Palace")).toBeInTheDocument();
    expect(screen.getByText("Mumbai")).toBeInTheDocument();
    expect(screen.getByText(/3,714 reviews/)).toBeInTheDocument();
    expect(screen.getByText("Luxury stay by the sea")).toBeInTheDocument();
  });

  it("shows the price when available", () => {
    renderWithProviders(<HotelCard hotel={hotel} price={21559.71} />);
    expect(screen.getByText(/21,560/)).toBeInTheDocument();
  });

  it("shows a fallback when price is unavailable", () => {
    renderWithProviders(<HotelCard hotel={hotel} price={null} />);
    expect(screen.getByText("Price unavailable")).toBeInTheDocument();
  });

  it("shows a loading text while price is being fetched", () => {
    renderWithProviders(<HotelCard hotel={hotel} price={undefined} />);
    expect(screen.getByText("Loading price...")).toBeInTheDocument();
  });

  it("adds and removes the hotel from favourites with the heart button", async () => {
    const { store } = renderWithProviders(<HotelCard hotel={hotel} price={21559.71} />);

    await userEvent.click(screen.getByRole("button", { name: /add to favourites/i }));
    expect(store.getState().favourites.items).toHaveLength(1);

    await userEvent.click(screen.getByRole("button", { name: /remove from favourites/i }));
    expect(store.getState().favourites.items).toHaveLength(0);
  });
});