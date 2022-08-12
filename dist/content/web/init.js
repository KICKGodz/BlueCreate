const MCModel = require('@oran9e/minecraft-model');
const TModel = require('@oran9e/three-mcmodel');

const blocks = (blocks) => {
	return blocks * 16;
};

const checkerboard = (segments) => {
	var errorCorrection = blocks(segments) / 2 - 8;
	var geometry = new THREE.BoxGeometry(16, 16, 16);
	var light = new THREE.MeshBasicMaterial({ color: 0xf2f5ee });
	var dark = new THREE.MeshBasicMaterial({ color: 0xcbcec7 });

	var board = new THREE.Group();

	for (var i = 0; i < segments; i++) {
		for (var j = 0; j < segments; j++) {
			var cube = new THREE.Mesh(
				geometry,
				(i + j) % 2 == 0 ? dark : light
			);
			cube.position.x = i * 16 - errorCorrection;
			cube.position.y = 0;
			cube.position.z = j * 16 - errorCorrection;
			board.add(cube);
		}
	}

	return board;
};

const baseSize = [blocks(5), blocks(1), blocks(5)];

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2e2e2e);
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(75, 100, 115);
camera.lookAt(0, 0, 0);

var model;
fetch('../create/shaft.json')
	.then((response) => response.json())
	.then((json) => {
          console.log(json)
		// model = TModel.MinecraftModelJsonLoader();
		// MCModel.MinecraftModel.fromJson(json);
	});

// var model = MCModel.MinecraftModel.fromJson("../create/shaft.json");

// //add group
// const group = new THREE.Group();
// group.add(model.elements);

var board = checkerboard(5);
scene.add(board);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

animate();
