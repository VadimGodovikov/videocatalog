import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY } from "../../../utils/consts";
import shablonphoto from '../../img/shablonphoto.png'
import '../../person/PersonPage/PersonPage-CSS.css'
import { Button } from 'react-bootstrap';
import FilmList from "../../library/FilmList/FilmList";
import Modal from '../../library/Modal/Modal'

const ActorPage = () => {

    const { actorId } = useParams();
    const [person, setPersonData] = useState(null);
    const [personBd, setPersonBdData] = useState(null);
    const [personTopMovies, setPersonTopMovies] = useState([]);
    const [personMovies, setPersonMovies] = useState([]);

    const userid = localStorage.getItem('userId');
    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const personData = await axios.get(`${API_URL}/person/${actorId}`, {
                    headers: {
                        'X-API-KEY': API_KEY
                    }
                });
                setPersonData(personData.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchPersonBd = async () => {
            try {
                const personBdData = await axios.get(`http://localhost:5000/api/person/${actorId}`);
                setPersonBdData(personBdData.data);
            } catch (error) {
                console.error(error);
            }
        }
        const fetchFilmsTop = async () => {
            try {
                const filmsTopData = await axios.get(`http://localhost:5000/api/person/film/top/${actorId}/${userid}`);
                setPersonTopMovies(filmsTopData.data);
            } catch (error) {
                console.error(error);
            }
        }
        const fetchFilms = async () => {
            try{
                const filmsData = await axios.get(`http://localhost:5000/api/person/film/${actorId}/${userid}`);
                setPersonMovies(filmsData.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPerson();
        fetchPersonBd();
        fetchFilmsTop();
        fetchFilms();
    }, [actorId]);
    const [modalActive, setModalActive] = useState(false);
    const handleOnClick = () => {
        setModalActive(true);
    };
    if (!personBd || !person) {
        return (
            <h1>Загрузка...</h1>
        );
    }
    return (
        <div class="person-component">
            <div class="person-info">
                <img class="person-photo" src={person.photo || personBd.Photo || shablonphoto} alt={person.name || personBd.Name || person.enName} />
                <div class="person-options">
                    <p class="person-name">{personBd.Name || person.name || person.enName}</p>
                    <p className="person-options-info">Карьера: <span className="person-ott">
                        {person?.profession?.map((prof, index) => {
                            return (
                                <span key={prof.value}>
                                    {prof.value}
                                    {index !== person?.profession?.length - 1 && ", "}
                                </span>
                            );
                        })}
                        {person?.profession?.length === 0 && personBd.Post ? personBd.Post : "Неизвестно"}
                    </span></p>
                    <p class="person-options-info">Дата рождения: <span class="person-ott">{new Date(person.birthday).toLocaleDateString() || "Неизвестно"}</span></p>
                    <p class="person-options-info">Место рождения: <span class="person-ott">
                        {person?.birthPlace?.map((b, index) => {
                            return (
                                <span key={b.value}>
                                    {b.value}
                                    {index !== person.birthPlace.length - 1 && <>,&nbsp;&nbsp;</>}
                                </span>
                            );
                        })}
                        {person?.birthPlace?.length === 0 && "Неизвестно"}
                    </span></p>
                    <p class="person-options-info">Всего фильмов: <span class="person-ott">{person.movies.length || "Неизвестно"}</span></p>
                    <Button onClick={handleOnClick} size='lg' style={{ radius: 2000, backgroundColor: '#E84A5F', color: 'white', width: '100%' }} className='mt-3' variant={"outline-succes"}>
                        Все фильмы персоны в Вашей коллекции
                    </Button>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <FilmList films={personMovies}/>
                    </Modal>
                </div>
            </div>
            <div class="person-movie-slider">
                <h2 class="person-movie-slider-title">Лучшие 5 фильмов персоны в Вашей коллекции</h2>
                <FilmList films={personTopMovies} />
            </div>
        </div>
    );
};

export default ActorPage;