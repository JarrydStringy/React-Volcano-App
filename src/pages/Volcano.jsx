import React, { useState, useEffect } from 'react';
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVolcano } from "../api";
// import { BarChart } from "../components/BarChart";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { loading, volcano, error } = useVolcano(id);
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [])

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

    function BarChart() {
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart',
                },
            },
        };

        const labels = [
            '5km',
            '10km',
            '30km',
            '100km'
        ];

        const data = {
            labels,
            datasets: [
                {
                    label: 'Population Within Distance',
                    data: [
                        volcano.population_5km,
                        volcano.population_10km,
                        volcano.population_30km,
                        volcano.population_100km
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };

        return (
            <div style={{ width: "600px", margin: "auto auto" }}>
                <Bar options={options} data={data} />
            </div>
        );
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    if (loggedIn) {
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
    } else {
        return (
            <div>
                <p>Please Login to see detailed results.</p>
            </div>
        );
    }
}
