// the ThreeLayer to draw buildings
const threeLayer = new maptalks.ThreeLayer('t', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true
});

function mockMaterials() {
    var materials = [];
    for (var i = 0; i < 30; i++) {
        var loader = new THREE.TextureLoader();
        var texture = loader.load("./textures/" + i + ".jpg");
        texture.wrapS = texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(0.008, 0.008, 0.008);
        var m = new THREE.MeshPhongMaterial({
            map: texture
        });
        materials.push(m);
    }
    return materials;
}

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const features = JSON.parse(this.responseText);

        threeLayer.prepareToDraw = function (gl, scene, camera) {
            const me = this;
            const light = new THREE.PointLight(0xffffff);
            camera.add(light);

            let materials = mockMaterials();

            features.forEach(function (g) {
                // const m = new THREE.MeshPhongMaterial({
                //     color: 0x44777f,
                //     opacity: 0.9
                // });

                const m = [materials[Math.floor(Math.random() * 20)], materials[Math.floor(20 +
                    Math.random() * 10)]];

                g.type = 'Feature';
                g.geometry = {
                    type: 'Polygon',
                    coordinates: [g.polygon]
                };
                const geo = maptalks.GeoJSON.toGeometry(g);
                const mesh = me.toExtrudeMesh(geo, g.height, m, true);
                if (Array.isArray(mesh)) {
                    scene.add.apply(scene, mesh);
                } else {
                    scene.add(mesh);
                }
            });
            map.setPitch(55);
        };
        threeLayer.addTo(map);
    }
};
xhttp.open("GET", "./data/deck_buildings.json", true);
xhttp.send();