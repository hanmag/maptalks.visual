// building textures
const materials = (function () {
    const materials = [];
    const loader = new THREE.TextureLoader();
    for (let i = 1; i < 8; i++) {
        const texture = loader.load("./textures/" + i + ".jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.002, 0.002);
        materials.push(new THREE.MeshPhongMaterial({
            blending: THREE.AdditiveBlending,
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
            const mesh = threeLayer.toExtrudeMesh(geo, g.height, material, true);
            if (Array.isArray(mesh)) {
                SCENE.add.apply(SCENE, mesh);
            } else {
                SCENE.add(mesh);
            }
        });
        refreshMap();
    }
};

function loadBuildings() {
    xhttp.open("GET", "./data/deck_buildings.json", true);
    xhttp.send();
}