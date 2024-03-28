import React from 'react';
import MovieSlider from '../components/movie/MovieSlider/MovieSlider';
const Main = () => {
    const genres = ['боевик'/*, 'ужасы', 'драма'*/];
    return (
        <div>
            {genres.map(genre => <MovieSlider key={genre} genre={genre}/>)}
        </div>
    )
}

export default Main;