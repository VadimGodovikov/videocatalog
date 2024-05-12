import React from 'react';
import MovieSlider from '../components/movie/MovieSlider/MovieSlider';
const Main = () => {
    const genres = ['боевик', 'ужасы', 'драма', 'комедия', 'военный', 'мелодрама', 'мультфильм', 'аниме'];
    return (
        <div>
            <h1>Новинки популярных жанров</h1>
            {genres.map(genre => <MovieSlider key={genre} genre={genre}/>)}
        </div>
    )
}

export default Main;