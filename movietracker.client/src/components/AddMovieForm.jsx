import React from 'react';
import './AddMovieForm.css';
import { motion } from 'framer-motion';

function AddMovieForm({ onAddMovie, onClose }) {
    const [newMovie, setNewMovie] = React.useState({
        title: '',
        overview: '',
        posterPath: '',
        rating: 1,
        review: ''
    });

    const [errors, setErrors] = React.useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'rating') {
            const numericValue = Number(value);
            if (numericValue < 1 || numericValue > 10) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: 'Rating must be between 1 and 10',
                }));
            } else {
                setErrors((prev) => {
                    const { [name]: removed, ...rest } = prev;
                    return rest;
                });
            }
        }

        setNewMovie((prevMovie) => ({
            ...prevMovie,
            [name]: value,
        }));
    };

    const addMovie = async () => {
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('https://localhost:7111/api/movies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMovie),
                });

                if (response.ok) {
                    const createdMovie = await response.json();
                    onAddMovie(createdMovie); // Update movie list in App.js
                    setNewMovie({ title: '', overview: '', posterPath: '', rating: 0, review: '' });
                    onClose();
                } else {
                    console.error('Error adding movie:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding movie:', error);
            }
        } else {
            alert('Please resolve errors before submitting.');
        }
    };

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }} // Initial opacity (hidden)
            animate={{ opacity: 1 }} // Animate to full opacity
            exit={{ opacity: 0 }} // Exit animation
            transition={{ duration: 0.3 }} // Smooth transition
            onClick={onClose} // Close modal when clicking outside the content
        >
            <motion.div
                className="modal-content p-4 position-relative"
                initial={{ scale: 0.8, opacity: 0 }} // Initial state
                animate={{ scale: 1, opacity: 1 }} // Animation state
                exit={{ scale: 0.8, opacity: 0 }} // Exit state
                transition={{ duration: 0.3 }} // Smooth transition
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>

                <h2 className="form-title">Add a New Movie</h2>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={newMovie.title}
                        onChange={handleInputChange}
                        placeholder="Enter movie title"
                    />
                </div>
                <div className="form-group">
                    <label>Overview</label>
                    <textarea
                        className="form-control"
                        name="overview"
                        value={newMovie.overview}
                        onChange={handleInputChange}
                        placeholder="Enter movie overview"
                    />
                </div>
                <div className="form-group">
                    <label>Poster URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="posterPath"
                        value={newMovie.posterPath}
                        onChange={handleInputChange}
                        placeholder="Enter poster URL"
                    />
                </div>
                <div className="form-group">
                    <label>Rating</label>
                    <input
                        type="number"
                        className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
                        name="rating"
                        value={newMovie.rating}
                        onChange={handleInputChange}
                        placeholder="Enter movie rating (1-10)"
                        min="1"
                        max="10"
                    />
                    {errors.rating && (
                        <div className="invalid-feedback">{errors.rating}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>Review</label>
                    <textarea
                        className="form-control"
                        name="review"
                        value={newMovie.review}
                        onChange={handleInputChange}
                        placeholder="Enter movie review"
                    />
                </div>
                <button
                    className=""
                    onClick={addMovie}
                    disabled={Object.keys(errors).length > 0}
                >
                    Add Movie
                </button>
            </motion.div>
        </motion.div>
    );
}

export default AddMovieForm;