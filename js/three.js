// the ThreeLayer to draw buildings
const threeLayer = new maptalks.ThreeLayer('t', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true
}).addTo(map);

const animations = [];

// building textures
const skyMaterial = (function () {
    // const loader = new THREE.TextureLoader();
    // const texture = loader.load("./textures/sky1.jpg");
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(10, 20);
    return new THREE.MeshBasicMaterial({
        // map: texture,
        color: 0x090914,
        transparent: true,
        opacity: 0.97,
        side: THREE.BackSide,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, 0, -1))]
    });
})();

const skybox = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1000, 2), skyMaterial);
skybox.fixed = true;
skybox.rotation.x = Math.PI / 2;

window.animationLoop = () => {
    animations.forEach(anim => {
        anim.call();
    });

    const cameraPosition = threeLayer.getCamera().position;
    tip.attchText = -cameraPosition.z.toFixed(0);
    updateObject3d(cameraPosition);

    threeLayer.renderScene();
}

threeLayer.prepareToDraw = function (gl, scene, camera) {
    const light = new THREE.PointLight(0xffffff);
    camera.add(light);
    const ambientLight = new THREE.AmbientLight(0xe0e6e6); // soft blue-green light
    scene.add(ambientLight);
    scene.add(skybox);
    refreshMap();
};

function updateObject3d(cameraPosition) {
    const skyRadius = 500000;//仅根据z
    console.log(skyRadius);
    skybox.visible = map.getZoom() > 15 && map.getPitch() > 60;
    skybox.geometry = new THREE.CylinderGeometry(skyRadius, skyRadius, 200000, 128);
    skybox.position.x = cameraPosition.x;
    skybox.position.y = cameraPosition.y;
    skybox.position.z = 0;

    threeLayer.getScene().children.forEach(item => {
        if (item.fixed) return;
        let dist = item.position.distanceTo(cameraPosition);
        if (cameraPosition.z < -80000) {
            item.visible = false;
        } else {
            item.visible = dist < Math.sqrt(Math.pow(cameraPosition.z, 2) + skyRadius * skyRadius);
        }
    });
}

function refreshMap() {
    map.setBearing(map.getBearing() + 0.001);
}

function addToAnimationLoop(animation) {
    animations.push(animation);
}