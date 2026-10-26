export const FAVOURITES_STORAGE_KEY = 'celebrare-photo-gallery-favourites';

function getInitialFavouriteIds() {
  try {
    const storedFavourites = localStorage.getItem(FAVOURITES_STORAGE_KEY);

    if (!storedFavourites) {
      return [];
    }

    const parsedFavourites = JSON.parse(storedFavourites);

    if (!Array.isArray(parsedFavourites)) {
      return [];
    }

    return [...new Set(parsedFavourites.filter((id) => typeof id === 'string'))];
  } catch {
    return [];
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'toggle': {
      const isFavourite = state.includes(action.photoId);

      return isFavourite
        ? state.filter((id) => id !== action.photoId)
        : [...state, action.photoId];
    }
    default:
      return state;
  }
}

export { getInitialFavouriteIds };
