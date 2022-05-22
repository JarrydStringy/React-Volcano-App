import React, { useState } from "react"
import { Input, Button } from "reactstrap"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate();
    const API_URL = "http://sefdb02.qut.edu.au:3001"

    function login() {
        const url = `${API_URL}/user/login`

        return fetch(url, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setError(res.message)
                } else {
                    setError(null)
                    setSuccess("Login successful")
                }
                console.log(res)

                if (res.token !== undefined) {
                    localStorage.setItem("token", res.token)
                    navigate(`/`);
                    window.location.reload(false)
                }
            })
    }

    return (
        <div>
            <h1 >Login</h1>

            {error != null ? (
                <p >{error}</p>
            ) : null}

            {success != null ? (
                <p >{success}</p>
            ) : null}

            <Input
                aria-labelledby="login-button"
                placeholder="Email"
                name="email"
                id="email"
                type="text"
                value={emailValue}
                onChange={(e) => {
                    setEmailValue(e.target.value)
                }}
            ></Input>

            <Input
                aria-labelledby="login-button"
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                value={passwordValue}
                onChange={(e) => {
                    setPasswordValue(e.target.value)
                }}
            ></Input>

            <Button type="button" onClick={login}>
                Submit
            </Button>

            <p>
                Not a member?{" "}
                <a href="/register">
                    Click here to register now!
                </a>
            </p>
        </div>
    )
}