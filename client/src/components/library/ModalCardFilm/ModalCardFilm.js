import React from "react";
import { useNavigate } from 'react-router-dom';
import './ModalCardFilms-CSS.css'
import shablonphoto from '../../img/shablonphoto.png'

const ModalCardFilm = ({ movie }) => {

    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    if (!movie) {
        <div>
            <h2>
                Такого фильма в базе данных не существует
            </h2>
        </div>
    }
    return (
        <div className="movie-card" onClick={handleMovieClick}>
            <img class="img-movie" src={movie.poster.url || shablonphoto} alt={movie.name || movie.alternativeName}></img>
            <h3 class="name-movie">{movie.name || movie.alternativeName}</h3>
            {movie.rating && (
                <h4 class="options-movie">
                    {movie.year}, Рейтинг: {movie?.rating?.kp || movie?.rating?.imdb || movie?.rating?.filmCritics} / 10
                </h4>
            )}
        </div>
    );
};

export default ModalCardFilm;