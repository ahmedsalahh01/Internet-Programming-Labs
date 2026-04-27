import { useEffect, useState } from "react";
import MovieForm from "./components/MovieForm.jsx";
import MovieList from "./components/MovieList.jsx";

const STORAGE_KEY = "movie-watchlist-movies";

function getSavedMovies() {
  const savedMovies = localStorage.getItem(STORAGE_KEY);
  return savedMovies ? JSON.parse(savedMovies) : [];
}

export default function App() {
  const [movies, setMovies] = useState(getSavedMovies);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  function handleAddMovie(movie) {
    const newMovie = {
      ...movie,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    setMovies((currentMovies) => [newMovie, ...currentMovies]);
  }

  function handleDeleteMovie(movieId) {
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== movieId)
    );
  }

  function handleUpdateMovie(movieId, updatedMovie) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId ? { ...movie, ...updatedMovie } : movie
      )
    );
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">React Lab 5</p>
        <h1>Movie Watchlist</h1>
        <p className="intro">
          Save movies you want to remember, rate them, and keep your reviews
          ready after every refresh.
        </p>
      </section>

      <div className="layout">
        <MovieForm onAddMovie={handleAddMovie} />
        <MovieList
          movies={movies}
          onDeleteMovie={handleDeleteMovie}
          onUpdateMovie={handleUpdateMovie}
        />
      </div>
    </main>
  );
}
