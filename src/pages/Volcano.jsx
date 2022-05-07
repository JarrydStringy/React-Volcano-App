import React from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const volcano = searchParams.get("volcano");

    return (
        <div className="volcano">
            <h2>Individual Volcano</h2>
            <p>The volcano that you selected was: {volcano}</p>
            <Button
                color="info"
                size="sm"
                className="mt-3"
                onClick={() => navigate("/volcanolist")}
            >
                Back
            </Button>
        </div>
    );
}
