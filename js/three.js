// the ThreeLayer to draw buildings
const threeLayer = new maptalks.ThreeLayer('t', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true
}).addTo(map);

const animations = [];

// building textures
const skyMaterial = (function () {
    const loader = new THREE.TextureLoader();
    const texture = loader.load("./textures/sky1.jpg");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 8);
    return new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.97,
        side: THREE.BackSide,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, 0, -1))]
    });

    // var canvas = document.createElement('canvas');
    // canvas.width = 128;
    // canvas.height = 128;
    // var context = canvas.getContext('2d');
    // //var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    // var gradient = context.createLinearGradient(0,64,0,128);
    // gradient.addColorStop(0.5, 'rgba(255,127,36,1)');
    // gradient.addColorStop(1, 'rgba(102,205,255,1)');
    // context.fillStyle = gradient;
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // var shadowTexture = new THREE.Texture(canvas);
    // shadowTexture.needsUpdate = true;
    // var shadowMaterial = new THREE.MeshBasicMaterial({
    //     map: shadowTexture,
    //     side: THREE.BackSide,
    //     clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, 0, -1))]
    // });

    // return shadowMaterial;
})();

const skybox = new THREE.Mesh(new THREE.CylinderGeometry(150000, 150000, 200000, 128), skyMaterial);
skybox.fixed = true;
skybox.rotation.x = Math.PI / 2;



window.animationLoop = () => {
    animations.forEach(anim => {
        anim.call();
    });

    const cameraPosition = threeLayer.getCamera().position;
    tip.attchText = -cameraPosition.z.toFixed(0);
    updateSkybox(cameraPosition);

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

function updateSkybox(cameraPosition) {
    const skyRadius = -cameraPosition.z * 5 + (Math.pow(map.getPitch(), 1.4) * 24) - 800;
    skybox.visible = map.getZoom() > 15 && map.getPitch() > 60;
    // skybox.geometry = new THREE.CylinderGeometry(skyRadius, skyRadius, 200000, 128);
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