const MAPTILER_ACCESS_TOKEN = 'QqxLQvI2hmWaPXWzSLxM'
const MAP_ID = 'Topo'

function mapTiler(x, y, z, dpr) {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=${MAPTILER_ACCESS_TOKEN}`
}

return (
    <Map
        provider={mapTiler}
        dprs={[1, 2]} // add this to support hidpi/retina (2x) maps if your provider supports them
        height={300}
        defaultCenter={[50.879, 4.6997]}
        defaultZoom={11}
    />
)