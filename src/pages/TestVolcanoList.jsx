import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button, Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";

const columns = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Country", field: "country", sortable: true, filter: true },
    { headerName: "Region", field: "region", sortable: true, filter: true },
    { headerName: "Subregion", field: "subregion", sortable: true, filter: true }
]

export default function Test() {
    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://sefdb02.qut.edu.au:3001/volcanoes?country=Japan&populatedWithin=100km")
            .then(res => res.json())
            .then(data =>
                data.map(volcano => {
                    return {
                        id: volcano.id,
                        name: volcano.name,
                        country: volcano.country,
                        region: volcano.region,
                        subregion: volcano.subregion
                    };
                })
            )
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
                    onRowClicked={(row) => navigate(`/volcano?title=${row.data.id}`)}
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

function ControlledForm() {
    const [country, setCountry] = useState([]);

    return (
        <div className="InputForm">

            <form>
                <label htmlFor="country">Country:</label>
                <input
                    type="text"
                    name="country"
                    id="country"
                    value={country}
                    onChange={(event) => {
                        setCountry(event.target.value);
                    }}
                />
            </form>
        </div>
    )
}
