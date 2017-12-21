function getColor() {
    var i = Math.random() * 3;
    if (i < 1) {
        return '#ff9900';
    } else if (i < 2) {
        return '#cc0000';
    } else {
        return '#ffcc00';
    }
}

var vl = new maptalks.VectorLayer('id').addTo(map);
const xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const features = JSON.parse(this.responseText);
        var warr = [];
        features.features.forEach(function (g) {
            warr.push([g.geometry.coordinates, {
                'type': 0
            }]);
        });
        new maptalks.BigLineLayer('2013', warr, {}).setStyle([{
            symbol: {
                lineColor: 'rgba(66,63,45, 0.1)',
                lineWidth: 2
            }
        }]).addTo(map).bringToBack();
    }
};


const xhttp3 = new XMLHttpRequest();
xhttp3.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const features = JSON.parse(this.responseText);
        var warr = [];
        features.forEach(function (g) {
            var arr = [];
            for (var i = 0; i < g.segments.length - 1; i++) {
                arr.push({
                    "coordinates": [
                        g.segments[i], g.segments[i + 1]
                    ],
                    'symbol': {
                        'lineColor': getColor()
                    }
                });
            }
            warr.push(arr);
        });

        // var clayer = new maptalks.ODLineLayer('c', warr, {
        //     'animationDuration': 200,
        //     'animation': true,
        //     // 'curveness': 0,
        //     'random': true,
        //     'trail': 25,
        // }).addTo(map);
    }

};

function loadRoutes() {
    xhttp2.open("GET", "./data/deck_roads.json", true);
    xhttp2.send();
    xhttp3.open("GET", "./data/deck_trips.json", true);
    xhttp3.send();
}