import React, { useState } from "react"
import { Input, Button } from "reactstrap"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const API_URL = "http://sefdb02.qut.edu.au:3001";

    function register() {
        const url = `${API_URL}/user/register`

        return fetch(url, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setError(res.message)
                    setSuccess(null)
                } else {
                    setSuccess("User successfully registered")
                    setError(null)
                }
                console.log(res)
            })
    }

    return (
        <div>
            <h1>Register</h1>

            {error != null ? (
                <p>{error}</p>
            ) : null}

            {success != null ? (
                <p>{success}</p>
            ) : null}

            <Input
                aria-labelledby="register-button"
                placeholder="Email"
                name="email"
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            ></Input>

            <Input
                aria-labelledby="register-button"
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            ></Input>

            <Button
                id="register-button"
                type="button"
                onClick={register}
            >
                Submit
            </Button>

            <p>
                Already a member?{" "}
                <a href="/Login">
                    Click here to Login!
                </a>
            </p>
        </div>
    )
}