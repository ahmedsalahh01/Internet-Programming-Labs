import { useState } from "react";

function getStars(rating) {
  return "⭐".repeat(rating);
}

export default function MovieCard({ movie, onDeleteMovie, onUpdateMovie }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    review: movie.review,
    rating: String(movie.rating)
  });
  const [errors, setErrors] = useState({});

  function handleEditChange(event) {
    const { name, value } = event.target;

    setEditData((currentEditData) => ({
      ...currentEditData,
      [name]: value
    }));
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setErrors({});
    setEditData({
      review: movie.review,
      rating: String(movie.rating)
    });
  }

  function handleSaveEdit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!editData.review.trim()) {
      nextErrors.review = "Review cannot be empty.";
    }

    if (!editData.rating) {
      nextErrors.rating = "Rating is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onUpdateMovie(movie.id, {
      review: editData.review.trim(),
      rating: Number(editData.rating)
    });

    setIsEditing(false);
  }

  return (
    <article className="movie-card">
      <div className="movie-card-header">
        <h3>{movie.title}</h3>
        <button
          className="icon-button danger"
          type="button"
          onClick={() => onDeleteMovie(movie.id)}
          aria-label={`Delete ${movie.title}`}
        >
          Delete
        </button>
      </div>

      {isEditing ? (
        <form className="edit-form" onSubmit={handleSaveEdit} noValidate>
          <label htmlFor={`review-${movie.id}`}>Update Review</label>
          <textarea
            id={`review-${movie.id}`}
            name="review"
            rows="4"
            value={editData.review}
            onChange={handleEditChange}
          />
          {errors.review && <p className="error-message">{errors.review}</p>}

          <label htmlFor={`rating-${movie.id}`}>Update Rating</label>
          <select
            id={`rating-${movie.id}`}
            name="rating"
            value={editData.rating}
            onChange={handleEditChange}
          >
            <option value="">Choose a rating</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
          {errors.rating && <p className="error-message">{errors.rating}</p>}

          <div className="button-row">
            <button className="primary-button" type="submit">
              Save
            </button>
            <button className="secondary-button" type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="stars" aria-label={`${movie.rating} out of 5 stars`}>
            {getStars(movie.rating)}
          </p>
          <p className="review-text">{movie.review}</p>
          <button
            className="secondary-button"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Edit Review
          </button>
        </>
      )}
    </article>
  );
}
