# Photo Gallery

A responsive React photo gallery built for the Celebrare Frontend React Internship assignment. It fetches 30 photos from the Picsum Photos API, supports real-time author search, and persists favourite photo IDs in `localStorage`.

## Features

- Fetches 30 photos from `https://picsum.photos/v2/list?limit=30`.
- Displays one column on mobile, two columns at the `sm` breakpoint, and four columns at the `lg` breakpoint.
- Shows loading, HTTP/network error, empty response, and no-search-match states.
- Filters the already-fetched photos by author with case-insensitive search.
- Uses `useReducer` to add/remove favourite IDs without mutating state.
- Restores favourites from `localStorage` after a refresh.
- Uses `useCallback` for the search handler and `useMemo` for the filtered list.
- Uses accessible labels, keyboard-operable buttons, and descriptive image alt text.

## Setup

The project uses React 18, Vite 5, and Tailwind CSS 3.

To create a new copy from an empty parent directory:

```bash
npm create vite@latest celebrare-photo-gallery -- --template react
cd celebrare-photo-gallery
npm install
```

Then copy the source files and configuration from this project, or use this repository directly. The commands below install dependencies and start the existing project:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

`npm run build` creates the deployable output in `dist`. `npm run preview` serves that output locally.

## Project structure

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

`useFetchPhotos` owns the API request and returns exactly `photos`, `loading`, and `error`. It uses an `AbortController` so an unmounted component cannot update state from an old request.

`favouritesReducer` owns the list of favourite photo IDs. A reducer receives the current state and an action, then returns a new state. The `toggle` action adds an ID when absent and removes it when present. The reducer initializer safely reads and validates saved JSON. IDs are stored instead of complete photo objects because they are all that is needed to identify a favourite.

`useCallback` keeps the search handler's function identity stable; it is an optimization and removing it would not change correct filtering behavior. `useMemo` recalculates the filtered list only when `photos` or `searchQuery` changes; it does not replace state and does not mutate the source array.

## Verification checklist

- [ ] Initial load requests 30 photos and shows a spinner while waiting.
- [ ] Failed HTTP responses and network failures show an error state.
- [ ] Search is immediate, case-insensitive, and does not make another request.
- [ ] Clearing search restores all fetched photos.
- [ ] Favourite hearts add and remove IDs without duplicates.
- [ ] Favourites survive a refresh and invalid stored JSON does not crash the app.
- [ ] Mobile/tablet/desktop layouts show 1/2/4 columns.
- [ ] `npm run build` completes successfully.

To simulate a fetch failure temporarily, use browser DevTools Network throttling or block `picsum.photos`, then reload. Remove the block after testing.

## GitHub submission commands

Replace the remote URL with the public repository you create:

```bash
git init
git add .
git commit -m "Build photo gallery assignment"
git branch -M main
git remote add origin https://github.com/<your-username>/celebrare-photo-gallery.git
git push -u origin main
```

Suggested repository name: `celebrare-photo-gallery`

## Five-minute recording script

### Minute 1: Demonstrate the application

“The gallery loads 30 Picsum photos. I can search by author as I type, and the results update without another API request. Clicking a heart marks a photo as a favourite. After refreshing, the selected heart is still active.”

### Minute 2: Explain `useFetchPhotos`

“The custom hook keeps network logic out of the UI. It starts with an empty photo list, loading set to true, and no error. It checks `response.ok`, parses the JSON, and stores the result. HTTP and network failures become an error state. An `AbortController` cancels an in-flight request during cleanup.”

### Minute 3: Explain `useReducer` and `localStorage`

“The reducer state is an array of photo IDs. Its toggle action returns a new array, adding an ID if it is missing or filtering it out if it is present. `useReducer` makes this state transition explicit, as required by the assignment. A separate effect serializes the IDs to localStorage, and the reducer initializer safely restores them on startup.”

### Minute 4: Explain `useCallback` and `useMemo`

“The search handler is wrapped in `useCallback`, so its reference remains stable while its dependencies remain unchanged. `useMemo` filters the original photo array using the query and author name. Its dependencies are the photos and query. Neither hook is required for basic correctness: removing them from this small app should still work, but they demonstrate the requested React patterns.”

### Minute 5: Explain an actual challenge

Use this template after replacing the brackets with a real issue you encountered:

“One challenge I encountered was [describe the actual issue]. I reproduced it by [describe the test]. I inspected [the relevant component, hook, or browser DevTools output] and found that [root cause]. I fixed it by [specific change], then verified the fix by [specific test].”

Do not claim a challenge you did not actually encounter.
