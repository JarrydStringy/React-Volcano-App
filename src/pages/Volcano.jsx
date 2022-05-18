import React from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Map, Marker } from "pigeon-maps"

export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const country = searchParams.get("country");
    const region = searchParams.get("region");
    const subregion = searchParams.get("subregion");
    const last_eruption = searchParams.get("last_eruption");
    const summit = searchParams.get("summit");
    const elevation = searchParams.get("elevation");

    function MyMap() {
        return (
            <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                <Marker width={50} anchor={[50.879, 4.6997]} />
            </Map>
        )
    }

    return (
        <div className="volcano">
            <h2>{name}</h2>
            <p>Country: {country}</p>
            <p>Region: {region}</p>
            <p>Subregion: {subregion}</p>
            <p>Last Eruption: {last_eruption}</p>
            <p>Summit: {summit}</p>
            <p>Elevation: {elevation}</p>

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
