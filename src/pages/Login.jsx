import React from "react";
import { useUser } from "../api";
import UserForm from '../hooks/UserForm';

export default function Login() {
    const [token, setToken] = useUser(null);
    const [error, setError] = useUser(null);
    const [success, setSuccess] = useUser(null);
    const API_URL = "http://sefdb02.qut.edu.au:3001";

    const login = async () => {
        // const token = await getToken()
        console.log(token);
        if (token.error) {
            console.log(token.message);
            setError(token.message);
            setSuccess(null);
            setToken(null);
        } else {
            setToken(token.token);
            localStorage.setItem('token', token.token);
            setSuccess("Logged in succesfully!");
            setError(null);
        }
    }

    return (
        <div>
            <div className="UserForm">
                <form>
                    <h2>Login</h2>

                    <UserForm />

                    <button onClick={login}>Login</button>
                    {success && <p> {success} </p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
}

