import React from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVolcano } from "../api";
import { MyMap } from "../hooks/map";

export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { loading, volcano, error } = useVolcano(id);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    return (
        <div className="volcano">
            <h2>{volcano.name} {id}</h2>
            <p>Country: {volcano.country}</p>
            <p>Region: {volcano.region}</p>
            <p>Subregion: {volcano.subregion}</p>
            <p>Last Eruption: {volcano.last_eruption}</p>
            <p>Summit: {volcano.summit}</p>
            <p>Elevation: {volcano.elevation}</p>

            <MyMap />

            <Button
                color="info"
                size="sm"
                className="mt-3"
                onClick={() => navigate("/volcanolist")}
            >
                Back
            </Button>
        </div>
    );
}
