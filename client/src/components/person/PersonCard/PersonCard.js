import React from "react";
import './PersonCard-CSS.css';
import { useNavigate } from "react-router-dom";

const PersonCard = ({ person }) => {
    const navigate = useNavigate();
    const handlePersonClick = () => {
        navigate(`/person/${person.id}`)
    };

    return (
        <div class="person-card" onClick={handlePersonClick}>
            <img class="person-img" src={person.photo || 'https://barnaul126.gosuslugi.ru/netcat_files/42/180/person_79.jpg'} alt={person.name || person.enName} />
            <h3 class="person-inicial">{person.name || person.enName}</h3>
            <p class="person-profession">{person.profession || person.enProfession}</p>
        </div>
    );
};
export default PersonCard;