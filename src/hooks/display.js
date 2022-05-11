import React, { useState, useEffect } from "react";
import { useResults } from "../api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button, Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ControlledForm from "../components/UserForm";

const columns = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Country", field: "country" },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion" }
]

export default function Display() {
    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();
    const { volcanoes } = useResults();

    useEffect(() => {
        volcanoes.map(volcano => {
            return {
                id: volcano.id,
                name: volcano.name,
                country: volcano.country,
                region: volcano.region,
                subregion: volcano.subregion
            };
        })
            .then(volcanoes => setRowData(volcanoes));
    }, []);
    useEffect(() => {
        volcanoes
            .then(volcanoes => setRowData(volcanoes));
    }, []);

    return (
        <div className="container">
            <h2>Volcano List</h2>

            <ControlledForm />

            <p>
                <Badge color="success">{rowData.length}</Badge>
                Volcanoes found in Japan
            </p>

            <div
                className="ag-theme-balham"
                style={{
                    height: "300px"
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={7}
                    onRowClicked={(row) => navigate(`/volcano?title=${row.data.title}`)}
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
