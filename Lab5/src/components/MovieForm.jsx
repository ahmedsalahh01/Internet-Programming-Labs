import { useState } from "react";

const initialFormData = {
  title: "",
  review: "",
  rating: ""
};

export default function MovieForm({ onAddMovie }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value
    }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Movie title is required.";
    }

    if (!formData.review.trim()) {
      nextErrors.review = "Review cannot be empty.";
    }

    if (!formData.rating) {
      nextErrors.rating = "Rating is required.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onAddMovie({
      title: formData.title.trim(),
      review: formData.review.trim(),
      rating: Number(formData.rating)
    });

    setFormData(initialFormData);
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit} noValidate>
      <h2>Add a Movie</h2>

      <label htmlFor="title">Movie Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Example: Inception"
        value={formData.title}
        onChange={handleChange}
      />
      {errors.title && <p className="error-message">{errors.title}</p>}

      <label htmlFor="review">Comment / Review</label>
      <textarea
        id="review"
        name="review"
        placeholder="What did you think about it?"
        rows="5"
        value={formData.review}
        onChange={handleChange}
      />
      {errors.review && <p className="error-message">{errors.review}</p>}

      <label htmlFor="rating">Star Rating</label>
      <select
        id="rating"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
      >
        <option value="">Choose a rating</option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>
      {errors.rating && <p className="error-message">{errors.rating}</p>}

      <button className="primary-button" type="submit">
        Add Movie
      </button>
    </form>
  );
}
