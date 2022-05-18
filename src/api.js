import { useState, useEffect } from "react";

export function useVolcanoes(countryQuery) {
    const [loading, setLoading] = useState(true);
    const [volcanoes, setVolcanoes] = useState([]);
    const [error, setError] = useState(null);

    const COUNTRY_QUERY = "Japan";
    const DISTANCE_QUERY = 100;

    useEffect(
        () => {
            getVolcanoesByQuery(countryQuery, DISTANCE_QUERY)
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

function getVolcanoesByQuery(cq, dq) {
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

export function useCountries() {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            getCountries()
                .then((countries) => {
                    setCountries(countries);
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
        countries,
        error,
    };
}

function getCountries() {
    const url = `http://sefdb02.qut.edu.au:3001/countries`;

    return fetch(url)
        .then((res) => res.json())
        .then((countries) =>
            countries.map((country) => ({
                id: country.id
            }))
        );
}