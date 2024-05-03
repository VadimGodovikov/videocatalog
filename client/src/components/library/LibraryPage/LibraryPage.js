import React, { useState, useEffect } from "react";
import './LibraryPage-CSS.css'
import Modal from '../Modal/Modal'
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { API_KEY, API_URL } from "../../../utils/consts";
import MovieList from "../../movie/MovieList/MovieList";
import FilmList from "../FilmList/FilmList";

const LibraryPage = () => {

    const [localURL, setLocalURL] = useState('');
    const [fileName, setFileName] = useState('');
    const [filmLoaded, setFilmLoaded] = useState(false);

    // переменные для фильтра:
    const [filtrName, setFiltrName] = useState('');
    const [filtrYear, setFiltrYear] = useState('');
    const [filtrRating, setFiltrRating] = useState('');
    const [filtrZhanr, setFiltrZhanr] = useState('');
    const [filtrCountry, setFiltrCountry] = useState('');

    const handleFileChange = (e) => {  // загрузка файла
        const file = e.target.files[0];

        if (file.type.startsWith('video')) {
            setLocalURL(file.name);
            setFileName(file.name);
            setFilmLoaded(true);
            console.log(localURL);
        } else {
            alert('Пожалуйста, загрузите фильм');
            setFilmLoaded(false);
        }
    }

    const [movies, setMovieData] = useState([]);
    const handleUpload = () => {  // кнопка загрузки файла
        if (!filmLoaded) {
            alert('Фильм не загружен');
        } else {
            const fetchMovie = async () => {
                try {
                    const movieData = await axios.get(`${API_URL}/movie/search?page=1&limit=10&query=${fileName}`, {
                        headers: {
                            'X-API-KEY': API_KEY
                        }
                    });

                    setMovieData(movieData.data.docs);

                } catch (error) {
                    console.error(error);
                }
            };

            fetchMovie();

            console.log(fileName);
            console.log(localURL);
            setModalActive(false);
            setModalMovieActive(true);
        }
    }

    localStorage.setItem('localFilmURL', localURL);
    const id = localStorage.getItem('userId');

    const [films, setFilmData] = useState([]);
    useEffect(() => {  // парсер с сервера фильмов
        const fetchFilm = async () => {
            try {
                const filmData = await axios.get(`http://localhost:5000/api/movie/films/${id}?name=${filtrName || ''}&year=${filtrYear || ''}&rating=${filtrRating || ''}&zhanr=${filtrZhanr || ''}&country=${filtrCountry || ''}`);

                setFilmData(filmData.data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchFilm();

    }, [id, filtrName, filtrYear, filtrRating, filtrZhanr, filtrCountry]);


    const [modalActive, setModalActive] = useState(false);
    const [modalInfoActive, setModalInfoActive] = useState(false);
    const [modalMovieActive, setModalMovieActive] = useState(false);
    return (
        <div class='library-component'>
            <div className='library-info'>
                <div class="library-options">
                    <h2 class="library-title">Библиотека</h2>
                </div>
                <div class="library-button">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setModalActive(true)}>
                        <circle cx="25" cy="25" r="25" fill="white" />
                        <g clip-path="url(#clip0_39_60)">
                            <path d="M42.6471 26.4706H26.4707V42.6471H23.5295V26.4706H7.35303V23.5294H23.5295V7.35294H26.4707V23.5294H42.6471V26.4706Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_39_60">
                                <rect width="35.2941" height="35.2941" fill="white" transform="translate(7.35303 7.35294)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div class="info-for-button">
                    <h3> - загрузи фильм</h3>
                </div>
            </div>
            <div class='library-sort'>
                <span class='sort-title'>Сортировать по: <span class='sort-menu'>
                    <form>
                        <input
                            className="sort-menu-items"
                            type="number"
                            id="year"
                            min="1950"
                            max="2024"
                            step="1"
                            placeholder="Введите год от 1950 до 2024"
                            style={{ width: 250 }}
                            onChange={(e) => {
                                let value = parseFloat(e.target.value);

                                if (value < 1950 || value > 2024 || isNaN(value)) {
                                    value = '';
                                }

                                setFiltrYear(value);
                            }}
                        />

                        <select className="sort-menu-items" id="genre" onChange={(e) => setFiltrZhanr(e.target.value)}>
                            <option value="">Жанр: </option>
                            <option value="аниме">Аниме</option>
                            <option value="биография">Биография</option>
                            <option value="боевик">Боевик</option>
                            <option value="вестерн">Вестерн</option>
                            <option value="военный">Военный</option>
                            <option value="детектив">Детектив</option>
                            <option value="детский">Детские</option>
                            <option value="документальный">Документальный</option>
                            <option value="драма">Драма</option>
                            <option value="Игра">Игра</option>
                            <option value="исторический">Исторический</option>
                            <option value="комедия">Комедия</option>
                            <option value="концерт">Концерт</option>
                            <option value="короткометражка">Короткометражка</option>
                            <option value="криминал">Криминал</option>
                            <option value="мелодрама">Мелодрама</option>
                            <option value="музыкальный">Музыкальный</option>
                            <option value="мультфильм">Мультфильм</option>
                            <option value="мюзикл">Мюзикл</option>
                            <option value="новости">Новости</option>
                            <option value="приключения">Приключения</option>
                            <option value="семейный">Семейный</option>
                            <option value="спортивный">Спортивное</option>
                            <option value="триллер">Триллер</option>
                            <option value="ужасы">Ужасы</option>
                            <option value="фантастика">Фантастика</option>
                            <option value="фильм-нуар">Фильмы-нуар</option>
                            <option value="фэнтэзи">Фэнтэзи</option>
                            <option value="Церемония">Церемония</option>
                        </select>

                        <input className="sort-menu-items" type="text" id="country" placeholder="Введите название страны" style={{ width: 220 }} onChange={(e) => {
                            const value = e.target.value;
                            if (value === '') {
                                setFiltrCountry('');
                            } else {
                                setFiltrCountry(value);
                            }
                        }} />

                        <input className="sort-menu-items" type="number" id="rating" min="0" max="10" step="0.1" placeholder="Рейтинг от 0 до 10" style={{ width: 180 }} onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value >= 0 && value <= 10) { setFiltrRating(value); }
                        }} />
                    </form>
                </span></span>
                <div className="search-menu">
                    <h3 class="search-title">Поиск по названию фильма</h3>
                    <input className="sort-menu-items" type="text" id="name" placeholder="Введите название фильма" style={{ width: 250 }} onChange={(e) => {
                        const searchValue = e.target.value; // по нижнему регистру
                        setFiltrName(searchValue);
                    }} />
                </div>
            </div>
            <div class="library-filmCard" style={{ marginTop: 50 }}>
                <FilmList films={films} />
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div>
                    <div class="button-info-upload" onClick={() => setModalInfoActive(true)}>
                        <h3>Как правильно загрузить фильм: </h3>
                        <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17V11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                            <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#1C274C" />
                            <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </div>
                    <h1 style={{ color: 'white', fontWeight: 500 }}>Загрузите фильм</h1>
                </div>
                <Form>
                    <Form.Control
                        type='file'
                        size='lg'
                        className="mt-3"
                        onChange={handleFileChange}
                    />
                    <Button onClick={handleUpload} size='lg' style={{ radius: 2000, backgroundColor: '#E84A5F', color: 'white', width: '100%' }} className='mt-3' variant={"outline-succes"}>
                        Загрузить
                    </Button>
                </Form>
            </Modal>
            <Modal active={modalInfoActive} setActive={setModalInfoActive}>
                <div class="info-upload-film">
                    <li> Фильм должен быть формата видео (avi, mp4, mp3)</li>
                    <li> Файл фильма должен содержать корректное название (Трансформеры 3)</li>
                    <li> После загрузки фильма, вы должны выбрать корректный фильм,<br />который вы загрузили</li>
                </div>
            </Modal>
            <Modal active={modalMovieActive} setActive={setModalMovieActive}>
                <h1>Выберите фильм, который вы загрузили</h1>
                <MovieList movies={movies} />
            </Modal>
        </div>
    );
};

export default LibraryPage;