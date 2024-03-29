import React from "react";
import './MovieCard-CSS.css';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img class="img-movie" src={movie.poster.url} alt={movie.name || movie.altenativeName}></img>
            <h3 class="name-movie">{movie.name || movie.altenativeName}</h3>
            <h4 class="options-movie">{movie.year},  Рейтинг:&#8201;&#8201; {movie.rating.kp} / 10</h4>
        </div>
    );
};

export default MovieCard;