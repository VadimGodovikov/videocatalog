import React from "axios";
import { Carousel, CarouselItem, Stack, Card } from "react-bootstrap";
import '../../person/PersonSlider/PersonSlider-CSS.css'
import ActorsCard from "../ActorsCard/ActorsCard";

const ActorsSlider = ({ persons }) => {
    return (
        <div className="persons-slider">
            <h2 class="persons-title">Актёры и режиссёры</h2>
            <Carousel interval={5000} indicators={false}>
                {[...Array(Math.ceil(persons.length / 5))].map((_, index) => (
                    <CarouselItem key={index}>
                        <Stack direction="horizontal" className="h-100 justify-content-center align-items-down" gap={5}>
                            {persons.slice(index * 5, (index + 1) * 5).map(person => (
                                <Card key={person.ID_Person} style={{ border: 0 }}>
                                    <ActorsCard person={person} />
                                </Card>
                            ))}
                        </Stack>
                    </CarouselItem>
                ))}
            </Carousel>
        </div>
    );
};

export default ActorsSlider;