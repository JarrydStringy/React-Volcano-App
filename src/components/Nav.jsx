import React from "react";
import { Link } from "react-router-dom";

// navigation links
export default function Nav() {
    const token = localStorage.getItem("token");

    if (!token) {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/volcanolist">Volcano List</Link>
                    </li>
                </ul>
            </nav>
        );
    }
    else {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                        <Link to="/logout">Logout</Link>
                        <Link to="/volcanolist">Volcano List</Link>
                    </li>
                </ul>
            </nav>
        );
    }

}
