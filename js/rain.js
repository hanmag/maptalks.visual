var group = new THREE.Group();
var rainDensity = 1500,
    particles, geometry, newMaterials = [],
    parameters, i, color, sprite, size;

setTimeout(() => init(), 5000);

function init() {

    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }

    geometry = new THREE.Geometry();

    var loader = new THREE.TextureLoader();
    sprite = loader.load("textures/rain.png");

    for (i = 0; i < rainDensity; i++) {

        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 20000 - 10000;
        vertex.y = Math.random() * 20000 - 10000;
        vertex.z = Math.random() * 20000 - 10000;

        geometry.vertices.push(vertex);
    }

    parameters = [
        [
            [1.0, 0.2, 0.5], sprite, 750
        ],
        [
            [0.95, 0.1, 0.5], sprite, 500
        ],
        [
            [0.90, 0.05, 0.5], sprite, 300
        ],
        [
            [0.85, 0, 0.5], sprite, 200
        ],
        [
            [0.80, 0, 0.5], sprite, 100
        ],
    ];

    for (i = 0; i < parameters.length; i++) {

        color = parameters[i][0];
        sprite = parameters[i][1];
        size = parameters[i][2];

        newMaterials[i] = new THREE.PointsMaterial({
            size: size,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        newMaterials[i].color.setHSL(color[0], color[1], color[2]);
        particles = new THREE.Points(geometry, newMaterials[i]);

        particles.rotation.z = Math.random() * 0.20 + 0.10;

        group.add(particles);
        // scene.add(particles);
    }

    group.position.set(-27589453.947005168, -16645787.262404276, 0);

    scene.add(group);

    animate();
}

function animate() {
    animateRain();
    requestAnimationFrame(animate);
}

function animateRain() {
    for (i = 0; i < group.children.length; i++) {

        var object = group.children[i];

        if (object instanceof THREE.Points) {

            object.translateZ(+150);

            if ((object.position.z > window.innerHeight * 5)) {
                object.position.z = window.innerHeight * 2 * -1;
            }
        }
    }

    console.log(newMaterials);
    var time = Date.now() * 0.00005;
    for (i = 0; i < newMaterials.length; i++) {

        color = parameters[i][0];

        h = (360 * (color[0] + time) % 360) / 360;
        newMaterials[i].color.setHSL(h, color[1], color[2]);
    }
}