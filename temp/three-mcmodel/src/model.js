'use strict';
exports.__esModule = true;
exports.isMinecraftModel =
	exports.isMinecraftModelElement =
	exports.isMinecraftModelElementRotation =
	exports.isMinecraftModelFace =
	exports.isArrayVector4 =
	exports.isArrayVector3 =
		void 0;
function isArrayVector3(arrayVector) {
	return (
		Array.isArray(arrayVector) &&
		arrayVector.length === 3 &&
		arrayVector.every(function (coordinate) {
			return typeof coordinate === 'number';
		})
	);
}
exports.isArrayVector3 = isArrayVector3;
function isArrayVector4(arrayVector) {
	return (
		Array.isArray(arrayVector) &&
		arrayVector.length === 4 &&
		arrayVector.every(function (coordinate) {
			return typeof coordinate === 'number';
		})
	);
}
exports.isArrayVector4 = isArrayVector4;
function isMinecraftModelFace(face) {
	return (
		face &&
		typeof face.texture === 'string' &&
		face.texture.length >= 2 &&
		face.texture[0] === '#' &&
		(face.uv === undefined || isArrayVector4(face.uv)) &&
		(face.rotation === undefined ||
			[0, 90, 180, 270].includes(face.rotation))
	);
}
exports.isMinecraftModelFace = isMinecraftModelFace;
function isMinecraftModelElementRotation(rotation) {
	return (
		rotation &&
		isArrayVector3(rotation.origin) &&
		[-45, -22.5, 0, 22.5, 45].includes(rotation.angle) &&
		['x', 'y', 'z'].includes(rotation.axis) &&
		(rotation.rescale === undefined ||
			typeof rotation.rescale === 'boolean')
	);
}
exports.isMinecraftModelElementRotation = isMinecraftModelElementRotation;
function isMinecraftModelElement(element) {
	var faceCount;
	return (
		element &&
		isArrayVector3(element.from) &&
		isArrayVector3(element.to) &&
		(element.rotation === undefined ||
			isMinecraftModelElementRotation(element.rotation)) &&
		element.faces &&
		(faceCount = Object.keys(element.faces).length) >= 1 &&
		faceCount <= 6 &&
		[
			element.faces.down,
			element.faces.up,
			element.faces.north,
			element.faces.south,
			element.faces.west,
			element.faces.east,
		].every(function (face) {
			return face === undefined || isMinecraftModelFace(face);
		})
	);
}
exports.isMinecraftModelElement = isMinecraftModelElement;
function isMinecraftModel(model) {
	return (
		model &&
		model.textures &&
		Object.entries(model.textures).every(function (_a) {
			var name = _a[0],
				texture = _a[1];
			return typeof name === 'string' && typeof texture === 'string';
		}) &&
		Array.isArray(model.elements) &&
		model.elements.every(isMinecraftModelElement)
	);
}
exports.isMinecraftModel = isMinecraftModel;
