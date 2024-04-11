import React, { useState, useEffect } from "react";
import './LibraryPage-CSS.css'
import Modal from '../Modal/Modal'
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { API_KEY, API_URL } from "../../../utils/consts";
import MovieList from "../../movie/MovieList/MovieList";
//import { Context } from "../../..";
import FilmList from "../FilmList/FilmList";

const LibraryPage = () => {

    const [localURL, setLocalURL] = useState('');
    const [fileName, setFileName] = useState('');
    const [filmLoaded, setFilmLoaded] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file.type.startsWith('video/')) {
            setLocalURL(URL.createObjectURL(file));
            setFileName(file.name);
            setFilmLoaded(true);
        } else {
            alert('Пожалуйста, загрузите фильм');
            setFilmLoaded(false);
        }
    }


    const [movies, setMovieData] = useState([]);
    const handleUpload = () => {
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

            console.log(localURL);
            console.log(fileName);
            setModalActive(false);
            console.log(movies);
            setModalMovieActive(true);
        }
    }

    const id = localStorage.getItem('userId');

    const [films, setFilmData] = useState([]);
    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const filmData = await axios.get(`http://localhost:5000/api/movie/films/${id}`);

                setFilmData(filmData.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchFilm();
    }, [id]);

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
                <span class='sort-title'>Сортировать по: <span class='sort-menu'>почему-то</span></span>
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