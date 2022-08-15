'use strict';
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (
					!desc ||
					('get' in desc
						? !m.__esModule
						: desc.writable || desc.configurable)
				) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k];
						},
					};
				}
				Object.defineProperty(o, k2, desc);
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
exports.__esModule = true;
exports.CHECKERBOARD_IMAGE =
	exports.MinecraftTexture =
	exports.MinecraftTextureLoader =
	exports.isMinecraftModel =
	exports.isMinecraftModelElement =
	exports.isMinecraftModelElementRotation =
	exports.isMinecraftModelFace =
	exports.isArrayVector4 =
	exports.isArrayVector3 =
	exports.MinecraftModelMesh =
	exports.MinecraftModelLoader =
	exports.MinecraftModelMaterial =
	exports.AbstractLoader =
	exports.MinecraftModelGeometry =
		void 0;
var geometry_1 = require('./geometry');
__createBinding(exports, geometry_1, 'MinecraftModelGeometry');
var loader_1 = require('./loader');
__createBinding(exports, loader_1, 'AbstractLoader');
var material_1 = require('./material');
__createBinding(exports, material_1, 'MinecraftModelMaterial');
var mesh_1 = require('./mesh');
__createBinding(exports, mesh_1, 'MinecraftModelLoader');
__createBinding(exports, mesh_1, 'MinecraftModelMesh');
var model_1 = require('./model');
__createBinding(exports, model_1, 'isArrayVector3');
__createBinding(exports, model_1, 'isArrayVector4');
__createBinding(exports, model_1, 'isMinecraftModelFace');
__createBinding(exports, model_1, 'isMinecraftModelElementRotation');
__createBinding(exports, model_1, 'isMinecraftModelElement');
__createBinding(exports, model_1, 'isMinecraftModel');
var texture_1 = require('./texture');
__createBinding(exports, texture_1, 'MinecraftTextureLoader');
__createBinding(exports, texture_1, 'MinecraftTexture');
__createBinding(exports, texture_1, 'CHECKERBOARD_IMAGE');
