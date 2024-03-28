import React from "react";

const MovieCard = ({ movie }) => {
    console.log(movie);
    return (
        <div className="movie-card">
            <img class="img-moviecard" src={movie.poster.url} alt={movie.name || movie.altenativeName}></img>
            <h2 class="name-moviecard">{movie.name || movie.altenativeName}</h2>
        </div>
    );
};

export default MovieCard;