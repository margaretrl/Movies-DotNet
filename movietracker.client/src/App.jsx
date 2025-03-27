import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard.jsx';
import MovieModal from './components/MovieModal.jsx';
import AddMovieForm from './components/AddMovieForm.jsx';
import Header from './components/Header.jsx';
import { AnimatePresence } from 'framer-motion';

function App() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [flippedStates, setFlippedStates] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMovies(filtered);
        setFlippedStates(Array(filtered.length).fill(false)); // Reset flipped states for filtered movies
    }, [searchQuery, movies]);

    const fetchMovies = async () => {
        try {
            const response = await fetch('https://localhost:7111/api/movies');
            const data = await response.json();
            setMovies(data);
            setFilteredMovies(data);
            setFlippedStates(Array(data.length).fill(false)); // Initialize flipped states
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const flipCardsSequentially = () => {
        filteredMovies.forEach((_, index) => {
            setTimeout(() => {
                setFlippedStates((prevStates) => {
                    const newStates = [...prevStates];
                    newStates[index] = !newStates[index];
                    return newStates;
                });
            }, index * 500); // 500ms delay between flips
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://localhost:7111/api/movies/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMovies((prev) => prev.filter((m) => m.movieId !== id));
                closeModal();
            } else {
                console.error('Failed to delete the movie');
            }
        } catch (error) {
            console.error('Error deleting the movie:', error);
        }
    };

    const handleEdit = async (updatedMovie) => {
        try {
            const response = await fetch(`https://localhost:7111/api/movies/${updatedMovie.movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie),
            });
            if (response.ok) {
                setMovies((prev) =>
                    prev.map((m) =>
                        m.movieId === updatedMovie.movieId ? updatedMovie : m
                    )
                );
                closeModal();
            } else {
                console.error('Failed to update the movie');
            }
        } catch (error) {
            console.error('Error updating the movie:', error);
        }
    };

    const cards = filteredMovies.map((movie, index) => (
        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6" key={movie.movieId}>
            <MovieCard
                flipped={flippedStates[index]} // Pass flipped state
                initialMovieData={movie}
                onClick={() => openModal(movie)} // Pass the openModal handler
            />
        </div>
    ));

    const openModal = (movie) => {
        console.log("Opening modal for movie:", movie);
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };

    const openAddForm = () => {
        setIsAddFormOpen(true);
    };

    const closeAddForm = () => {
        setIsAddFormOpen(false);
    };

    return (
        <div className="app-container">
            <Header
                title="MovieTracker"
                onToggleForm={openAddForm}
                onSearch={(query) => setSearchQuery(query)}
                onFlipCards={flipCardsSequentially} // New prop for flipping cards
            />
            <div className="header-spacing"></div>

            <div className={`content ${isModalOpen || isAddFormOpen ? 'blur' : ''}`}>
                <div className="row g-3">
                    {filteredMovies.length === 0 ? (
                        <p className="text-center">No movies found.</p>
                    ) : (
                        cards
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <MovieModal
                        movie={selectedMovie}
                        onClose={closeModal}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                )}

                {isAddFormOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <AddMovieForm
                                onAddMovie={(newMovie) => {
                                    setMovies((prevMovies) => [...prevMovies, newMovie]);
                                    closeAddForm();
                                }}
                                onClose={closeAddForm}
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;