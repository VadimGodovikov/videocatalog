import React, { useEffect, useState } from "react";
import './MoviePage-CSS.css';
import axios from "axios";
import { API_KEY, API_URL } from "../../../utils/consts";
import { useParams } from "react-router-dom";
import PersonSlider from "../../person/PersonSlider/PersonSlider";

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

  console.log(movie);
  const persons = movie?.persons || [];
  console.log(persons);

  if (!movie || !persons) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="movie-component">
      <div className="movie-info">
        <img class="movie-img" src={movie.poster.url} alt={movie.name || movie.alternativeName}></img>
        <div className="movie-options">
          <p class="movie-name">{movie.name || movie.alternativeName}</p>
          <p class="movie-reit">Рейтинг:&emsp;{movie.rating.kp} / 10</p>
          <p class="movie-description">{movie.description}</p>
          <p className="movie-language">Страна:&emsp;{movie?.countries?.map((c, index) => (
            <span key={c.name}>
              {c.name}
              {index !== movie.countries.length - 1 && <>,&nbsp;&nbsp;</>}
            </span>
          ))}</p>
          <p class="movie-genre">Жанр:&emsp;{movie?.genres?.map((g, index) => (
            <span key={g.name}>{g.name}{index !== movie.genres.length - 1 && <>,&nbsp;&nbsp;</>}
            </span>
          ))}</p>
          <p class="movie-year">Год:&emsp;{movie.year}</p>
        </div>
      </div>
      <div className="movie-person">
        <PersonSlider persons={persons} key={movieId} />
      </div>
    </div>
  );
};

export default MoviePage;