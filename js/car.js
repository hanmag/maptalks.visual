var mtlLoader = new THREE.MTLLoader();
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
        var v = threeLayer.coordinateToVector3(map.getCenter());
        object.position.x = v.x;
        object.position.y = v.y;
        object.position.z = v.z;
        var scene = getThreeScene();
        scene.add(object);

        var coords = [
            [-73.9968639513736, 40.70902812722292],
            [-73.99782002523818, 40.708855888508],
            [-73.99815696546159, 40.70875816301859],
            [-73.99863114026334, 40.7085673758107],
            [-73.99907274396907, 40.7083578743877],
            [-73.99937372823638, 40.708196258408265],
            [-73.99972968827387, 40.70846978738186],
            [-74.00003817418991, 40.7087230403221],
            [-74.00035614047351, 40.708962495355735],
            [-74.00097855428214, 40.709468023360984],
            [-74.0013150653387, 40.70973333970531],
            [-74.00114772886752, 40.709991299761185],
            [-74.00094905084723, 40.7102536387134],
            [-74.00069944991475, 40.71053630711677],
            [-74.00053133607406, 40.71083243351623],
            [-74.00074829138487, 40.71099421395823],
            [-74.00082768460618, 40.711183072182024],
            [-74.00106708520224, 40.71161119793706],
            [-74.001031877576, 40.7118187386246],
            [-74.00082723625758, 40.7118069395373],
            [-74.00082228349305, 40.71239730257409],
            [-74.00080978095798, 40.71273789971761],
            [-74.00087857894817, 40.713067504476015]
        ];;
        addToAnimationLoop(function () {
            var t = Date.now();
            object.position.x--;
            object.position.y -= 0.5;
            threeLayer.renderScene();
        })
    });
});