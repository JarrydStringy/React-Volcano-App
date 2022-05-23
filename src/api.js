import { useState, useEffect } from "react";

const API_URL = "http://sefdb02.qut.edu.au:3001";

export function useVolcanoes(countrySearch, distanceSearch) {
    const [loading, setLoading] = useState(true);
    const [volcanoes, setVolcanoes] = useState([]);
    const [error, setError] = useState(null);

    // const COUNTRY_QUERY = "Japan";
    const DISTANCE_QUERY = 100;

    useEffect(
        () => {
            getVolcanoes(countrySearch, DISTANCE_QUERY)
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
    const url = API_URL + `/volcanoes?country=${cq}&populatedWithin=${dq}km`;

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

export function useVolcano(id) {
    const [loading, setLoading] = useState(true);
    const [volcano, setVolcano] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            getVolcano(id)
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
    const url = API_URL + `/volcano/${iq}`;
    const token = localStorage.getItem("token")
    const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }

    return fetch(url, { headers })
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
    const url = API_URL + `/countries`;

    return fetch(url)
        .then((res) => res.json());
}

export function useUser() {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    function parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    useEffect(() => {
        if (getToken()) {
            const local_token = localStorage.getItem('token');
            const expiry = parseJwt(local_token).exp;
            const current_time_in_epoch = Math.round(Date.now() / 1000)

            if (current_time_in_epoch < expiry) {
                setToken(local_token);
                setSuccess("Logged in succesfully!");
                setError(null);
            } else {
                console.log("Token expired.");
            }
        }
    }, []);
    return {
        token, setToken,
        error, setError,
        success, setSuccess
    };
}

function getToken() {
    const url = API_URL + "/user/login";

    try {
        const res = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                email: "mike@gmail.com",
                password: "password",
            })
        });

        const json = res.json();
        const token = json.token;

        return { error: false, token: token };
    } catch {
        return { error: true, message: "Failed to get token" };
    }
}