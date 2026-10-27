# Photo Gallery

A responsive photo gallery built with React, Vite, and Tailwind CSS. It fetches photos from the Picsum Photos API, supports real-time author search, and allows users to save their favourite photos.

## Features

- Fetches 30 photos from the Picsum Photos API.
- Responsive grid layout for mobile, tablet, and desktop.
- Real-time, case-insensitive search by author name.
- Add or remove favourite photos using heart buttons.
- Saves favourites in `localStorage` across page refreshes.
- Custom `useFetchPhotos` hook for fetching photos.
- Uses `useReducer` to manage favourites.
- Uses `useCallback` and `useMemo` for search handling and filtering.
- Loading and error states.
- Accessible buttons and descriptive image alt text.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- JavaScript (ES6+)
- Picsum Photos API
- localStorage

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Adityagaur7078/mini-project-photo-gallery.git
cd mini-project-photo-gallery
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite, usually `http://localhost:5173`.

## Production Build

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── PhotoCard.jsx
│   └── PhotoGrid.jsx
├── hooks/
│   └── useFetchPhotos.js
├── reducers/
│   └── favouritesReducer.js
├── App.jsx
├── index.css
└── main.jsx
```

## API

This project uses the [Picsum Photos API](https://picsum.photos/):

`https://picsum.photos/v2/list?limit=30`

## Repository

[View Photo Gallery on GitHub](https://github.com/Adityagaur7078/mini-project-photo-gallery)

## License

This project is open source and available for learning and personal use.
