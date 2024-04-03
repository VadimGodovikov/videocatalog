import React from "react";
import './MovieCard-CSS.css';
import { useNavigate } from 'react-router-dom';
import shablonphoto from '../../img/shablonphoto.png'

const MovieCard = ({ movie }) => {

    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    if(!movie){
        return null;
    }
    return (
        <div className="movie-card" onClick={handleMovieClick}>
            <img class="img-movie" src={movie.poster.url || shablonphoto} alt={movie.name || movie.alternativeName}></img>
            <h3 class="name-movie">{movie.name || movie.alternativeName}</h3>
            <h4 class="options-movie">{movie.year},  Рейтинг:&#8201; {movie.rating.kp || movie.rating.imdb || movie.rating.filmCritics} / 10</h4>
        </div>
    );
};

export default MovieCard;