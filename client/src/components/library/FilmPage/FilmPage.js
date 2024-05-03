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
    const [videoUrl, setVideoUrl] = useState('');
    const [filmName, setFilmName] = useState('');

    const handleWatchChange = (e) => {
        const file = e.target.files[0];

        if (file.type.startsWith('video')) {
            setVideoUrl(URL.createObjectURL(file));
            setFilmName(file.name);

            const selectedFileName = file.name; // переменная для имени выбранного фильма
            const filmInDB = film?.Requests[0]?.FilePath; // имя фильма из базы данных

            if (selectedFileName === filmInDB) {
                setModalUpdateActive(false);
                setModalFilmActive(true);
            } else {
                alert('Пожалуйста выберите нужный фильм');
            }
        } else {
            alert('Пожалуйста выберите Ваш фильм');
        }
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
    console.log(film?.Requests[0]?.FilePath);
    console.log(filmName);

    const [modalUpdateFilm, setModalUpdateActive] = useState(false);
    const [modalFilm, setModalFilmActive] = useState(false);
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
                        <Button onClick={() => setModalUpdateActive(true)} size='lg' style={{ radius: 2000, backgroundColor: '#E84A5F', color: 'white', width: '100%' }} className='mt-3' variant={"outline-succes"}>
                            Смотреть
                        </Button>
                        <Modal active={modalUpdateFilm} setActive={setModalUpdateActive}>
                            <Form>
                                <Form.Control
                                    type='file'
                                    placeholder="Введите путь к папке"
                                    size='lg'
                                    className="mt-3"
                                    onChange={handleWatchChange}
                                />
                            </Form>
                        </Modal>
                        <Modal active={modalFilm} setActive={setModalFilmActive}>
                            <ReactPlayer url={videoUrl} controls={true} />
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }

};

export default FilmPage;