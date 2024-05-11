import React from "react";
import '../../person/PersonCard/PersonCard-CSS.css';
import { useNavigate } from "react-router-dom";
import shablonphoto from '../../img/shablonphoto.png'

const ActorsCard = ({ person }) => {
    const navigate = useNavigate();
    const handlePersonClick = () => {
        navigate(`/actor/${person.ID_Person}`)
    };

    return (
        <div class="person-card" onClick={handlePersonClick}>
            <img class="person-img" src={person.Photo || shablonphoto} alt={person.Name || 'Неизвестно'} />
            <h3 class="person-inicial">{person.Name || 'Неизвестно'}</h3>
            <p class="person-profession">{person.Post}</p>
        </div>
    );
};
export default ActorsCard;