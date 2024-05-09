import React from "react";
import { Carousel, CarouselItem, Stack, Card } from "react-bootstrap";
import MovieCard from "../movie/MovieCard/MovieCard";
import '../movie/MovieSlider/MovieSlider-CSS.css'

const SliderForPodborki = ({ movies }) => {
      if(!movies) {
        return (
            <h1>Загрузка...</h1>
        );
      }
      else {
        return (
          <div className="movie-slider">
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

export default SliderForPodborki;