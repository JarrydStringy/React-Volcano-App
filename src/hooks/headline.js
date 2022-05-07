import React from "react";

//Created in Prac 2 
export default function Headline(props) {
    return (
        <div className="Headline">
            <h3>{props.id}</h3>
            <h3>{props.name}</h3>
            <h3>{props.country}</h3>
            <h3>{props.region}</h3>
            <h3>{props.subregion}</h3>
        </div>
    );
}