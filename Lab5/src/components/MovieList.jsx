import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies, onDeleteMovie, onUpdateMovie }) {
  if (movies.length === 0) {
    return (
      <section className="movie-list empty-state">
        <h2>No movies yet</h2>
        <p>
          Add your first movie with a short review and a rating. Your watchlist
          will appear here.
        </p>
      </section>
    );
  }

  return (
    <section className="movie-list">
      <div className="list-header">
        <h2>Your Movies</h2>
        <span>{movies.length} saved</span>
      </div>

      <div className="cards-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDeleteMovie={onDeleteMovie}
            onUpdateMovie={onUpdateMovie}
          />
        ))}
      </div>
    </section>
  );
}
