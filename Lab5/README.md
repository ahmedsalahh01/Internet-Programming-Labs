# Movie Watchlist / Movie Rating App

This React lab project is a simple movie watchlist where users can save movies, write reviews, and give each movie a star rating from 1 to 5.

## Features

- Add movies with a title, review, and rating.
- Display ratings with star emojis.
- Edit each movie review and rating.
- Delete movies from the list.
- Show a friendly empty state when there are no saved movies.
- Validate required title, review, and rating fields.
- Save movies in `localStorage` so the list remains after refresh.
- Responsive card-based layout with clean modern styling.

## How to Run

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal after running the dev server.

## Components Used

- `App.jsx`: Holds the movies state, saves to `localStorage`, and provides add, update, and delete handlers.
- `MovieForm.jsx`: Controlled form for adding a new movie.
- `MovieList.jsx`: Renders the movie cards or the empty state.
- `MovieCard.jsx`: Displays one movie and handles editing its review and rating.
