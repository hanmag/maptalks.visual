function drawSnow() {
    const scene = threeLayer.getScene();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }

    //snow
    var particles, geometry, materials = [],
        parameters, i, color, sprite, size;

    geometry = new THREE.Geometry();
    var textureLoader = new THREE.TextureLoader();
    var sprite1 = textureLoader.load("textures/snow.png");
    var sprite2 = textureLoader.load("textures/snow.png");
    var sprite3 = textureLoader.load("textures/snow.png");
    var sprite4 = textureLoader.load("textures/snow.png");
    var sprite5 = textureLoader.load("textures/snow.png");
    for (i = 0; i < 200000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 20000 - 10000;
        vertex.y = Math.random() * 20000 - 10000;
        vertex.z = Math.random() * 20000 - 10000;
        geometry.vertices.push(vertex);
    }
    parameters = [
        [
            [1.0, 0.2, 0.5], sprite2, 20
        ],
        [
            [0.95, 0.1, 0.5], sprite3, 15
        ],
        [
            [0.90, 0.05, 0.5], sprite1, 10
        ],
        [
            [0.85, 0, 0.5], sprite5, 8
        ],
        [
            [0.80, 0, 0.5], sprite4, 5
        ]
    ];
    for (i = 0; i < parameters.length; i++) {
        color = parameters[i][0];
        sprite = parameters[i][1];
        size = parameters[i][2];
        materials[i] = new THREE.PointsMaterial({
            size: size,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthTest: true,
            // depthFunc:THREE.GreaterDepth,
            transparent: true,
            side: THREE.BackSide
        });
        materials[i].color.setHSL(color[0], color[1], color[2]);
        particles = new THREE.Points(geometry, materials[i]);
        particles.position.set(-27589453.947005168, -16645787.262404276, 0);
        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;
        scene.add(particles);
    }

    addToAnimationLoop(function () {
        var time = Date.now() * 0.00000005;
        for (i = 0; i < scene.children.length; i++) {
            var object = scene.children[i];
            if (object instanceof THREE.Points) {
                object.rotation.x = -time * (i < 4 ? i + 1 : -(i + 1));
                object.rotation.y = -time * (i < 4 ? i + 1 : -(i + 1));
            }
        }
        for (i = 0; i < materials.length; i++) {
            color = parameters[i][0];
            h = (3600 * (color[0] + time) % 3600) / 3600;
            materials[i].color.setHSL(h, color[1], color[2]);
        }
    });

}

function drawRain() {
    const scene = threeLayer.getScene();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }

    //rain
    var ammountLines = 2500;
    var dimension = 400;
    var lines = [];
    for (var i = 0; i < ammountLines; i++) {
        var geometryLines = new THREE.BoxGeometry(0.8, 0.8, 200 * Math.random());
        var materialLines = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 500,
        });
        var line = new THREE.Mesh(geometryLines, materialLines);
        scene.add(line);
        lines.push(line);
        line.rotation.z = Math.random() * 360;
        line.position.x = -27591660.302791115 + Math.random() * (dimension * 15) - (dimension / 2 * 15);
        line.position.y = -16643057.24135378 + Math.random() * (dimension * 15) - (dimension / 2 * 15);
        line.position.z = (-3000 * Math.random()) + 150;
        line.modifier = Math.random();

    }

    var counter = 0;
    addToAnimationLoop(function () {
        counter += 0.01;
        for (var i = lines.length - 1; i >= 0; i--) {
            lines[i].position.z += 30 * lines[i].modifier;
            if (lines[i].position.z > 3000) {
                lines[i].position.z = -3000;
            }
        }
    });
}

function drawElements2() {
    // var plGeometry = new THREE.PlaneBufferGeometry(10000,10000);
    // var water = new THREE.Mesh(plGeometry,new THREE.MeshBasicMaterial());
    // water.position.set(-27589453.947005168, -16645787.262404276, 0);
    // scene.add(water);

    // addToAnimationLoop(function () {
    //     var time = performance.now() * 0.001;
    //     water.material.uniforms.time.value += 1.0 / 60.0;
    //     water.material.uniforms.size.value = parameters.size;
    //     water.material.uniforms.distortionScale.value = parameters.distortionScale;
    //     water.material.uniforms.alpha.value = parameters.alpha;
    // });
}

function drawFire() {
    const scene = threeLayer.getScene();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }
    
}