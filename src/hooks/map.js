import React, { useState } from 'react'
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { stamenTerrain } from 'pigeon-maps/providers'

const MAPTILER_ACCESS_TOKEN = 'QqxLQvI2hmWaPXWzSLxM'
const MAP_ID = 'Topo'

function mapTiler(x, y, z, dpr) {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=${MAPTILER_ACCESS_TOKEN}`
}

export function MyMap() {
    const [center, setCenter] = useState([36.204, 138.252])
    const [zoom, setZoom] = useState(11)
    return (
        <div>
            <Map
                provider={stamenTerrain}
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
                    anchor={[36.204, 138.252]}
                />
                <ZoomControl />
            </Map >
        </div>
    )
}