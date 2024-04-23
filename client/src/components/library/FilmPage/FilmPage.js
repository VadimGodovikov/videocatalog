import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import shablonphoto from '../../img/shablonphoto.png'
import Modal from "../Modal/Modal";
import { Form, Button } from "react-bootstrap";
import ReactPlayer from 'react-player';

const FilmPage = () => {
    const { filmId } = useParams();
    const [film, setFilmData] = useState(null);

    const [folderPath, setFolderPath] = useState('');
    const [movieName, setMovieName] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const handleWatchClick = () => {
        const moviePath = `${folderPath}/${movieName}.mp4`;
        setVideoUrl(moviePath);
    }

    const id = localStorage.getItem('userId');
    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const filmData = await axios.get(`http://localhost:5000/api/movie/film/${id}/${filmId}`);

                setFilmData(filmData.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchFilm();
    }, [id, filmId]);

    console.log(film);

    const [modalVideo, setModalVideoActive] = useState(false);
    if (!film) {
        return (
            <h1>Фильм в Вашей библиотеке не найден</h1>
        );
    } else {
        return (
            <div className="movie-component">
                <div className="movie-info">
                    <img class="movie-img" src={film?.Photo || shablonphoto} alt={film?.Name}></img>
                    <div className="movie-options">
                        <p class="movie-name">{film?.Name}</p>
                        <p class="movie-reit">Рейтинг: {film?.Rating} / 10</p>
                        <p class="movie-title-description">Описание фильма</p>
                        <p class="movie-description">{film?.Description}</p>
                        <p className="movie-country">Страна: <span class="movie-ott">{film?.Film_Countries?.map((c, index) => (
                            <span key={c.nameCountry}>
                                {c.nameCountry}
                                {index !== film.Film_Countries.length - 1 && <>,&nbsp;&nbsp;</>}
                            </span>
                        ))}</span></p>
                        <p class="movie-zhanr">Жанр: <span class="movie-ott">{film?.Film_Zhanrs?.map((g, index) => (
                            <span key={g.nameZhanr}>{g.nameZhanr}{index !== film.Film_Zhanrs.length - 1 && <>,&nbsp;&nbsp;</>}
                            </span>
                        ))}</span></p>
                        <p class="movie-year">Год: <span class="movie-ott">{film?.DataVihoda}</span></p>
                        <Button onClick={() => setModalVideoActive(true)} size='lg' style={{ radius: 2000, backgroundColor: '#E84A5F', color: 'white', width: '100%' }} className='mt-3' variant={"outline-succes"}>
                            Смотреть
                        </Button>
                        <Modal active={modalVideo} setActive={setModalVideoActive}>
                            <Form>
                                <Form.Control
                                    type='text'
                                    placeholder="Введите путь к папке"
                                    size='lg'
                                    className="mt-3"
                                    onChange={(e) => setFolderPath(e.target.value)}
                                />
                                <Form.Control
                                    type='text'
                                    placeholder="Введите название фильма"
                                    size='lg'
                                    className="mt-3"
                                    onChange={(e) => setMovieName(e.target.value)}
                                />
                            </Form>
                            <Button onClick={handleWatchClick} size='lg' style={{ radius: 2000, backgroundColor: '#E84A5F', color: 'white', width: '100%' }} className='mt-3' variant={"outline-succes"}>
                                Смотреть
                            </Button>
                            {videoUrl && <ReactPlayer url={videoUrl} controls={true} />}
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }

};

export default FilmPage;