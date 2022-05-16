import React, { useState } from "react";

const API_URL = "http://sefdb02.qut.edu.au:3001";

export default function Login() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    function login() {
        const url = `${API_URL}/user/login`;

        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("token", res.token);
            });
    }

    function open() {
        const url = `${API_URL}/volcano/1`;
        const token = localStorage.getItem("token");
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        fetch(url, { headers })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }



    function ControlledForm() {
        return (
            <div className="UserForm">
                <form>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </form>
            </div>
        )
    }



    return (
        <div className="Login">
            <h2>Login</h2>
            <ControlledForm />
            <button onClick={login}>Login</button>
        </div>
    );
}