import { useState, useEffect } from "react";

const QUERY = 1;

export function useVolcano() {
    const [loading, setLoading] = useState(true);
    const [volcano, setVolcano] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            getVolcanoByQuery(QUERY)
                .then((volcano) => {
                    setVolcano(volcano);
                })
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, []);
    return {
        loading,
        volcano,
        error,
    };
}

function getVolcanoByQuery(q) {
    const url = `http://sefdb02.qut.edu.au:3001/volcano/${q}`;

    return fetch(url)
        .then((res) => res.json())
        .then((volcanoes) =>
            volcanoes.map((volcano) => ({
                name: volcano.name,
                country: volcano.country,
                region: volcano.region,
                subregion: volcano.subregion,
                last_eruption: volcano.last_eruption,
                summit: volcano.summit,
                elevation: volcano.elevation,
                latitude: volcano.latitude,
                longitude: volcano.longitude
            }))
        );
}