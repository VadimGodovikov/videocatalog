import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, API_KEY } from "../../../utils/consts";
import SliderForPodborki from "../SliderForPodborki";

const TopRomantic = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const moviesData = await axios.get(`${API_URL}/movie?lists=top500&limit=250&genres.name=драма`, {
                    headers: {
                        'X-API-KEY': API_KEY
                    }
                })
                setMovies(moviesData.data.docs)
            }
            catch (error) {
                console.error(error)
            }
        };
        fetchMovie();
    }, []);
    return (
        <div>
            <h2 style={{ fontSize: 24 }}>Самые романтические фильмы для просмотра вдвоём</h2>
            <SliderForPodborki movies={movies} key={movies} />
        </div>

    );
};

export default TopRomantic;