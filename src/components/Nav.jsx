import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

// navigation links
export default function Nav() {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [])

    if (!loggedIn) {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/volcanolist">Volcano List</Link>
                    </li>
                </ul>
            </nav >
        );
    }
    else {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                    <li>
                        <Link to="/volcanolist">Volcano List</Link>
                    </li>
                </ul>
            </nav >
        );
    }
}
