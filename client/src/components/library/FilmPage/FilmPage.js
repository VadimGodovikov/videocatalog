import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import shablonphoto from '../../img/shablonphoto.png'
import Modal from "../Modal/Modal";
import { Button } from "react-bootstrap";

const FilmPage = () => {
    const { filmId } = useParams();
    const [film, setFilmData] = useState(null);

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const filmData = await axios.get(`http://localhost:5000/api/movie/film/${filmId}`);

                setFilmData(filmData.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchFilm();
    }, [filmId]);

    const localURL = localStorage.getItem('localFilmURL');
    console.log(localURL);
    console.log(film);

    const [modalVideo, setModalVideoActive] = useState(false);
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
                        <video width="750" height="500" controls src={film?.FilePath} />
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default FilmPage;