// the ThreeLayer to draw buildings
const threeLayer = new maptalks.ThreeLayer('t', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true
});

const materials = (function () {
    const materials = [];
    const loader = new THREE.TextureLoader();
    for (let i = 1; i < 8; i++) {
        const texture = loader.load("./textures/" + i + ".jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.002, 0.002);
        materials.push(new THREE.MeshPhongMaterial({
            map: texture
        }));
    }
    return materials;
})();

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const maxHeight = 200;
        const features = JSON.parse(this.responseText);

        threeLayer.prepareToDraw = function (gl, scene, camera) {
            const me = this;
            const light = new THREE.PointLight(0xffffff);
            camera.add(light);
            const ambientLight = new THREE.AmbientLight(0xa0a6a6); // soft blue-green light
            scene.add(ambientLight);
            const materialDic = {}; // index by height

            features.forEach(function (g) {
                g.type = 'Feature';
                g.geometry = {
                    type: 'Polygon',
                    coordinates: [g.polygon]
                };
                const geo = maptalks.GeoJSON.toGeometry(g);
                const material = materialDic[g.height] ? materialDic[g.height] : materials[Math.floor(Math.random() * materials.length)];
                if (!materialDic[g.height])
                    materialDic[g.height] = material;
                const mesh = me.toExtrudeMesh(geo, g.height, material, true);
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
}, 2000);