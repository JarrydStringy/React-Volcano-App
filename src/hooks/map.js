import React, { useState } from 'react'
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { useVolcano } from '../api'

export function MyMap(id) {
    const { volcano } = useVolcano(id);
    const latitude = parseFloat(volcano.latitude)
    const longitude = parseFloat(volcano.longitude)
    const [center, setCenter] = useState([latitude, longitude])
    const [zoom, setZoom] = useState(11)

    return (
        <div>
            <Map
                dprs={[1, 2]} // add this to support hidpi/retina (2x) maps if your provider supports them
                height={400}
                width={600}
                center={center}
                zoom={zoom}
                onBoundsChanged={({ center, zoom }) => {
                    setCenter(center)
                    setZoom(zoom)
                }}
            >
                <Marker
                    width={50}
                    anchor={[latitude, longitude]}
                />
                <ZoomControl />
            </Map >
        </div>
    )
}