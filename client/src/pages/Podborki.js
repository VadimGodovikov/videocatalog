import React from "react";
import TopFamily from "../components/podborki/TopFamily/TopFamily";
import TopTheBest from "../components/podborki/TopTheBest/TopTheBset";
import TopHorror from "../components/podborki/TopHorror/TopHorror";

const Podborki = () => {
    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>Подборки</h1>
            <TopTheBest />
            <br />
            <br />
            <TopFamily />
            <br />
            <br />
            <TopHorror />
        </div>
    );
};

export default Podborki;