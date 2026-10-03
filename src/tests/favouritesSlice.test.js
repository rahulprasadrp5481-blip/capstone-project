import reducer, { addFavourite, removeFavourite } from "../features/favourites/favouritesSlice";

const hotel = { id: "h1", name: "Taj Palace" };

describe("favouritesSlice", () => {
  it("adds a hotel", () => {
    const state = reducer({ items: [] }, addFavourite(hotel));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe("Taj Palace");
  });

  it("does not add the same hotel twice", () => {
    let state = reducer({ items: [] }, addFavourite(hotel));
    state = reducer(state, addFavourite(hotel));
    expect(state.items).toHaveLength(1);
  });

  it("removes the correct hotel", () => {
    const start = { items: [hotel, { id: "h2", name: "Other" }] };
    const state = reducer(start, removeFavourite("h1"));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("h2");
  });

  it("ignores removing a hotel that is not saved", () => {
    const state = reducer({ items: [hotel] }, removeFavourite("nope"));
    expect(state.items).toHaveLength(1);
  });
});