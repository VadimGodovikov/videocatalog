import React, { useState, useEffect } from "react";
import axios from "axios";
import './ModalCardFilms-CSS.css'
import shablonphoto from '../../img/shablonphoto.png'
import { API_KEY, API_URL } from "../../../utils/consts";

const ModalCardFilm = ({ movie }) => {

    const [film, setFilm] = useState('');

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const filmData = await axios.get(`${API_URL}/movie/${movie.id}`, {
                    headers: {
                        'X-API-KEY': API_KEY
                    }
                });

                setFilm(filmData.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchFilm();
    }, []);
    const userId = localStorage.getItem('userId');
    const localURL = localStorage.getItem('localFilmURL');

    const handleMovieClick = async () => {
        try {
            const filmData = {
                ID_Filma: film.id,
                Name: film.name || film.alternativeName,
                DataVihoda: film.year,
                AgeRestriction: film.ageRating,
                Description: film.description,
                Rating: film?.rating?.kp || film?.rating?.imdb || film?.rating?.filmCritics,
                Photo: film.poster.url || shablonphoto,
                nameZhanr: film.genres.map(g => g.name).join(', '),
                nameCountry: film.countries.map(c => c.name).join(', '),
                ID_Usera: userId,
                FilePath: localURL,
                persons: film?.persons
            };
            console.log(filmData)

            const filmServer = await axios.post(`http://localhost:5000/api/movie/upload`, filmData);
            console.log(filmData)
            if (filmServer.status === 200) {
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