import { useEffect, useState } from 'react';
import ControlledForm from '../components/UserForm';

const API_URL = "http://sefdb02.qut.edu.au:3001";

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

async function getToken() {
    const url = `${API_URL}/user/login`;

    try {
        const res = await fetch(url, {
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

        const json = await res.json();
        const token = json.token;

        return { error: false, token: token };
    } catch {
        return { error: true, message: "Failed to get token" };
    }
}

export default function Login() {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const login = async () => {
        const token = await getToken()
        console.log(token);
        if (token.error) {
            console.log(token.message);
            setError(token.message);
            setSuccess("Incorrect: Try Again.");
            setToken(null);
        } else {
            setToken(token.token);
            localStorage.setItem('token', token.token);
            setSuccess("Logged in succesfully!");
            setError(null);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
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

    return (
        <div>
            <div className="UserForm">
                <form>
                    <h2>Login</h2>

                    <ControlledForm />

                    <button onClick={login}>Login</button>
                    {success && <p> {success} </p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
}