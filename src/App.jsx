import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { PhotoGrid } from './components/PhotoGrid';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import {
  favouritesReducer,
  FAVOURITES_STORAGE_KEY,
  getInitialFavouriteIds,
} from './reducers/favouritesReducer';

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-[#77716A]" role="status">
      <span className="mb-5 h-9 w-9 animate-spin rounded-full border-2 border-[#E5DED4] border-t-[#B86F56] motion-reduce:animate-none" />
      <p className="text-sm tracking-wide">Gathering photographs...</p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="border border-[#E5DED4] bg-white p-8 text-center text-[#77716A]" role="alert">
      <p className="font-serif text-xl text-[#24221F]">The photographs could not be gathered.</p>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path strokeLinecap="round" d="m16 16 4.5 4.5" />
    </svg>
  );
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchQuery, setSearchQuery] = useState('');
  const [favouriteIds, dispatch] = useReducer(favouritesReducer, undefined, getInitialFavouriteIds);

  useEffect(() => {
    localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return photos;
    }

    return photos.filter((photo) => photo.author.toLowerCase().includes(normalizedQuery));
  }, [photos, searchQuery]);

  const handleToggleFavourite = (photoId) => {
    dispatch({ type: 'toggle', photoId });
  };

  return (
    <main className="min-h-screen bg-[#F7F4EE] px-5 py-5 text-[#24221F] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <nav className="flex items-center justify-between border-b border-[#E5DED4] pb-5">
          <span className="text-sm font-semibold uppercase tracking-[0.24em]">The Still Journal</span>
          <span className="text-xs uppercase tracking-[0.18em] text-[#77716A]">Vol. 01 / 2026</span>
        </nav>

        <header className="grid gap-6 py-10 sm:py-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-10">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#B86F56]">An image archive</p>
            <h1 className="max-w-3xl font-serif text-[clamp(3rem,7vw,6.25rem)] leading-[0.94] tracking-tight">
              A Collection
              <br className="hidden sm:block" /> of Moments
            </h1>
          </div>
          <p className="max-w-sm text-base leading-7 text-[#77716A] lg:justify-self-end">
            Photographs from different creators, gathered in one quiet place. Look closely, find a name, and keep the images that stay with you.
          </p>
        </header>

        <section
          className="mb-8 flex flex-col justify-between gap-4 border-y border-[#E5DED4] py-4 sm:flex-row sm:items-center"
          aria-label="Gallery controls"
        >
          <label className="relative block w-full max-w-md">
            <span className="sr-only">Search by author</span>
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#77716A]">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by author..."
              className="h-12 w-full rounded-sm border border-[#E5DED4] bg-white pl-12 pr-4 text-sm text-[#24221F] outline-none transition placeholder:text-[#77716A] focus:border-[#B86F56] focus:ring-2 focus:ring-[#B86F56]/20"
            />
          </label>
          <p className="text-xs uppercase tracking-[0.16em] text-[#77716A] sm:text-right">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photograph' : 'photographs'} shown
          </p>
        </section>

        <section aria-label="Photo collection">
          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && !error && photos.length === 0 && (
            <p className="border border-[#E5DED4] bg-white p-8 text-center text-[#77716A]">
              No photographs are available right now.
            </p>
          )}
          {!loading && !error && photos.length > 0 && filteredPhotos.length === 0 && (
            <p className="border border-[#E5DED4] bg-white p-8 text-center text-[#77716A]">
              No photographs match &quot;{searchQuery}&quot;.
            </p>
          )}
          {!loading && !error && filteredPhotos.length > 0 && (
            <PhotoGrid
              photos={filteredPhotos}
              favouriteIds={favouriteIds}
              onToggleFavourite={handleToggleFavourite}
            />
          )}
        </section>

        <footer className="mt-14 border-t border-[#E5DED4] pt-5 text-xs uppercase tracking-[0.16em] text-[#77716A]">
          <p>Collected with care · The Still Journal</p>
        </footer>
      </div>
    </main>
  );
}
