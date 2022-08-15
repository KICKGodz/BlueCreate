'use strict';
var __extends =
	(this && this.__extends) ||
	(function () {
		var extendStatics = function (d, b) {
			extendStatics =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function (d, b) {
						d.__proto__ = b;
					}) ||
				function (d, b) {
					for (var p in b)
						if (Object.prototype.hasOwnProperty.call(b, p))
							d[p] = b[p];
				};
			return extendStatics(d, b);
		};
		return function (d, b) {
			if (typeof b !== 'function' && b !== null)
				throw new TypeError(
					'Class extends value ' +
						String(b) +
						' is not a constructor or null'
				);
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype =
				b === null
					? Object.create(b)
					: ((__.prototype = b.prototype), new __());
		};
	})();
var __spreadArray =
	(this && this.__spreadArray) ||
	function (to, from, pack) {
		if (pack || arguments.length === 2)
			for (var i = 0, l = from.length, ar; i < l; i++) {
				if (ar || !(i in from)) {
					if (!ar) ar = Array.prototype.slice.call(from, 0, i);
					ar[i] = from[i];
				}
			}
		return to.concat(ar || Array.prototype.slice.call(from));
	};
exports.__esModule = true;
exports.MinecraftModelLoader = exports.MinecraftModelMesh = void 0;
var three_1 = require('three');
var geometry_1 = require('./geometry');
var loader_1 = require('./loader');
var material_1 = require('./material');
var model_1 = require('./model');
var MinecraftModelMesh = /** @class */ (function (_super) {
	__extends(MinecraftModelMesh, _super);
	function MinecraftModelMesh(model) {
		var _this = this;
		if (typeof model === 'string') {
			model = JSON.parse(model);
		}
		if (!(0, model_1.isMinecraftModel)(model)) {
			throw new Error('Invalid model');
		}
		var geometry = new geometry_1.MinecraftModelGeometry(model);
		var sortedTextures = __spreadArray(
			[],
			new Set(Object.values(model.textures)),
			true
		).sort();
		var mapping = {};
		var materials = sortedTextures.map(function (path) {
			return (mapping[path] = new material_1.MinecraftModelMaterial());
		});
		_this =
			_super.call(
				this,
				geometry,
				__spreadArray(
					[new material_1.MinecraftModelMaterial()],
					materials,
					true
				)
			) || this;
		_this.materialMapping = mapping;
		return _this;
	}
	MinecraftModelMesh.prototype.resolveTextures = function (resolver) {
		for (var path in this.materialMapping) {
			this.materialMapping[path].map = resolver(path);
		}
	};
	return MinecraftModelMesh;
})(three_1.Mesh);
exports.MinecraftModelMesh = MinecraftModelMesh;
var MinecraftModelLoader = /** @class */ (function (_super) {
	__extends(MinecraftModelLoader, _super);
	function MinecraftModelLoader() {
		return (_super !== null && _super.apply(this, arguments)) || this;
	}
	MinecraftModelLoader.prototype.load = function (
		url,
		onLoad,
		onProgress,
		onError
	) {
		var loader = new three_1.FileLoader(this.manager);
		loader.setPath(this.path);
		loader.setResponseType('json');
		var handleLoad = function (model) {
			try {
				var mesh = new MinecraftModelMesh(model);
				if (onLoad) {
					onLoad(mesh);
				}
			} catch (err) {
				if (onError) {
					onError(err);
				}
			}
		};
		loader.load(url, handleLoad, onProgress, onError);
	};
	return MinecraftModelLoader;
})(loader_1.AbstractLoader);
exports.MinecraftModelLoader = MinecraftModelLoader;
