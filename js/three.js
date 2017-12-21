// the ThreeLayer to draw buildings
const threeLayer = new maptalks.ThreeLayer('t', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true
}).addTo(map);

var SCENE = null;

threeLayer.prepareToDraw = function (gl, scene, camera) {
    SCENE = scene;
    const light = new THREE.PointLight(0xffffff);
    camera.add(light);
    const ambientLight = new THREE.AmbientLight(0xa0a6a6); // soft blue-green light
    scene.add(ambientLight);
    refreshMap();
};

function refreshMap() {
    map.setBearing(map.getBearing() + 0.001);
}