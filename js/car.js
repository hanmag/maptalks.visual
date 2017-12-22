var mtlLoaded = false;

// the carLayer to draw buildings
var carLayer = new maptalks.ThreeLayer('car');
// prepare data, load mtl into three scene.
carLayer.prepareToDraw = function (gl, scene, camera) {
    var light = new THREE.PointLight(0xffffff);
    light.position.copy(camera.position);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff)); // soft white light
    var mtlLoader = new THREE.MTLLoader();
    var mtCar;
    mtlLoader.setPath('obj/');
    mtlLoader.load('car.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('obj/');
        objLoader.load('car.obj', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.scale.set(0.3, 0.3, 0.3);
                    child.rotation.set(Math.PI * 3 / 2, 0, 0);
                }
            });
            var v = carLayer.coordinateToVector3(map.getCenter());
            object.position.x = v.x;
            object.position.y = v.y;
            object.position.z = v.z;
            scene.add(object);
            mtlLoaded = true;
            mtCar = object;
            carLayer.renderScene();
            player.play();

        });
    });

    const player = maptalks.animation.Animation.animate({}, {
        'duration': Number.MAX_VALUE
    }, frame => {
        if (mtCar) {
            mtCar.position.x--;
            mtCar.position.y -= 0.5;
            this.renderScene();
        }
    });

};

carLayer.addTo(map);