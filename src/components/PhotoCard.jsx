function HeartIcon({ filled }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-5 w-5 ${filled ? 'fill-current' : 'fill-none'}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
      />
    </svg>
  );
}

export function PhotoCard({ photo, isFavourite, onToggleFavourite, eager = false }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#E5DED4] bg-white shadow-[0_8px_24px_rgba(36,34,31,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(36,34,31,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E5DED4]">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          width={photo.width}
          height={photo.height}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? `Remove ${photo.author} photo from favourites` : `Add ${photo.author} photo to favourites`}
          className={`absolute right-3 top-3 rounded-full p-2.5 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#B86F56] focus:ring-offset-2 ${
            isFavourite
              ? 'bg-[#B86F56] text-white hover:bg-[#a55f48]'
              : 'bg-white/95 text-[#24221F] hover:bg-white hover:text-[#B86F56]'
          }`}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
      <p className="truncate px-4 py-4 text-sm font-medium text-[#24221F]" title={photo.author}>
        {photo.author}
      </p>
    </article>
  );
}
