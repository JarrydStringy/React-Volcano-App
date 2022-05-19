import React from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVolcano } from "../api";
import { MyMap } from "../hooks/Map";
import { BarChart } from "../components/BarChart";

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
            <p>Latitude: {volcano.latitude}</p>
            <p>Longitude: {volcano.longitude}</p>
            <p>population_5km: {volcano.population_5km}</p>
            <p>population_10km: {volcano.population_10km}</p>
            <p>population_30km: {volcano.population_30km}</p>
            <p>population_100km: {volcano.population_100km}</p>

            <MyMap id />

            <BarChart id />

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
