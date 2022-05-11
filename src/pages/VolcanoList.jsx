import React from "react";
import { useResults } from "../api";
import Display from "../hooks/display";

export default function VolcanoList() {
    const { loading, error } = useResults();

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    return (
        <div className="VolcanoList">
            <h2>Volcanoes</h2>
            <Display />
        </div>
    );
}