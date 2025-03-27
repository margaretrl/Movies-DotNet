import React from 'react';
import './MovieCard.css';

function MovieCard({ initialMovieData, flipped, onClick }) {
    return (
        <div
            className={`card-container ${flipped ? 'flipped' : ''}`}
            onClick={onClick} // Ensure the click event opens the modal
        >
            {/* Front Side */}
            <div className="card-front">
                <img
                    src={
                        initialMovieData.posterPath ||
                        'https://media.istockphoto.com/id/995815438/vector/movie-and-film-modern-retro-vintage-poster-background.jpg?s=612x612&w=0&k=20&c=UvRsJaKcp0EKIuqDKp6S7Dwhltt0D5rbegPkS-B8nDQ='
                    }
                    alt={initialMovieData.title || 'No Title'}
                    className="card-img"
                />
                <div className="card-body">
                    <h5 className="card-title">{initialMovieData.title || 'No Title'}</h5>
                    <p className="card-text-front">{initialMovieData.overview}</p>
                </div>
            </div>

            {/* Back Side */}
            <div className="card-back">
                <div className="card-body">
                    <h5 className="card-title">{initialMovieData.title || 'No Title'}</h5>
                    <p className="card-text-back">
                        <strong>Rating:</strong> {initialMovieData.rating}
                    </p>
                    <p className="card-text-back">
                        <strong>Review:</strong> {initialMovieData.review || 'No review'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
