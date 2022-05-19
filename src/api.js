import { useState, useEffect } from "react";

export function useVolcanoes() {
    const [loading, setLoading] = useState(true);
    const [volcanoes, setVolcanoes] = useState([]);
    const [error, setError] = useState(null);

    const COUNTRY_QUERY = "Japan";
    const DISTANCE_QUERY = 100;

    useEffect(
        () => {
            getVolcanoes(COUNTRY_QUERY, DISTANCE_QUERY)
                .then((volcanoes) => {
                    setVolcanoes(volcanoes);
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

export function useVolcano() {
    const [loading, setLoading] = useState(true);
    const [volcano, setVolcano] = useState([]);
    const [error, setError] = useState(null);

    const ID_QUERY = 1;

    useEffect(
        () => {
            getVolcano(ID_QUERY)
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
        .then((res) => res.json());
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