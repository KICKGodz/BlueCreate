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
exports.MinecraftTextureLoader =
	exports.MinecraftTexture =
	exports.CHECKERBOARD_IMAGE =
		void 0;
var three_1 = require('three');
var loader_1 = require('./loader');
exports.CHECKERBOARD_IMAGE =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4goSFSEEtucn/QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAkSURBVCjPY2TAAX4w/MAqzsRAIhjVQAxgxBXeHAwco6FEPw0A+iAED8NWwMQAAAAASUVORK5CYII=';
var MinecraftTexture = /** @class */ (function (_super) {
	__extends(MinecraftTexture, _super);
	function MinecraftTexture(image) {
		var _this = _super.call(this) || this;
		_this.image = image;
		_this.magFilter = three_1.NearestFilter;
		return _this;
	}
	Object.defineProperty(MinecraftTexture.prototype, 'image', {
		get: function () {
			return this._image;
		},
		set: function (value) {
			this._image =
				value && value.width === value.height
					? value
					: new three_1.ImageLoader().load(
							exports.CHECKERBOARD_IMAGE
					  );
			this.needsUpdate = true;
		},
		enumerable: false,
		configurable: true,
	});
	return MinecraftTexture;
})(three_1.Texture);
exports.MinecraftTexture = MinecraftTexture;
var MinecraftTextureLoader = /** @class */ (function (_super) {
	__extends(MinecraftTextureLoader, _super);
	function MinecraftTextureLoader() {
		var _this = (_super !== null && _super.apply(this, arguments)) || this;
		_this.crossOrigin = 'anonymous';
		return _this;
	}
	MinecraftTextureLoader.prototype.load = function (
		url,
		onLoad,
		onProgress,
		onError
	) {
		var texture = new MinecraftTexture();
		var loader = new three_1.ImageLoader(this.manager);
		loader.setCrossOrigin(this.crossOrigin);
		loader.setPath(this.path);
		var handleLoad = function (image) {
			texture.image = image;
			if (onLoad) {
				onLoad(texture);
			}
		};
		loader.load(url, handleLoad, onProgress, onError);
		return texture;
	};
	MinecraftTextureLoader.prototype.setCrossOrigin = function (value) {
		this.crossOrigin = value;
		return this;
	};
	return MinecraftTextureLoader;
})(loader_1.AbstractLoader);
exports.MinecraftTextureLoader = MinecraftTextureLoader;
