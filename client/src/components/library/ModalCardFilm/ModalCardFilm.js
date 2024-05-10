import React, { useState } from "react";
import axios from "axios";
import './ModalCardFilms-CSS.css'
import shablonphoto from '../../img/shablonphoto.png'

const ModalCardFilm = ({ movie }) => {

    const userId = localStorage.getItem('userId');
    const localURL = localStorage.getItem('localFilmURL');

    const handleMovieClick = async () => {
        try {
            const filmData = {
                ID_Filma: movie.id,
                Name: movie.name || movie.alternativeName,
                DataVihoda: movie.year,
                AgeRestriction: movie.ageRating,
                Description: movie.description,
                Rating: movie?.rating?.kp || movie?.rating?.imdb || movie?.rating?.filmCritics,
                Photo: movie.poster.url || shablonphoto,
                nameZhanr: movie.genres.map(g => g.name).join(', '),
                nameCountry: movie.countries.map(c => c.name).join(', '),
                ID_Usera: userId,
                FilePath: localURL,
                persons
            };

            const film = await axios.post(`http://localhost:5000/api/movie/upload`, filmData);
    
            if (film.status === 200) {
                window.location.reload();
            } else {
                console.error('Ошибка при отправке данных на сервер');
            }
        } catch (error) {
            console.error('Произошла ошибка: ', error);
        }
    };

    if (!movie) {
        return (
            <div>
                <h2>
                    Такого фильма в базе данных не существует
                </h2>
            </div>
        );
    }

    return (
        <div className="movie-card" onClick={handleMovieClick}>
            <img className="img-movie" src={movie.poster.url || shablonphoto} alt={movie.name || movie.alternativeName}></img>
            <h3 className="name-movie">{movie.name || movie.alternativeName}</h3>
            {movie.rating && (
                <h4 className="options-movie">
                    {movie.year}, Рейтинг: {movie?.rating?.kp || movie?.rating?.imdb || movie?.rating?.filmCritics} / 10
                </h4>
            )}
        </div>
    );
};

export default ModalCardFilm;