import React from "react";
import { useNavigate } from 'react-router-dom';
import shablonphoto from '../../img/shablonphoto.png'

const FilmCard = ({ film }) => {
    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/film/${film.ID_Filma}`);
    };

    if (!film) {
        return null;
    }
    return (
        <div className="movie-card" onClick={handleMovieClick}>
            <img class="img-movie" src={film.Photo || shablonphoto} alt={film.Name}></img>
            <h3 class="name-movie">{film.Name}</h3>
            {film.Rating && (
                <h4 class="options-movie">
                    {film.DataVihoda}, Рейтинг: {film?.Rating} / 10
                </h4>
            )}
        </div>
    );
};

export default FilmCard;