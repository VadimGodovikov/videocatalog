import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, CarouselItem, Stack, Card } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import './MovieSlider-CSS.css'

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

      if(!movies) {
        return (<h1>Загрузка</h1>);
      }
      else{
        return (
          <div className="movie-slider">
            <h2 className="genre-title">{genre}</h2>
            <Carousel interval={5000} indicators={true} style={{ height: 300 }}>
              {[...Array(Math.ceil(movies.length / 5))].map((_, index) => (
                <CarouselItem key={index}>
                  <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={5}>
                    {movies.slice(index * 5, (index + 1) * 5).map(movie => (
                      <Card key={movie.id}>
                        <MovieCard movie={movie}/>
                      </Card>
                    ))}
                  </Stack>
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        );
      }
      
      
};

export default MovieSlider;