export const loadFavourites = () => {
  try {
    return JSON.parse(localStorage.getItem("favourites")) || [];
  } catch {
    return [];
  }
};

export const saveFavourites = (items) => {
  try {
    localStorage.setItem("favourites", JSON.stringify(items));
  } catch {
    /* storage full ya blocked ho to app crash na ho */
  }
};