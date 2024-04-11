import React from "react";
import FilmCard from "../FilmCard/FilmCard";

const FilmList = ({ films }) => {
    if (!films) {
        return null;
    }
    return (
        <div class="movie-list">
            {films.map(film => (
                <FilmCard key={film.ID_Filma} film={film} />
            ))}
        </div>
    );
};

export default FilmList;