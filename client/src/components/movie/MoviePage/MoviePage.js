import React, { useEffect, useState } from "react";
import './MoviePage-CSS.css';
import axios from "axios";
import { API_KEY, API_URL } from "../../../utils/consts";
import { useParams } from "react-router-dom";
import PersonSlider from "../../person/PersonSlider/PersonSlider";
import SimilarMovieSlider from "../SimilarMovieSlider/SimilarMovieSlider";
import shablonphoto from '../../img/shablonphoto.png'

const MoviePage = () => {

  const { movieId } = useParams();
  const [movie, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await axios.get(`${API_URL}/movie/${movieId}`, {
          headers: {
            'X-API-KEY': API_KEY
          }
        });

        setMovieData(movieData.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const persons = movie?.persons || [];
  const simMovie = movie?.similarMovies || [];

  console.log(movie);

  if (!movie || !persons) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div className="movie-component">
      <div className="movie-info">
        <img class="movie-img" src={movie.poster.url || shablonphoto} alt={movie.name || movie.alternativeName}></img>
        <div className="movie-options">
          <p class="movie-name">{movie.name || movie.alternativeName}</p>
          <p class="movie-reit">Рейтинг: {movie?.rating?.kp || movie?.rating?.imdb || movie?.rating?.filmCritics} / 10</p>
          <p class="movie-title-description">Описание фильма</p>
          <p class="movie-description">{movie.description}</p>
          <p className="movie-country">Страна: <span class="movie-ott">{movie?.countries?.map((c, index) => (
            <span key={c.name}>
              {c.name}
              {index !== movie.countries.length - 1 && <>,&nbsp;&nbsp;</>}
            </span>
          ))}</span></p>
          <p class="movie-zhanr">Жанр: <span class="movie-ott">{movie?.genres?.map((g, index) => (
            <span key={g.name}>{g.name}{index !== movie.genres.length - 1 && <>,&nbsp;&nbsp;</>}
            </span>
          ))}</span></p>
          <p class="movie-year">Год: <span class="movie-ott">{movie.year}</span></p>
        </div>
      </div>
      <div className="movie-person">
        <PersonSlider persons={persons} key={movieId} />
      </div>
      <div className="movie-similar">
        <SimilarMovieSlider simMovie={simMovie} key={movieId}/>
      </div>
    </div>
  );
};

export default MoviePage;