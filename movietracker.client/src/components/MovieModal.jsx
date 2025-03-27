import React, { useState } from "react";
import { motion } from "framer-motion";
import "./MovieModal.css";

function MovieModal({ movie, onClose, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
    const [editedMovie, setEditedMovie] = useState({ ...movie }); // Editable copy of the movie

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "rating") {
            const numericValue = Number(value);
            if (numericValue < 1 || numericValue > 10) {
                // Prevent setting the rating beyond allowed range
                return;
            }
        }

        setEditedMovie((prevMovie) => ({
            ...prevMovie,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onEdit(editedMovie);
        setIsEditing(false);
        onClose();
    };

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }} // Initial state (hidden)
            animate={{ opacity: 1 }} // Animation state (visible)
            exit={{ opacity: 0 }} // Exit animation
            transition={{ duration: 0.3 }} // Smooth transition
            onClick={onClose} // Close modal when clicking outside the content
        >
            <motion.div
                className="modal"
                initial={{ scale: 0.8, opacity: 0 }} // Initial modal state
                animate={{ scale: 1, opacity: 1 }} // Modal expands and becomes visible
                exit={{ scale: 0.8, opacity: 0 }} // Modal shrinks and disappears
                transition={{ duration: 0.3 }} // Smooth transition
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {/* Conditionally render close button */}
                {!isEditing && (
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                )}
                <div className="modal-content">
                    {isEditing ? (
                        <>
                            <h2>Edit Movie</h2>
                            <div className="form-group">
                                <label>Poster URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="posterPath"
                                    value={editedMovie.posterPath}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={editedMovie.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Overview</label>
                                <textarea
                                    className="form-control"
                                    name="overview"
                                    value={editedMovie.overview}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Rating</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="rating"
                                    value={editedMovie.rating}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="10"
                                />
                            </div>
                            <div className="form-group">
                                <label>Review</label>
                                <textarea
                                    className="form-control"
                                    name="review"
                                    value={editedMovie.review}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="modal-buttons">
                                <button
                                    className="btn"
                                    onClick={handleSave}
                                    style={{
                                        backgroundColor: '#28a745', // Green background for Save
                                        color: 'white', // White text color
                                        border: 'none', // No border
                                        padding: '10px 15px', // Padding for a comfortable size
                                        borderRadius: '5px', // Rounded corners
                                        cursor: 'pointer', // Pointer cursor on hover
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => setIsEditing(false)}
                                    style={{
                                        backgroundColor: '#6c757d', // Gray background for Cancel
                                        color: 'white', // White text color
                                        border: 'none', // No border
                                        padding: '10px 15px', // Padding for a comfortable size
                                        borderRadius: '5px', // Rounded corners
                                        cursor: 'pointer', // Pointer cursor on hover
                                    }}
                                >
                                    Cancel
                                </button>
                                
                            </div>

                        </>
                    ) : (
                        <>
                            <img
                                    src={movie.posterPath || 'https://media.istockphoto.com/id/995815438/vector/movie-and-film-modern-retro-vintage-poster-background.jpg?s=612x612&w=0&k=20&c=UvRsJaKcp0EKIuqDKp6S7Dwhltt0D5rbegPkS-B8nDQ='}
                                alt={movie.title || "No Title"}
                            />
                            <h2>{movie.title || "No Title"}</h2>
                            <p>{movie.overview}</p>
                            <p>
                                <strong>Rating:</strong> {movie.rating}
                            </p>
                            <p>
                                <strong>Review:</strong> {movie.review || "No review available."}
                            </p>
                            <div className="modal-buttons">
                                <button
                                    className="btn btn-warning"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                                <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this movie?")) {
                                                onDelete(movie.movieId);
                                                onClose();
                                            }
                                        }}
                                >
                                    Delete
                                    </button>
                                </div>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default MovieModal;
