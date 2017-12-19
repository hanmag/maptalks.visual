const layer = new maptalks.VectorLayer('vector').addTo(map);

const line = new maptalks.LineString(
    [
        map.getCenter().sub(0.01, 0),
        map.getCenter().add(0.01, 0),
        map.getCenter().add(0.01, -0.01)
    ], {
        symbol: {
            'lineColor': '#1bbc9b',
            'lineWidth': 6,
            'lineJoin': 'round', //miter, round, bevel
            'lineCap': 'round', //butt, round, square
            'lineDasharray': null, //dasharray, e.g. [10, 5, 5]
            'lineOpacity ': 1
        }
    }
)

baseLayer.on('layerLoad', () => line.addTo(layer));