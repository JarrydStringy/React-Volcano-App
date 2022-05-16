import React, { useState } from "react";
import Select from "react-select";

export default function ReactSelectAutocomplete({ options, label, onChange }) {
    const [selected, setSelected] = useState(label);
    const formattedOptions = options.map((option) => ({
        value: option,
        label: option
    }));

    const handleSelection = (selection) => {
        setSelected(selection);
        onChange(selection.value);
    };

    return (
        <Select
            defaultValue={selected}
            onChange={handleSelection}
            options={formattedOptions}
            placeholder={label}
        />
    );
}
