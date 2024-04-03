import React from "react";
import { Carousel, CarouselItem, Stack, Card } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import './SimilarMovieSlider-CSS.css'

const SimilarMovieSlider = ({ simMovie }) => {
    if(simMovie.length === 0){
        return null;
    }
    return(
        <div className="movie-slider">
            <h2 class="similar-title">Похожие фильмы:</h2>
            <Carousel interval={5000} indicators={false}>
              {[...Array(Math.ceil(simMovie.length / 5))].map((_, index) => (
                <CarouselItem key={index}>
                  <Stack direction="horizontal" className="h-100 justify-content-center align-items-down" gap={5}>
                    {simMovie.slice(index * 5, (index + 1) * 5).map(movie => (
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
};

export default SimilarMovieSlider;