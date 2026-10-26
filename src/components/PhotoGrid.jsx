import { PhotoCard } from './PhotoCard';

export function PhotoGrid({ photos, favouriteIds, onToggleFavourite }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          eager={index < 4}
          isFavourite={favouriteIds.includes(photo.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}
