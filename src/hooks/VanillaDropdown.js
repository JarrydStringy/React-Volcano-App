import React, { useState } from "react";

const VanillaDropdown = ({ options, label, onChange }) => {
    const [selected, setSelected] = useState(label);
    const handleSelection = (selection) => {
        setSelected(selection);
        if (onChange) {
            onChange(selection);
        }
    };

    return (
        <select
            defaultValue={selected}
            onChange={(event) => handleSelection(event.target.value)}
        >
            <option value={selected} disabled hidden>
                {selected}
            </option>
            {options.map((option) => (
                <option key={option}>{option}</option>
            ))}
        </select>
    );
};

export default VanillaDropdown;
