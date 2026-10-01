import { configureStore } from "@reduxjs/toolkit";
import favourites from "../features/favourites/favouritesSlice";
import hotels from "../features/hotels/hotelsSlice";
import blogs from "../features/blogs/blogsSlice";
import { saveFavourites } from "../utils/storage";

export const store = configureStore({ reducer: { favourites, hotels, blogs } });

store.subscribe(() => saveFavourites(store.getState().favourites.items));