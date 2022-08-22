// const MCModel = require('@oran9e/minecraft-model');
// const TModel = require('@oran9e/three-mcmodel');

const {
	MinecraftModelLoader,
	MinecraftModelMesh,
	MinecraftTextureLoader,
} = require('/lib/index.js');

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
	(window.innerWidth * 0.75) / (window.innerHeight * 0.75),
	0.1,
	1000
);
camera.position.set(75, 100, 115);
camera.lookAt(0, 0, 0);

fetch('../create/shaft.json')
	.then((response) => response.json())
	.then((json) => {
		new MinecraftModelMesh(JSON.stringify(json)).then((mesh) => {
			console.log(mesh);
		});
		// const mesh = new THREE.Mesh(model, new THREE.MeshBasicMaterial({ color: 0xcbcec7 }));
		// mesh.position.set(0, 0, 0);
		// mesh.scale.set(baseSize[0], baseSize[1], baseSize[2]);
		// scene.add(mesh);
	});

// new MinecraftModelLoader().load(require('dist/create/shaft.json'), (model) => {
// 	console.log('loaded');
// 	// const textureLoader = new MinecraftTextureLoader();
// 	// model.resolveTextures((path) => textureLoader.load(`../create/${path}.png`));
// 	// scene.add(model);
// });

// var board = checkerboard(10);
// scene.add(board);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
renderer.domElement.style.border = '1px solid white';
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
