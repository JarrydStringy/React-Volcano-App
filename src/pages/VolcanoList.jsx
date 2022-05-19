import React from "react";
import { useVolcanoes } from "../api";
import DisplayVolcanoes from "../hooks/DisplayVolcanoes";

export default function VolcanoList() {
    const { loading, error } = useVolcanoes();

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    return (
        <div className="VolcanoList">
            <h2>Volcanoes</h2>
            <DisplayVolcanoes />
        </div>
    );
}
