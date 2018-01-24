function drawSnow() {
    const scene = threeLayer.getScene();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }

    //snow
    var particles, geometry, materials = [],
        parameters, i, color, sprite, size;

    // geometry = new THREE.Geometry();
    var textureLoader = new THREE.TextureLoader();
    var sprite1 = textureLoader.load("textures/snow.png");
    var sprite2 = textureLoader.load("textures/snow1.png");
    var sprite3 = textureLoader.load("textures/snow2.png");
    var sprite4 = textureLoader.load("textures/snow3.png");
    var sprite5 = textureLoader.load("textures/snow4.png");
    // for (i = 0; i < 200000; i++) {
    //     var vertex = new THREE.Vector3();
    //     vertex.x = Math.random() * 20000 - 10000;
    //     vertex.y = Math.random() * 20000 - 10000;
    //     vertex.z = Math.random() * 20000 - 10000;
    //     geometry.vertices.push(vertex);
    // }
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
        // materials[i] = new THREE.PointsMaterial({
        //     size: size,
        //     map: sprite,
        //     blending: THREE.AdditiveBlending,
        //     depthTest: true,
        //     // depthFunc:THREE.GreaterDepth,
        //     transparent: true,
        //     side: THREE.BackSide
        // });
        materials[i] = new THREE.SpriteMaterial({
            map: sprite,
        });
        // particles = new THREE.Points(geometry, materials[i]);
        // particles.position.set(-27589453.947005168, -16645787.262404276, 0);
        // particles.rotation.x = Math.random() * 6;
        // particles.rotation.y = Math.random() * 6;
        // particles.rotation.z = Math.random() * 6;
        // scene.add(particles);
    }

    var group = new THREE.Group();

    for (var i = 0; i < 20000; i++) {
        particle = new THREE.Sprite(materials[Math.floor(Math.random() * parameters.length)]);
        particle.position.x = Math.random() * 20000 - 10000;
        particle.position.y = Math.random() * 20000 - 10000;
        particle.position.z = Math.random() * 20000 - 10000;
        particle.scale.x = particle.scale.y = Math.random() * 20 + 10;
        // particle.rotation.x = Math.random() * 6;
        // particle.rotation.y = Math.random() * 6;
        // particle.rotation.z = Math.random() * 6;
        group.add(particle);
    }
    group.position.set(-27589453.947005168, -16645787.262404276, 0);
    scene.add(group);

    addToAnimationLoop(function () {
        var time = Date.now() * 0.0000000005;
        for (i = 0; i < group.children.length; i++) {
            var object = group.children[i];
            if (object instanceof THREE.Sprite) {
                // object.rotation.x = -time * (i < 4 ? i + 1 : -(i + 1));
                // object.rotation.y = -time * (i < 8 ? i + 1 : -(i + 1));
                object.position.z += time * 0.03;
                if (object.position.z >= 0) object.position.z = Math.random() * 20000 - 10000;
            }
        }
        // if (group.rotation.x >= Math.PI / 2) group.rotation.x = 0;
        // group.rotation.x += 0.03;
        // group.rotation.y += 0.03;
    });

}

// function drawRain() {
//     const scene = threeLayer.getScene();
//     if (!scene) {
//         console.warn('three.js scene is empty');
//         return;
//     }

//     //rain
//     var ammountLines = 2500;
//     var dimension = 400;
//     var lines = [];
//     for (var i = 0; i < ammountLines; i++) {
//         var geometryLines = new THREE.BoxGeometry(0.8, 0.8, 200 * Math.random());
//         var materialLines = new THREE.MeshPhongMaterial({
//             color: 0xffffff,
//             shininess: 500,
//         });
//         var line = new THREE.Mesh(geometryLines, materialLines);
//         scene.add(line);
//         lines.push(line);
//         line.rotation.z = Math.random() * 360;
//         line.position.x = -27591660.302791115 + Math.random() * (dimension * 15) - (dimension / 2 * 15);
//         line.position.y = -16643057.24135378 + Math.random() * (dimension * 15) - (dimension / 2 * 15);
//         line.position.z = (-3000 * Math.random()) + 150;
//         line.modifier = Math.random();
//     }

//     var counter = 0;
//     addToAnimationLoop(function () {
//         counter += 0.01;
//         for (var i = lines.length - 1; i >= 0; i--) {
//             lines[i].position.z += 30 * lines[i].modifier;
//             if (lines[i].position.z > 3000) {
//                 lines[i].position.z = -3000;
//             }
//         }
//     });
// }


function drawFire() {
    const scene = threeLayer.getScene();
    const camera = threeLayer.getCamera();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }

    // var axesHelper = new THREE.AxesHelper(500000000);
    // scene.add(axesHelper);

    // var fireTex = THREE.ImageUtils.loadTexture("./firetex.png");
    var textureLoader = new THREE.TextureLoader();
    var fireTex = textureLoader.load("textures/firetex.png");
    var wireframeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff),
        wireframe: true
    });

    var fire = new THREE.Fire(fireTex);

    var wireframe = new THREE.Mesh(fire.geometry, wireframeMat.clone());
    fire.add(wireframe);
    wireframe.visible = false;
    fire.position.set(-27589453.947005168, -16645787.262404276, 0);
    fire.rotation.set(-1.57,-1.57,0);
    scene.add(fire);

    var clock = new THREE.Clock();

    var controller = {
        speed: 1.0,
        magnitude: 1.3,
        lacunarity: 2.0,
        gain: 0.5,
        noiseScaleX: 1.0,
        noiseScaleY: 2.0,
        noiseScaleZ: 1.0,
    };

    fire.material.uniforms.magnitude.value = controller.magnitude;
    fire.material.uniforms.lacunarity.value = controller.lacunarity;
    fire.material.uniforms.gain.value = controller.gain;
    fire.material.uniforms.noiseScale.value = new THREE.Vector4(
        controller.noiseScaleX,
        controller.noiseScaleY,
        controller.noiseScaleZ,
        0.3
    );

    addToAnimationLoop(function () {
        var delta = clock.getDelta();
        var t = clock.elapsedTime * controller.speed;
        fire.update(t);
    });
}