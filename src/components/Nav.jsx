import React from "react";
import { Link } from "react-router-dom";

// navigation links
export default function Nav() {
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
