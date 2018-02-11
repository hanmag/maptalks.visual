function drawSmokeSpread() {
    var clock = new THREE.Clock();
    initParticles();

    fixedTimeStep = true;

    addToAnimationLoop(function () {
        var dt = clock.getDelta();
        particleGroup.tick(dt);

        if (emitter.position.spread.x < 15000) {
            emitter.position.spread.x += 20;
        }
    })
}

// Create particle group and emitter
function initParticles() {
    var scene = threeLayer.getScene();
    var loader = new THREE.TextureLoader();

    particleGroup = new SPE.Group({
        type: SPE.distributions.SPHERE,
        texture: {
            value: loader.load('../textures/cloud.png')
        },
        blending: THREE.NormalBlending,
        maxParticleCount: 5000,
        scale: 200000,
        fog: false
    });

    emitter = new SPE.Emitter({
        particleCount: 100,
        maxAge: {
            value: 10,
        },
        position: {
            value: new THREE.Vector3(0, 0, 0),
            spread: new THREE.Vector3(1500, 0, 0),
            distribution: SPE.distributions.SPHERE,
            radiusScale: new THREE.Vector3(1, 1, 0),
            randomise: true
        },
        direction: -1,
        size: {
            value: 80
        },
        opacity: {
            value: [0, 0.5, 0.2]
        },
        color: {
            value: new THREE.Color(1, 1, 1),
            spread: new THREE.Color(0.1, 0.1, 0.1)
        }
    });

    particleGroup.addEmitter(emitter);

    particleGroup.mesh.position.set(-27589453.947005168, -16645787.262404276, 0);

    scene.add(particleGroup.mesh);
}