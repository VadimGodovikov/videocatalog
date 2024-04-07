import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, CarouselItem, Stack, Card } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import './MovieSlider-CSS.css'
import { API_KEY, API_URL } from "../../../utils/consts";

const MovieSlider = ({ genre }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const moviesData = await axios.get(`${API_URL}/movie?genres.name=${genre}&year=2024&limit=150`, {
              headers: {
                'X-API-KEY': API_KEY
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
        return (<h1>Загрузка...</h1>);
      }
      else{
        return (
          <div className="movie-slider">
            <h2 className="genre-title">{genre}</h2>
            <Carousel interval={5000} indicators={false}>
              {[...Array(Math.ceil(movies.length / 5))].map((_, index) => (
                <CarouselItem key={index}>
                  <Stack direction="horizontal" className="justify-content-center align-items-down" gap={5}>
                    {movies.slice(index * 5, (index + 1) * 5).map(movie => (
                      <Card key={movie.id} style={{ border: 0 }}>
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