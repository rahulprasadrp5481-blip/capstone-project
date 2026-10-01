import { createSlice } from "@reduxjs/toolkit";
import { loadFavourites } from "../../utils/storage";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: { items: loadFavourites() },
  reducers: {
    addFavourite: (state, { payload }) => {
      if (!state.items.some((h) => h.id === payload.id)) state.items.push(payload);
    },
    removeFavourite: (state, { payload: id }) => {
      state.items = state.items.filter((h) => h.id !== id);
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;