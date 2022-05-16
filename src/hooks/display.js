import React, { useState } from "react";
import { useResults } from "../api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button, Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Country", field: "country" },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion" }
]

export default function Display() {
    const navigate = useNavigate();
    const { volcanoes } = useResults();

    return (
        <div className="container">
            <div>
                <SearchBar />
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
                    onRowClicked={(row) => navigate(`/volcano?id=${row.data.id}`)}
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
