import React from "react";

const sortFilms = () => {
    return (
        <div>
            <form>
                <select id="year">
                    <option value="">Выберите год</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>

                <select id="genre">
                    <option value="">Выберите жанр</option>
                    <option value="action">Боевик</option>
                    <option value="comedy">Комедия</option>
                </select>

                <select id="country">
                    <option value="">Выберите страну</option>
                    <option value="usa">США</option>
                    <option value="uk">Великобритания</option>
                </select>

                <input type="number" id="rating" min="0" max="10" step="0.1" placeholder="Рейтинг от 0 до 10"/>
            </form>
        </div>
    )
};
export default sortFilms;