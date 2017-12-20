// the ThreeLayer to draw buildings
const threeLayer = new maptalks.ThreeLayer('t', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true
});

const materials = (function () {
    var materials = [];
    for (var i = 0; i < 5; i++) {
        var loader = new THREE.TextureLoader();
        var texture = loader.load("./textures/" + i + ".jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.0005, 0.002);
        var m = new THREE.MeshPhongMaterial({
            map: texture,
            opacity: 0.9
        });
        materials.push(m);
    }
    return materials;
})();

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const features = JSON.parse(this.responseText);

        threeLayer.prepareToDraw = function (gl, scene, camera) {
            const me = this;
            const light = new THREE.PointLight(0xffffff);
            camera.add(light);

            features.forEach(function (g) {
                // const m = new THREE.MeshPhongMaterial({
                //     color: 0x44777f,
                //     opacity: 0.9
                // });

                const m = [materials[0], materials[Math.floor(Math.random() * materials.length)]];

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
setTimeout(() => {
    xhttp.send();
}, 3000);