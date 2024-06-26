import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY } from "../../../utils/consts";
import PersonMovieSlider from "../PersonMovieSldier/PersonMovieSlider";
import shablonphoto from '../../img/shablonphoto.png'
import './PersonPage-CSS.css'

const PersonPage = () => {

    const { personId } = useParams();
    const [person, setPersonData] = useState(null);
    const [personMovies, setPersonMovies] = useState([]);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const personData = await axios.get(`${API_URL}/person/${personId}`, {
                    headers: {
                        'X-API-KEY': API_KEY
                    }
                });
                const personMoviesData = await axios.get(`${API_URL}/movie?persons.id=${personId}&page=1&limit=250`, {
                    headers: {
                        'X-API-KEY': API_KEY
                    }
                });
                setPersonData(personData.data);
                setPersonMovies(personMoviesData.data.docs)
            } catch (error) {
                console.error(error);
            }
        };
        fetchPerson();
    }, [personId]);

    console.log(person);
    console.log(personMovies);
    if (!person) {
        return (
            <h1>Загрузка...</h1>
        );
    }
    return (
        <div class="person-component">
            <div class="person-info">
                <img class="person-photo" src={person.photo || shablonphoto} alt={person.name || person.enName} />
                <div class="person-options">
                    <p class="person-name">{person.name || person.enName}</p>
                    <p className="person-options-info">Карьера: <span className="person-ott">
                        {person?.profession?.map((prof, index) => {
                            return (
                                <span key={prof.value}>
                                    {prof.value}
                                    {index !== person?.profession?.length - 1 && ", "}
                                </span>
                            );
                        })}
                        {person?.profession?.length === 0 && "Неизвестно"}
                    </span></p>
                    <p class="person-options-info">Дата рождения: <span class="person-ott">{new Date(person.birthday).toLocaleDateString()}</span></p>
                    <p class="person-options-info">Место рождения: <span class="person-ott">{person?.birthPlace?.map((b, index) => (
                        <span key={b.value}>
                            {b.value}
                            {index !== person.birthPlace.length - 1 && <>,&nbsp;&nbsp;</>}
                        </span>
                    ))}</span></p>
                    <p class="person-options-info">Всего фильмов: <span class="person-ott">{person.movies.length}</span></p>
                </div>
            </div>
            <div class="person-movie-slider">
                <h2 class="person-movie-slider-title">Фильмы персоны</h2>
                <PersonMovieSlider personMovies={personMovies} key={personId} />
            </div>
        </div>
    );
};

export default PersonPage;