// the ThreeLayer to draw buildings
const threeLayer = new maptalks.ThreeLayer('t', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true
});

let SCENE = null;

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

        threeLayer.prepareToDraw = function (gl, scene, camera) {
            SCENE = scene;
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
            refresh();
        };
        threeLayer.addTo(map);
    }
};
xhttp.open("GET", "./data/deck_buildings.json", true);
setTimeout(() => {
    xhttp.send();

    setTimeout(() => {
        drawElements();
    }, 3000);
}, 2000);

function drawElements() {
    if (!SCENE) {
        console.warn('three.js scene is empty');
        return;
    }

    // hemi-sphere
    const hemi_sphere_geometry = new THREE.SphereGeometry(1600, 32, 32);
    const hemi_sphere_material = new THREE.MeshPhongMaterial({
        color: 0x806666,
        transparent: true,
        opacity: 0.2,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, 0, -1))]
    });
    const hemi_sphere = new THREE.Mesh(hemi_sphere_geometry, hemi_sphere_material);
    hemi_sphere.position.set(-27589453.947005168, -16645787.262404276, 0);
    SCENE.add(hemi_sphere);

    // circle-plane
    const circle_plane_geometry = new THREE.CircleGeometry(1600, 32);
    const circle_plane_material = new THREE.MeshBasicMaterial({
        color: 0x220000,
        opacity: 0.1,
        side: THREE.BackSide
    });
    const circle_plane = new THREE.Mesh(circle_plane_geometry, circle_plane_material);
    circle_plane.position.set(-27589453.947005168, -16645787.262404276, 0);
    SCENE.add(circle_plane);

    // add spot light
    const spotLightGeometry = new THREE.CylinderGeometry(0.1, 1.5, 5, 32 * 2, 20, true);
    // geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -geometry.parameters.height / 2, 0));
    // geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    refresh();
}

function refresh() {
    map.setPitch(55 + 0.1 * Math.random());
}