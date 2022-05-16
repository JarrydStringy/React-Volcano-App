import React from "react";
import ControlledForm from "../components/UserForm";

const API_URL = "http://sefdb02.qut.edu.au:3001";

export default function Login() {
    function login() {
        const url = `${API_URL}/user/login`;

        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: "n9734074@qut.edu.au", password: "password" })
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("token", res.token);
            });
    }

    function open() {
        const url = `${API_URL}/volcano/3`;
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

    return (
        <div className="Login">
            <h2>Login</h2>
            <ControlledForm />
            <button onClick={login}>Login</button>
        </div>
    );
}
