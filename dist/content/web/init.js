const MCModel = require('@oran9e/minecraft-model');
const TModel = require('@oran9e/three-mcmodel');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var model = MCModel.MinecraftModel.fromJson({
	__comment:
		"Model generated using MrCrayfish's Model Creator (http://mrcrayfish.com/modelcreator/)",
	parent: 'block/block',
	textures: {
		particle: 'create:block/axis',
		0: 'create:block/axis',
		1: 'create:block/axis_top',
	},
	elements: [
		{
			name: 'Axis',
			from: [6.0, 0.0, 6.0],
			to: [10.0, 16.0, 10.0],
			faces: {
				north: { texture: '#0', uv: [6.0, 0.0, 10.0, 16.0] },
				east: { texture: '#0', uv: [6.0, 0.0, 10.0, 16.0] },
				south: { texture: '#0', uv: [6.0, 0.0, 10.0, 16.0] },
				west: { texture: '#0', uv: [6.0, 0.0, 10.0, 16.0] },
				up: { texture: '#1', uv: [6.0, 6.0, 10.0, 10.0] },
				down: { texture: '#1', uv: [6.0, 6.0, 10.0, 10.0] },
			},
		},
	],
});

//add group
const group = new THREE.Group();
group.add(model.elements);

const geometry = new THREE.BoxGeometry(3, 1, 3);
const material = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
	requestAnimationFrame(animate);
	cube.rotation.y += 0.005;
	renderer.render(scene, camera);
}

animate();
