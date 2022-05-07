import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button, Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";

const columns = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Country", field: "country", sortable: true, filter: true },
    { headerName: "Region", field: "region", sortable: true, filter: true },
    { headerName: "Subregion", field: "subregion", sortable: true, filter: true },
    { headerName: "Last Eruption", field: "last_eruption", sortable: true, filter: true },
    { headerName: "Summit", field: "summit", sortable: true, filter: true },
    { headerName: "Elevation", field: "elevation", sortable: true, filter: true },
    { headerName: "Latitude", field: "latitude", sortable: true, filter: true },
    { headerName: "Longitude", field: "longitude", sortable: true, filter: true },
    { headerName: "Population per 5km", field: "population_5km", sortable: true, filter: true },
    { headerName: "Population per 10km", field: "population_10km", sortable: true, filter: true },
    { headerName: "Population per 30km", field: "population_30km", sortable: true, filter: true },
    { headerName: "Population per 100km", field: "population_100km", sortable: true, filter: true }
]

export default function VolcanoList() {
    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://sefdb02.qut.edu.au:3001/#/Data/get_volcano/id{1}")
            .then(res => res.json())
            .then(data => data.works)
            .then(works =>
                works.map(volcano => {
                    return {
                        name: volcano.name,
                        country: volcano.country,
                        region: volcano.region,
                        id: volcano.cover_id
                    };
                })
            )
            .then(volcanoes => setRowData(volcanoes));
    }, []);

    return (
        <div className="VolcanoList">
            <h2>Volcano List</h2>
            <p>
                <Badge color="success">{rowData.length}</Badge>
                Volcanoes Found
            </p>

            <div
                className="ag-theme-balham"
                style={{
                    height: "300px",
                    width: "800px"
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={7}
                    onRowClicked={(row) => navigate(`/volcano?name=${row.data.name}`)}
                />
            </div>

            <Button color="info"
                size="sm"
                className="mt-3"
                href="http://sefdb02.qut.edu.au:3001/"
                target="_blank"
            >
                Go to Volcanoes around the world API
            </Button>
        </div>
    );
}
