import React, { useState } from 'react';
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVolcano } from "../api";
import { BarChart } from "../components/BarChart";
import { Map, Marker, ZoomControl } from "pigeon-maps";
// import { MyMap } from "../hooks/DisplayMap";

export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { loading, volcano, error } = useVolcano(id);

    function MyMap() {
        const latitude = parseFloat(volcano.latitude);
        const longitude = parseFloat(volcano.longitude);
        const [center, setCenter] = useState([latitude, longitude])
        const [zoom, setZoom] = useState(11)
        return (
            <div>
                <Map
                    dprs={[1, 2]} // add this to support hidpi/retina (2x) maps if your provider supports them
                    height={400}
                    width={600}
                    center={center}
                    zoom={zoom}
                    onBoundsChanged={({ center, zoom }) => {
                        setCenter(center)
                        setZoom(zoom)
                    }}
                >
                    <Marker
                        width={50}
                        anchor={[latitude, longitude]}
                    />
                    <ZoomControl />
                </Map >
            </div>
        )
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    return (
        <div className="volcano">
            <h2>{volcano.name}</h2>
            <p>Country: {volcano.country}</p>
            <p>Region: {volcano.region}</p>
            <p>Subregion: {volcano.subregion}</p>
            <p>Last Eruption: {volcano.last_eruption}</p>
            <p>Summit: {volcano.summit}</p>
            <p>Elevation: {volcano.elevation}</p>

            <MyMap />

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
