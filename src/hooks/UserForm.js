import { useState } from "react";

export default function UserForm() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    return (
        <div className="UserForm">
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
        </div>
    )
}