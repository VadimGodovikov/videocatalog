import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import MovieCard from "./MovieCard";

const MovieSlider = ({ genre }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const moviesData = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?genres.name=${genre}`, {
              headers: {
                'X-API-KEY': '6BPY2WX-2RMM7RA-NZW601H-8CC689V'
              }
            });
            setMovies(moviesData.data.docs);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchMovies();
      }, [genre]);

      const setting = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slideToScroll: 3
      };

      console.log(movies);
      
      if(!movies) {
        return (<h1>Загрузка</h1>);
      }
      else{
        return (
          <div className="movie-slider">
              <h2>{genre}</h2>
              <Slider {...setting}>
              {movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
              </Slider>
          </div>
        );
      }
      
      
};

export default MovieSlider;