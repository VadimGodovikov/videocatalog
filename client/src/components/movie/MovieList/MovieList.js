import React from "react";
import ModalCardFilm from "../../library/ModalCardFilm/ModalCardFilm";
import './MovieList-CSS.css'

const MovieList = ({ movies }) => {
    if (!movies) {
        return (
            <h1>Загрузка...</h1>
        );
    }
    return (
        <div class="movie-list">
            {movies.map(movie => (
                <ModalCardFilm key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;