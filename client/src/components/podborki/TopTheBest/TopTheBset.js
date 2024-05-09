import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, API_KEY } from "../../../utils/consts";
import SliderForPodborki from "../SliderForPodborki";

const TopTheBest = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try{
                const moviesData = await axios.get(`${API_URL}/movie?lists=top250&limit=250`, {
                    headers: {
                        'X-API-KEY': API_KEY
                    }
                })
                setMovies(moviesData.data.docs)
            }
            catch(error){
                console.error(error)
            }
        };
        fetchMovie();
    }, []);
    return (
        <div>
            <h2 style={{ fontSize: 24, marginTop: 58 }}>Топ лучших 250 фильмов</h2>
            <SliderForPodborki movies={movies} key={movies}/>
        </div>

    );
};

export default TopTheBest;