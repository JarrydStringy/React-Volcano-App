import React, { useState } from "react";
import { useVolcanoes } from "../api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button, Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const columns = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Region", field: "region", sortable: true, filter: true },
    { headerName: "Subregion", field: "subregion", sortable: true, filter: true }
]

export default function Display() {
    const [countrySearch, setCountrySearch] = useState("Japan");
    const [distanceSearch, setDistanceSearch] = useState("100km");
    const navigate = useNavigate();
    const { volcanoes } = useVolcanoes(countrySearch);

    return (
        <div className="container">
            <div>
                <SearchBar onSubmit={setCountrySearch} />
            </div>

            <p>
                <Badge color="success">{volcanoes.length}</Badge>
                Volcanoes found in Japan
            </p>

            <div
                className="ag-theme-balham"
                style={{
                    height: "400px"
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={volcanoes}
                    pagination={true}
                    paginationPageSize={12}
                    onRowClicked={(row) => navigate(
                        `/volcano?name=${row.data.name}`
                    )}
                />
            </div>

            <Button color="info"
                size="sm"
                className="mt-3"
                href="http://sefdb02.qut.edu.au:3001/"
                target="_blank"
            >
                Go to Open Library API
            </Button>
        </div>
    );
}