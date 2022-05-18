import { useState } from "react";
import ReactSelectAutocomplete from "./ReactSelectAutocomplete";
import VanillaDropdown from "./VanillaDropdown";
import { useCountries } from "../api";

export default function SearchBar(props) {
    const { countries } = useCountries();
    const distances = ["5km", "10km", "30km", "100km"];
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedDistance, setSelectedDistance] = useState("");

    return (
        <div>
            <ReactSelectAutocomplete
                options={countries}
                label="Country"
                isSearchable={true}

                aria-labelledby="search-countries"
                name="search"
                id="search"
                type="search"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
            />
            <VanillaDropdown
                options={distances}
                label="Distance Within Range"
                aria-labelledby="search-distances"

                name="search"
                id="search"
                type="search"
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
            />
            <button
                id="search-button"
                type="button"
                onClick={() => props.onSubmit(selectedCountry)}
            >
                Search
            </button>
        </div>
    );
}