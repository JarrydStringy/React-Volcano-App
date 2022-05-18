import { useState } from "react";
import ReactSelectAutocomplete from "./ReactSelectAutocomplete";
import VanillaDropdown from "./VanillaDropdown";

export default function SearchBar() {
    const countries = ["Country1", "Country1", "Country1", "Country1", "Country1"];
    const distances = ["5km", "10km", "30km", "100km"];
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedDistance, setSelectedDistance] = useState();

    return (
        <div>
            <ReactSelectAutocomplete
                options={countries}
                label="Country"
                isSearchable={true}
                onChange={setSelectedCountry}
            />
            <VanillaDropdown
                options={distances}
                label="Distance Within"
                onChange={setSelectedDistance}
            />

            <button>Search</button>

        </div>
    );
}


{/* <hr />
            <h3>Selection:</h3>
{ selectedCar ? <p>Last selected car is: {selectedCar}</p> : null } */}