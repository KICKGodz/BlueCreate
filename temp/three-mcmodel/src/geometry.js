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
exports.MinecraftModelGeometry = void 0;
var three_1 = require('three');
var vertexMaps = {
	west: [0, 1, 2, 3],
	east: [4, 5, 6, 7],
	down: [0, 3, 4, 7],
	up: [2, 1, 6, 5],
	north: [7, 6, 1, 0],
	south: [3, 2, 5, 4],
};
function applyVertexMapRotation(rotation, _a) {
	var a = _a[0],
		b = _a[1],
		c = _a[2],
		d = _a[3];
	return rotation === 0
		? [a, b, c, d]
		: rotation === 90
		? [b, c, d, a]
		: rotation === 180
		? [c, d, a, b]
		: [d, a, b, c];
}
function buildMatrix(angle, scale, axis) {
	var a = Math.cos(angle) * scale;
	var b = Math.sin(angle) * scale;
	var matrix = new three_1.Matrix3();
	if (axis === 'x') {
		matrix.set(1, 0, 0, 0, a, -b, 0, b, a);
	} else if (axis === 'y') {
		matrix.set(a, 0, b, 0, 1, 0, -b, 0, a);
	} else {
		matrix.set(a, -b, 0, b, a, 0, 0, 0, 1);
	}
	return matrix;
}
function rotateCubeCorners(corners, rotation) {
	var origin = new three_1.Vector3().fromArray(rotation.origin).subScalar(8);
	var angle = (rotation.angle / 180) * Math.PI;
	var scale = rotation.rescale
		? Math.SQRT2 /
		  Math.sqrt(Math.pow(Math.cos(angle || Math.PI / 4), 2) * 2)
		: 1;
	var matrix = buildMatrix(angle, scale, rotation.axis);
	return corners.map(function (vertex) {
		return new three_1.Vector3()
			.fromArray(vertex)
			.sub(origin)
			.applyMatrix3(matrix)
			.add(origin)
			.toArray();
	});
}
function getCornerVertices(from, to) {
	var _a = from.concat(to).map(function (coordinate) {
			return coordinate - 8;
		}),
		x1 = _a[0],
		y1 = _a[1],
		z1 = _a[2],
		x2 = _a[3],
		y2 = _a[4],
		z2 = _a[5];
	return [
		[x1, y1, z1],
		[x1, y2, z1],
		[x1, y2, z2],
		[x1, y1, z2],
		[x2, y1, z2],
		[x2, y2, z2],
		[x2, y2, z1],
		[x2, y1, z1],
	];
}
function generateDefaultUvs(faceName, _a, _b) {
	var x1 = _a[0],
		y1 = _a[1],
		z1 = _a[2];
	var x2 = _b[0],
		y2 = _b[1],
		z2 = _b[2];
	return faceName === 'west'
		? [z1, 16 - y2, z2, 16 - y1]
		: faceName === 'east'
		? [16 - z2, 16 - y2, 16 - z1, 16 - y1]
		: faceName === 'down'
		? [x1, 16 - z2, x2, 16 - z1]
		: faceName === 'up'
		? [x1, z1, x2, z2]
		: faceName === 'north'
		? [16 - x2, 16 - y2, 16 - x1, 16 - y1]
		: [x1, 16 - y2, x2, 16 - y1];
}
function computeNormalizedUvs(uvs) {
	return uvs.map(function (coordinate, i) {
		return (i % 2 ? 16 - coordinate : coordinate) / 16;
	});
}
var GroupedAttributesBuilder = /** @class */ (function () {
	function GroupedAttributesBuilder(textures) {
		this.groups = {};
		this.groupMapping = {};
		this.missingGroup = { vertices: [], uvs: [], indices: [] };
		for (
			var _i = 0, _a = new Set(Object.values(textures));
			_i < _a.length;
			_i++
		) {
			var texturePath = _a[_i];
			this.groups[texturePath] = { vertices: [], uvs: [], indices: [] };
		}
		for (var variable in textures) {
			this.groupMapping['#' + variable] = this.groups[textures[variable]];
		}
	}
	GroupedAttributesBuilder.prototype.getContext = function (textureVariable) {
		return this.groupMapping[textureVariable] || this.missingGroup;
	};
	GroupedAttributesBuilder.prototype.getAttributes = function () {
		var _this = this;
		var _a = this.missingGroup,
			vertices = _a.vertices,
			uvs = _a.uvs,
			indices = _a.indices;
		var indexCount = indices.length;
		var groups = [{ start: 0, count: indexCount, materialIndex: 0 }];
		groups.push.apply(
			groups,
			Object.keys(this.groups)
				.sort()
				.map(function (path, i) {
					var group = _this.groups[path];
					var start = indexCount;
					var count = group.indices.length;
					var offset = vertices.length / 3;
					vertices = vertices.concat(group.vertices);
					uvs = uvs.concat(group.uvs);
					indices = indices.concat(
						group.indices.map(function (index) {
							return index + offset;
						})
					);
					indexCount += count;
					return { start: start, count: count, materialIndex: i + 1 };
				})
		);
		return {
			vertices: vertices,
			uvs: uvs,
			indices: indices,
			groups: groups,
		};
	};
	return GroupedAttributesBuilder;
})();
var MinecraftModelGeometry = /** @class */ (function (_super) {
	__extends(MinecraftModelGeometry, _super);
	function MinecraftModelGeometry(model) {
		var _this = _super.call(this) || this;
		var _a = MinecraftModelGeometry.computeAttributes(model),
			vertices = _a.vertices,
			uvs = _a.uvs,
			indices = _a.indices,
			groups = _a.groups;
		_this.addAttribute(
			'position',
			new three_1.Float32BufferAttribute(vertices, 3)
		);
		_this.addAttribute('uv', new three_1.Float32BufferAttribute(uvs, 2));
		_this.setIndex(new three_1.Uint16BufferAttribute(indices, 1));
		for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
			var _b = groups_1[_i],
				start = _b.start,
				count = _b.count,
				materialIndex = _b.materialIndex;
			_this.addGroup(start, count, materialIndex);
		}
		return _this;
	}
	MinecraftModelGeometry.computeAttributes = function (model) {
		var builder = new GroupedAttributesBuilder(model.textures);
		for (var _i = 0, _a = model.elements; _i < _a.length; _i++) {
			var element = _a[_i];
			var from = element.from,
				to = element.to,
				rotation = element.rotation;
			var cornerVertices = getCornerVertices(from, to);
			var rotatedVertices = rotation
				? rotateCubeCorners(cornerVertices, rotation)
				: cornerVertices;
			for (var name_1 in element.faces) {
				var faceName = name_1;
				var face = element.faces[faceName];
				if (face === undefined) {
					continue;
				}
				var _b = builder.getContext(face.texture),
					vertices = _b.vertices,
					uvs = _b.uvs,
					indices = _b.indices;
				var i = vertices.length / 3;
				indices.push(i, i + 2, i + 1);
				indices.push(i, i + 3, i + 2);
				for (
					var _c = 0,
						_d = applyVertexMapRotation(
							face.rotation || 0,
							vertexMaps[faceName]
						);
					_c < _d.length;
					_c++
				) {
					var index = _d[_c];
					vertices.push.apply(vertices, rotatedVertices[index]);
				}
				var faceUvs = face.uv || generateDefaultUvs(faceName, from, to);
				var _e = computeNormalizedUvs(faceUvs),
					u1 = _e[0],
					v1 = _e[1],
					u2 = _e[2],
					v2 = _e[3];
				uvs.push(u1, v2);
				uvs.push(u1, v1);
				uvs.push(u2, v1);
				uvs.push(u2, v2);
			}
		}
		return builder.getAttributes();
	};
	return MinecraftModelGeometry;
})(three_1.BufferGeometry);
exports.MinecraftModelGeometry = MinecraftModelGeometry;
