import React from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Map, Marker } from "pigeon-maps"

export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const country = searchParams.get("country");

    function MyMap() {
        return (
            <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                <Marker width={50} anchor={[50.879, 4.6997]} />
            </Map>
        )
    }

    return (
        <div className="volcano">
            <h2>Individual Volcano</h2>
            <p>The volcano that you selected was: {name}</p>
            <p>It can be found in: {country}</p>

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
