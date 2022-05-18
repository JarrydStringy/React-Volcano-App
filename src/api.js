import { useState, useEffect } from "react";

export function useResults(countryQuery) {
    const [loading, setLoading] = useState(true);
    const [volcanoes, setVolcanoes] = useState([]);
    const [error, setError] = useState(null);

    const COUNTRY_QUERY = "Japan";
    const DISTANCE_QUERY = 100;

    useEffect(
        () => {
            getVolcanoByQuery(countryQuery, DISTANCE_QUERY)
                .then((volcanoes) => {
                    setVolcanoes(volcanoes);
                })
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, [countryQuery]);
    return {
        loading,
        volcanoes,
        error,
    };
}

function getVolcanoByQuery(cq, dq) {
    const url = `http://sefdb02.qut.edu.au:3001/volcanoes?country=${cq}&populatedWithin=${dq}km`;

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