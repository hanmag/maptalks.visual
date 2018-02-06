function drawGallery() {
    const scene = threeLayer.getScene();
    const camera = threeLayer.getCamera();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }

    var axesHelper = new THREE.AxesHelper(500000000);
    scene.add(axesHelper);

    var map = new THREE.TextureLoader().load('textures/2.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    var material = new THREE.MeshPhongMaterial({
        map: map,
        side: THREE.DoubleSide,
    });

    var vec = new THREE.Vector3(-27591660.302791115, -16643057.24135378, 1000);
    var pipeSpline = new THREE.CatmullRomCurve3([
        vec.clone().add(new THREE.Vector3(0, 500, -100)),
        vec.clone().add(new THREE.Vector3(500, 0, -100)),
        vec.clone().add(new THREE.Vector3(1000, 0, -100))
    ]);
    var geometry = new THREE.TubeBufferGeometry(pipeSpline, 64, 20, 32, false);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    addToAnimationLoop(function () {
        // mesh.translateZ(1);
    });
}

function drawOcean() {
    const scene = threeLayer.getScene();
    const camera = threeLayer.getCamera();
    const renderer = threeLayer.getThreeRenderer();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }
    var waterNormals = new THREE.ImageUtils.loadTexture('./textures/waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
    directionalLight.position.set(-800000000, -800000000, -800000000);

    // Create the water effect
    ms_Water = new THREE.Water(renderer, camera, scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 1.0,
        sunDirection: directionalLight.position.normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 50.0,
        side: THREE.DoubleSide
    });
    var aMeshMirror = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(100000, 100000, 10, 10),
        ms_Water.material
    );
    aMeshMirror.add(ms_Water);
    // aMeshMirror.rotation.x = -Math.PI * 0.5;
    aMeshMirror.position.set(-27589453.947005168, -16645787.262404276, 0);
    scene.add(aMeshMirror);

    addToAnimationLoop(function () {
        ms_Water.material.uniforms.time.value += 1.0 / 6.0;
        ms_Water.render();
    })
}