import React from "react";
import { Carousel, CarouselItem, Stack, Card } from "react-bootstrap";
import MovieCard from "../../movie/MovieCard/MovieCard"

const PersonMovieSlider = ({ personMovies }) => {
    
    if(!personMovies){
        return null;
    }
    return (
        <div className="persons-movie-slider">
            <Carousel interval={5000} indicators={false}>
                {[...Array(Math.ceil(personMovies?.length / 5))].map((_, index) => (
                    <CarouselItem key={index}>
                        <Stack direction="horizontal" className="h-100 justify-content-center align-items-down" gap={5}>
                            {personMovies?.slice(index * 5, (index + 1) * 5).map(movie => (
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

export default PersonMovieSlider;