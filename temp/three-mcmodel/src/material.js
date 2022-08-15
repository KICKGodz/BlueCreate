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
exports.__esModule = true;
exports.MinecraftModelMaterial = void 0;
var three_1 = require('three');
var texture_1 = require('./texture');
var MinecraftModelMaterial = /** @class */ (function (_super) {
	__extends(MinecraftModelMaterial, _super);
	function MinecraftModelMaterial(map) {
		if (map === void 0) {
			map = new texture_1.MinecraftTexture();
		}
		return (
			_super.call(this, {
				map: map,
				transparent: true,
				alphaTest: 0.5,
			}) || this
		);
	}
	return MinecraftModelMaterial;
})(three_1.MeshBasicMaterial);
exports.MinecraftModelMaterial = MinecraftModelMaterial;
