import { useState, useEffect } from "react";

export function useVolcanoes(countryQuery, distanceQuery) {
    const [loading, setLoading] = useState(true);
    const [volcanoes, setVolcanoes] = useState([]);
    const [error, setError] = useState(null);

    // const COUNTRY_QUERY = "Japan";
    // const DISTANCE_QUERY = 100;

    useEffect(
        () => {
            getVolcanoes(countryQuery, distanceQuery)
                .then((volcanoes) => {
                    setVolcanoes(volcanoes);
                })
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, [countryQuery, distanceQuery]);
    return {
        loading,
        volcanoes,
        error,
    };
}

function getVolcanoes(cq, dq) {
    const url = `http://sefdb02.qut.edu.au:3001/volcanoes?country=${cq}&populatedWithin=${dq}km`;

    return fetch(url)
        .then((res) => res.json())
        .then((volcanoes) =>
            volcanoes.map((volcano) => ({
                id: volcano.id,
                name: volcano.name,
                country: volcano.country,
                region: volcano.region,
                subregion: volcano.subregion
            }))
        );
}

export function useVolcano(idQuery) {
    const [loading, setLoading] = useState(true);
    const [volcano, setVolcano] = useState([]);
    const [error, setError] = useState(null);

    const ID_QUERY = "1";

    useEffect(
        () => {
            getVolcano(idQuery)
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

function getVolcano(iq) {
    const url = `http://sefdb02.qut.edu.au:3001/volcano/${iq}`;

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
                longitude: volcano.longitude,
                population_5km: volcano.population_5km,
                population_10km: volcano.lopopulation_10kmngitude,
                population_30km: volcano.population_30km,
                population_100km: volcano.population_100km
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
                .then((res) => {
                    setCountries(res);
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
        .then((res) => res.json());
}