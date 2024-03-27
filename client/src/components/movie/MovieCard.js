import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img class="img-moviecard" src={movie.poster} alt={movie.name}></img>
            <h2 class="name-moviecard">{movie.name}</h2>
        </div>
    );
};

export default MovieCard;