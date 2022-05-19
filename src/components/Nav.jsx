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
