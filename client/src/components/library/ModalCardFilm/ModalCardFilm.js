import React from "react";
import axios from "axios";
import './ModalCardFilms-CSS.css'
import shablonphoto from '../../img/shablonphoto.png'

const ModalCardFilm = ({ movie }) => {

    const userId = localStorage.getItem('userId');
    const localURL = localStorage.getItem('localFilmURL');

    const handleMovieClick = async () => {
        try {
            const film = await axios.post(`http://localhost:5000/api/movie/upload`, {
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
                FilePath: localURL
            });
    
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