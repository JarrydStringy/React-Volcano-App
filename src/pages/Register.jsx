import React, { useState } from "react";

export default function Register() {
    return (
        <div className="Register">
            <h2>Register</h2>
            <ControlledForm />
        </div>
    );
}

function ControlledForm() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    return (
        <div className="Form">
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