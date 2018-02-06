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

function drawRain() {

    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }
    var group = new THREE.Group();
    var rainDensity = 1500,
        particles, geometry, newMaterials = [],
        parameters, i, color, sprite, size;

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
    addToAnimationLoop(function () {
        for (i = 0; i < group.children.length; i++) {

            var object = group.children[i];

            if (object instanceof THREE.Points) {

                object.translateZ(+150);

                if ((object.position.z > window.innerHeight * 5)) {
                    object.position.z = window.innerHeight * 2 * -1;
                }
            }
        }
    });
}

function drawExplosion() {
    const scene = threeLayer.getScene();
    const camera = threeLayer.getCamera();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }
    var group = new SPE.Group({
            texture: {
                value: THREE.ImageUtils.loadTexture('./textures/sprite-explosion2.png'),
                frames: new THREE.Vector2(5, 5),
                loop: 1
            },
            depthTest: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            scale: 200000
        }),
        shockwaveGroup = new SPE.Group({
            texture: {
                value: THREE.ImageUtils.loadTexture('./textures/smokeparticle.png'),
                loop: 1
            },
            depthTest: false,
            depthWrite: true,
            blending: THREE.NormalBlending,
        }),
        shockwave = new SPE.Emitter({
            particleCount: 200,
            type: SPE.distributions.DISC,
            position: {
                radius: 5,
                spread: new THREE.Vector3(5)
            },
            maxAge: {
                value: 2,
                spread: 0
            },
            duration: 2,
            activeMultiplier: 2000,

            velocity: {
                value: new THREE.Vector3(40)
            },
            rotation: {
                axis: new THREE.Vector3(1, 0, 0),
                angle: Math.PI * 0.5,
                static: true
            },
            size: {
                value: 2
            },
            color: {
                value: [
                    new THREE.Color(0.4, 0.2, 0.1),
                    new THREE.Color(0.2, 0.2, 0.2)
                ]
            },
            opacity: {
                value: [0.5, 0.2, 0]
            }
        }),
        debris = new SPE.Emitter({
            particleCount: 100,
            type: SPE.distributions.SPHERE,
            position: {
                radius: 0.1,
            },
            maxAge: {
                value: 2
            },
            duration: 2,
            activeMultiplier: 40,

            velocity: {
                value: new THREE.Vector3(100)
            },
            acceleration: {
                value: new THREE.Vector3(0, -20, 0),
                distribution: SPE.distributions.BOX
            },
            size: {
                value: 2
            },
            drag: {
                value: 1
            },
            color: {
                value: [
                    new THREE.Color(1, 1, 1),
                    new THREE.Color(1, 1, 0),
                    new THREE.Color(1, 0, 0),
                    new THREE.Color(0.4, 0.2, 0.1)
                ]
            },
            opacity: {
                value: [0.4, 0]
            }
        }),
        fireball = new SPE.Emitter({
            particleCount: 20,
            type: SPE.distributions.SPHERE,
            position: {
                radius: 1
            },
            maxAge: {
                value: 2
            },
            duration: 2,
            activeMultiplier: 20,
            velocity: {
                value: new THREE.Vector3(10)
            },
            size: {
                value: [20, 100]
            },
            color: {
                value: [
                    new THREE.Color(0.5, 0.1, 0.05),
                    new THREE.Color(0.2, 0.2, 0.2)
                ]
            },
            opacity: {
                value: [0.5, 0.35, 0.1, 0]
            }
        }),
        mist = new SPE.Emitter({
            particleCount: 50,
            position: {
                spread: new THREE.Vector3(10, 10, 10),
                distribution: SPE.distributions.SPHERE
            },
            maxAge: {
                value: 2
            },
            duration: 2,
            activeMultiplier: 2000,
            velocity: {
                value: new THREE.Vector3(8, 3, 10),
                distribution: SPE.distributions.SPHERE
            },
            size: {
                value: 40
            },
            color: {
                value: new THREE.Color(0.2, 0.2, 0.2)
            },
            opacity: {
                value: [0, 0, 0.2, 0]
            }
        }),
        flash = new SPE.Emitter({
            particleCount: 50,
            position: {
                spread: new THREE.Vector3(5, 5, 5)
            },
            velocity: {
                spread: new THREE.Vector3(30),
                distribution: SPE.distributions.SPHERE
            },
            size: {
                value: [2, 20, 20, 20]
            },
            maxAge: {
                value: 2
            },
            duration: 2,
            activeMultiplier: 2000,
            opacity: {
                value: [0.5, 0.25, 0, 0]
            }
        });

    group.addEmitter(fireball).addEmitter(flash);
    shockwaveGroup.addEmitter(debris).addEmitter(mist);
    group.mesh.position.set(-27591426.774027377, -16651503.674661478, 0);
    shockwaveGroup.mesh.position.set(-27591426.774027377, -16651503.674661478, 0);
    scene.add(shockwaveGroup.mesh);
    scene.add(group.mesh);

    addToAnimationLoop(function () {
        group.tick();
        shockwaveGroup.tick();
    });
}

