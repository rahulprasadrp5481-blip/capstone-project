import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import favourites from "../features/favourites/favouritesSlice";

export function renderWithProviders(ui, { preloadedState, route = "/" } = {}) {
  const store = configureStore({ reducer: { favourites }, preloadedState });
  const utils = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
  return { store, ...utils };
}