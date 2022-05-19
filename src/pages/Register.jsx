import React, { useState } from "react";
import UserForm from '../hooks/UserForm';

const API_URL = "http://sefdb02.qut.edu.au:3001";

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function register() {
        const url = `${API_URL}/user/register`;

        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: "n9734074@qut.edu.au", password: "password" })
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    //Need to take results from controlled form and feed them into register

    return (
        <div className="UserForm">
            <h2>Register</h2>
            <UserForm />
            <button onClick={register}>Register</button>
        </div>
    );
}
