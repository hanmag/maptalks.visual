function loadlineeffect() {

    const scene = threeLayer.getScene();
    const camera = threeLayer.getCamera();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }

    var resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    //geometry
    var geometry = new THREE.Geometry();
    var v0 = new THREE.Vector3(0, 0, 0);
    var v1 = new THREE.Vector3(5000, 0, 0);
    geometry.vertices.push(v0);
    geometry.vertices.push(v1);


    //meshline
    var line = new MeshLine();
    line.setGeometry(geometry);

    //MeshLineMaterial
    var material = new MeshLineMaterial({
        useMap: false,
        color: new THREE.Color(0xff0000),
        opacity: 1,
        resolution: resolution,
        sizeAttenuation: false,
        lineWidth: 10,
        near: camera.near,
        far: camera.far,
        depthWrite: false,
        depthTest: true,
        alphaTest: false,
        transparent: true,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(line.geometry, material); // this syntax could definitely be improved!

    var group = new THREE.Group();
    group.add(mesh);
    group.position.set(-27591426, -16661503, 0);

    scene.add(group);

    var color01 = new THREE.Color(0x000000);
    var c = new THREE.Color(0xff0000);
    var step = 0;

    addToAnimationLoop(function () {
        // var f = Math.sin(step) * 0.5 + 0.5;
        var f = THREE.Math.pingpong(step, 1);
        mesh.material.uniforms.color.value.newLerp(c, color01, f);
        step += 0.03;
    })
}

//颜色a与颜色b的线性插值，t为比率（0~1）
THREE.Color.prototype.newLerp = function (a, b, t) {
    this.r = a.r + (b.r - a.r) * t;
    this.g = a.g + (b.g - a.g) * t;
    this.b = a.b + (b.b - a.b) * t;
    return this
}

//来回循环线性动画(重复0到t)
THREE.Math.pingpong = function (t, length) {
    t = THREE.Math.repeat(t, 2 * length);
    return length - Math.abs(t - length);
}

//重复动画(重复0到t)
THREE.Math.repeat = function (t, length) {
    return t - Math.floor(t / length) * length;
}