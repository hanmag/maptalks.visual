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

function loadTraffic() {
    const scene = threeLayer.getScene();
    const camera = threeLayer.getCamera();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }
    var resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    var materials = [];
    [0xff0000, 0xffff00, 0x00ff00].forEach(function (color) {
        materials.push(new MeshLineMaterial({
            useMap: false,
            color: new THREE.Color(color),
            opacity: 1,
            resolution: resolution,
            sizeAttenuation: false,
            lineWidth: 4,
            near: camera.near,
            far: camera.far,
            depthWrite: false,
            depthTest: true,
            alphaTest: false,
            transparent: true,
            side: THREE.DoubleSide
        }));
    });


    var group = new THREE.Group();
    group.position.set(-27591426, -16661503, 0);
    for (var k = 0; k < testTrace2.length; k++) {
        var rt = testTrace2[k];
        for (var i = 0; i < rt.length - 1; i++) {
            var v1 = threeLayer.coordinateToVector3(new maptalks.Coordinate(rt[i]));
            var v2 = threeLayer.coordinateToVector3(new maptalks.Coordinate(rt[i + 1]));
            var g = new MeshLine();
            var geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(v1.x + 27591426, v1.y + 16661503, 0),
                new THREE.Vector3(v2.x + 27591426, v2.y + 16661503, 0));
            g.setGeometry(geometry);

            var mesh = new THREE.Mesh(g.geometry, materials[Math.floor(Math.random() * 3)]);
            group.add(mesh);
        }
    }

    // var rt = testTrace2[0];
    // for (var i = 0; i < 50; i++) {
    //     var v1 = threeLayer.coordinateToVector3(new maptalks.Coordinate(rt[i]));
    //     var v2 = threeLayer.coordinateToVector3(new maptalks.Coordinate(rt[i + 1]));
    //     var g = new MeshLine();
    //     var geometry = new THREE.Geometry();

    //     geometry.vertices.push(new THREE.Vector3(v1.x + 27591426, v1.y + 16661503, 0),
    //         new THREE.Vector3(v2.x + 27591426, v2.y + 16661503, 0));
    //     g.setGeometry(geometry);

    //     var mesh = new THREE.Mesh(g.geometry, new MeshLineMaterial({
    //         map: new THREE.TextureLoader().load("./textures/daohang.jpg"),
    //         useMap: true,
    //         opacity: 1,
    //         // color: new THREE.Color(0x7CCD7C),
    //         repeat: new THREE.Vector2(3, 1),
    //         resolution: resolution,
    //         sizeAttenuation: false,
    //         lineWidth: 20,
    //         near: camera.near,
    //         far: camera.far,
    //         depthWrite: false,
    //         depthTest: true,
    //         alphaTest: false,
    //         transparent: true,
    //         side: THREE.DoubleSide
    //     }));
    //     group.add(mesh);
    // }

    scene.add(group);
}