function drawSmoke() {
    const scene = threeLayer.getScene();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }
    var particleGroup = new SPE.Group({
        // Possible API for animated textures...
        texture: {
            value: THREE.ImageUtils.loadTexture('./textures/particle2.png'),
            // frames: new THREE.Vector2(8, 8),
            // loop: 2
        },

        // depthTest: true,
        scale: 60000
    });

    var emitter = new SPE.Emitter({
        particleCount: 10000,
        maxAge: {
            value: 10,
            spread: 0
        },
        position: {
            value: new THREE.Vector3(0, 0, 0),
            spread: new THREE.Vector3(1500, 1500, 0),
            spreadClamp: new THREE.Vector3(0, 0, 0),
            distribution: SPE.distributions.BOX,
            randomise: true
        },
        radius: {
            value: 5,
            spread: 0,
            scale: new THREE.Vector3(1, 1, 1),
            spreadClamp: new THREE.Vector3(2, 2, 2),
        },
        velocity: {
            value: new THREE.Vector3(0, 0, 0),
            spread: new THREE.Vector3(0, 0, 0),
            // distribution: SPE.distributions.BOX,
            randomise: false
        },
        acceleration: {
            value: new THREE.Vector3(0, 0, -1000),
            spread: new THREE.Vector3(0, 0, -1000),
            // distribution: SPE.distributions.BOX,
            randomise: false
        },
        drag: {
            value: 0.5,
            spread: 0
        },
        wiggle: {
            value: 0,
            spread: 0
        },
        rotation: {
            axis: new THREE.Vector3(0, 1, 0),
            axisSpread: new THREE.Vector3(0, 0, 0),
            angle: 0, // radians
            angleSpread: 0, // radians
            static: false,
            center: new THREE.Vector3(0, 0, 0)
        },
        size: {
            value: 20,
            spread: 0
        },
        opacity: {
            value: 0.02
        },
        angle: {
            value: 0,
            spread: 0
        }
    });

    particleGroup.addEmitter(emitter);
    particleGroup.mesh.position.set(-27591426.774027377, -16651503.674661478, 0);
    scene.add(particleGroup.mesh);

    var clock = new THREE.Clock();
    addToAnimationLoop(function () {
        var delta = clock.getDelta();
        particleGroup.tick(delta);
        if (Math.ceil(delta * 1000) % 2 == 0) {
            emitter.acceleration.spread = new THREE.Vector3(delta * 2000, delta * 2000, -1000);
            emitter.acceleration.value = new THREE.Vector3(delta * 2000, delta * 2000, -1000);
        } else {
            emitter.acceleration.spread = new THREE.Vector3(-delta * 2000, -delta * 2000, -1000);
            emitter.acceleration.value = new THREE.Vector3(-delta * 2000, -delta * 2000, -1000);
        }

        // particleGroup.material.needsUpdate = true;
    });
}

function drawFire() {
    const scene = threeLayer.getScene();
    const camera = threeLayer.getCamera();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }

    // var fireTex = THREE.ImageUtils.loadTexture("./firetex.png");
    var textureLoader = new THREE.TextureLoader();
    var fireTex = textureLoader.load("textures/firetex.png");
    var wireframeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff),
        wireframe: false
    });

    var fire = new THREE.Fire(fireTex);

    var wireframe = new THREE.Mesh(fire.geometry, wireframeMat.clone());
    fire.add(wireframe);
    wireframe.visible = false;
    fire.position.set(-27591426.774027377, -16651503.674661478, 0);

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

    var scale = 1000.0;
    fire.scale.set(scale, scale, scale);
    fire.translateY(scale / 2);

    addToAnimationLoop(function () {
        var delta = clock.getDelta();
        var t = clock.elapsedTime * controller.speed;
        fire.update(t);

        if (scale > 2000) return;
        scale += 4;
        fire.scale.set(scale, scale, scale);
        fire.translateY(1);

    });
}

function drawFog() {
    const scene = threeLayer.getScene();
    const camera = threeLayer.getCamera();
    if (!scene) {
        console.warn('three.js scene is empty');
        return;
    }
    const world_plane_geometry = new THREE.PlaneGeometry(2000000, 2000000, 25000);
    const world_plane_material = new THREE.MeshBasicMaterial({
        color: 0x220000,
        opacity: 0.1,
        side: THREE.BackSide
    });
    world_plane = new THREE.Mesh(world_plane_geometry, world_plane_material);
    world_plane.position.set(-27589453.947005168, -16645787.262404276, 0); //-27591660.302791115, y: -17134803.390317857
    scene.add(world_plane);
    scene.fog = new THREE.FogExp2(0xf0f0f0, 0.00025);
}

function Boom() {
    if (typeof (drawExplosion) === 'function') drawExplosion();
    if (typeof (drawFire) === 'function') drawFire();
    if (typeof (drawSmoke) === 'function') drawSmoke();
}