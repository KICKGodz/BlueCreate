require = (function () {
	function r(e, n, t) {
		function o(i, f) {
			if (!n[i]) {
				if (!e[i]) {
					var c = 'function' == typeof require && require;
					if (!f && c) return c(i, !0);
					if (u) return u(i, !0);
					var a = new Error("Cannot find module '" + i + "'");
					throw ((a.code = 'MODULE_NOT_FOUND'), a);
				}
				var p = (n[i] = { exports: {} });
				e[i][0].call(
					p.exports,
					function (r) {
						var n = e[i][1][r];
						return o(n || r);
					},
					p,
					p.exports,
					r,
					e,
					n,
					t
				);
			}
			return n[i].exports;
		}
		for (
			var u = 'function' == typeof require && require, i = 0;
			i < t.length;
			i++
		)
			o(t[i]);
		return o;
	}
	return r;
})()(
	{
		1: [
			function (require, module, exports) {
				'use strict';
				Object.defineProperty(exports, '__esModule', { value: true });
				exports.Display =
					exports.validateDisplayJson =
					exports.DisplayPosition =
						void 0;
				var error_1 = require('./error');
				var utils_1 = require('./utils');
				var vector_1 = require('./vector');
				var DisplayPosition;
				(function (DisplayPosition) {
					DisplayPosition['GUI'] = 'gui';
					DisplayPosition['HEAD'] = 'head';
					DisplayPosition['GROUND'] = 'ground';
					DisplayPosition['FIXED'] = 'fixed';
					DisplayPosition['THIRDPERSON_RIGHTHAND'] =
						'thirdperson_righthand';
					DisplayPosition['THIRDPERSON_LEFTHAND'] =
						'thirdperson_lefthand';
					DisplayPosition['FIRSTPERSON_RIGHTHAND'] =
						'firstperson_righthand';
					DisplayPosition['FIRSTPERSON_LEFTHAND'] =
						'firstperson_lefthand';
				})(
					(DisplayPosition =
						exports.DisplayPosition ||
						(exports.DisplayPosition = {}))
				);
				function validateDisplayJson(json) {
					if (!utils_1.isObject(json)) {
						throw new error_1.ModelValidationError(
							'Invalid element display: ' + JSON.stringify(json)
						);
					}
					if (json.rotation != null) {
						vector_1.validateVec3(json.rotation);
					}
					if (json.translation != null) {
						vector_1.validateVec3(json.translation);
					}
					if (json.scale != null) {
						vector_1.validateVec3(json.scale);
					}
					return true;
				}
				exports.validateDisplayJson = validateDisplayJson;
				var Display = /** @class */ (function () {
					function Display(rotation, translation, scale) {
						this.rotation = rotation;
						this.translation = translation;
						this.scale = scale;
						this.translation = translation.map(function (n) {
							return utils_1.clamp(n, -80, 80);
						});
						this.scale = scale.map(function (n) {
							return utils_1.clamp(n, 0, 4);
						});
					}
					Display.fromJson = function (json) {
						var _a, _b, _c;
						return new Display(
							(_a = json.rotation) !== null && _a !== void 0
								? _a
								: [0, 0, 0],
							(_b = json.translation) !== null && _b !== void 0
								? _b
								: [0, 0, 0],
							(_c = json.scale) !== null && _c !== void 0
								? _c
								: [1, 1, 1]
						);
					};
					return Display;
				})();
				exports.Display = Display;
			},
			{ './error': 3, './utils': 6, './vector': 7 },
		],
		2: [
			function (require, module, exports) {
				'use strict';
				var __values =
					(this && this.__values) ||
					function (o) {
						var s = typeof Symbol === 'function' && Symbol.iterator,
							m = s && o[s],
							i = 0;
						if (m) return m.call(o);
						if (o && typeof o.length === 'number')
							return {
								next: function () {
									if (o && i >= o.length) o = void 0;
									return { value: o && o[i++], done: !o };
								},
							};
						throw new TypeError(
							s
								? 'Object is not iterable.'
								: 'Symbol.iterator is not defined.'
						);
					};
				Object.defineProperty(exports, '__esModule', { value: true });
				exports.Element =
					exports.validateElementJson =
					exports.ElementRotation =
					exports.validateElementRotationJson =
					exports.RotationAxis =
						void 0;
				var error_1 = require('./error');
				var face_1 = require('./face');
				var utils_1 = require('./utils');
				var vector_1 = require('./vector');
				var RotationAxis;
				(function (RotationAxis) {
					RotationAxis['X'] = 'x';
					RotationAxis['Y'] = 'y';
					RotationAxis['Z'] = 'z';
				})(
					(RotationAxis =
						exports.RotationAxis || (exports.RotationAxis = {}))
				);
				function validateElementRotationJson(json) {
					var e_1, _a;
					if (!utils_1.isObject(json)) {
						throw new error_1.ModelValidationError(
							'Invalid element rotation: ' + JSON.stringify(json)
						);
					}
					try {
						for (
							var _b = __values(['origin', 'angle', 'axis']),
								_c = _b.next();
							!_c.done;
							_c = _b.next()
						) {
							var prop = _c.value;
							if (!(prop in json)) {
								throw new error_1.ModelValidationError(
									'Element rotation is missing property "' +
										prop +
										'"'
								);
							}
						}
					} catch (e_1_1) {
						e_1 = { error: e_1_1 };
					} finally {
						try {
							if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
						} finally {
							if (e_1) throw e_1.error;
						}
					}
					vector_1.validateVec3(json.origin);
					if (![-45, -22.5, 0, 22.5, 45].includes(json.angle)) {
						throw new error_1.ModelValidationError(
							'Invalid element rotation angle: ' +
								JSON.stringify(json.angle)
						);
					}
					if (!Object.values(RotationAxis).includes(json.axis)) {
						throw new error_1.ModelValidationError(
							'Invalid element rotation axis: ' +
								JSON.stringify(json.axis)
						);
					}
					if (
						json.rescale != null &&
						typeof json.rescale !== 'boolean'
					) {
						throw new error_1.ModelValidationError(
							'Invalid element rotation property "rescale": ' +
								JSON.stringify(json.rescale)
						);
					}
					return true;
				}
				exports.validateElementRotationJson =
					validateElementRotationJson;
				var ElementRotation = /** @class */ (function () {
					function ElementRotation(origin, angle, axis, rescale) {
						this.origin = origin;
						this.angle = angle;
						this.axis = axis;
						this.rescale = rescale;
					}
					ElementRotation.fromJson = function (json) {
						var _a;
						return new ElementRotation(
							json.origin,
							json.angle,
							json.axis,
							(_a = json.rescale) !== null && _a !== void 0
								? _a
								: false
						);
					};
					return ElementRotation;
				})();
				exports.ElementRotation = ElementRotation;
				function validateElementJson(json) {
					var e_2, _a, e_3, _b;
					if (!utils_1.isObject(json)) {
						throw new error_1.ModelValidationError(
							'Invalid element: ' + JSON.stringify(json)
						);
					}
					try {
						for (
							var _c = __values(['from', 'to']), _d = _c.next();
							!_d.done;
							_d = _c.next()
						) {
							var prop = _d.value;
							if (!(prop in json)) {
								throw new error_1.ModelValidationError(
									'Element is missing property "' + prop + '"'
								);
							}
						}
					} catch (e_2_1) {
						e_2 = { error: e_2_1 };
					} finally {
						try {
							if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
						} finally {
							if (e_2) throw e_2.error;
						}
					}
					vector_1.validateVec3(json.from);
					vector_1.validateVec3(json.to);
					if (json.faces == null) {
						throw new error_1.ModelValidationError(
							'Element is missing property "faces"'
						);
					} else {
						var faceNames = Object.values(face_1.FaceType);
						try {
							for (
								var _e = __values(Object.keys(json.faces)),
									_f = _e.next();
								!_f.done;
								_f = _e.next()
							) {
								var face = _f.value;
								if (!faceNames.includes(face)) {
									throw new error_1.ModelValidationError(
										'Invalid element face name: ' +
											JSON.stringify(face)
									);
								}
							}
						} catch (e_3_1) {
							e_3 = { error: e_3_1 };
						} finally {
							try {
								if (_f && !_f.done && (_b = _e.return))
									_b.call(_e);
							} finally {
								if (e_3) throw e_3.error;
							}
						}
					}
					if (json.rotation != null) {
						validateElementRotationJson(json.rotation);
					}
					if (json.shade != null && typeof json.shade !== 'boolean') {
						throw new error_1.ModelValidationError(
							'Invalid element shade: ' +
								JSON.stringify(json.shade)
						);
					}
					if (json.name != null && typeof json.name !== 'string') {
						throw new error_1.ModelValidationError(
							'Invalid element name: ' + JSON.stringify(json.name)
						);
					}
					if (
						json.__comment != null &&
						typeof json.__comment !== 'string'
					) {
						throw new error_1.ModelValidationError(
							'Invalid element comment: ' +
								JSON.stringify(json.__comment)
						);
					}
					return true;
				}
				exports.validateElementJson = validateElementJson;
				var Element = /** @class */ (function () {
					function Element(from, to, faces, rotation, shade, name) {
						this.from = from;
						this.to = to;
						this.faces = faces;
						this.rotation = rotation;
						this.name = name;
						this.shade =
							shade !== null && shade !== void 0 ? shade : true;
					}
					Element.fromJson = function (json) {
						var e_4, _a;
						var _b;
						var faces = {};
						try {
							for (
								var _c = __values(Object.keys(json.faces)),
									_d = _c.next();
								!_d.done;
								_d = _c.next()
							) {
								var face = _d.value;
								faces[face] = face_1.Face.fromJson(
									json.faces[face]
								);
							}
						} catch (e_4_1) {
							e_4 = { error: e_4_1 };
						} finally {
							try {
								if (_d && !_d.done && (_a = _c.return))
									_a.call(_c);
							} finally {
								if (e_4) throw e_4.error;
							}
						}
						return new Element(
							json.from,
							json.to,
							faces,
							json.rotation
								? ElementRotation.fromJson(json.rotation)
								: undefined,
							json.shade,
							(_b = json.name) !== null && _b !== void 0
								? _b
								: json.__comment
						);
					};
					return Element;
				})();
				exports.Element = Element;
			},
			{ './error': 3, './face': 4, './utils': 6, './vector': 7 },
		],
		3: [
			function (require, module, exports) {
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
										if (
											Object.prototype.hasOwnProperty.call(
												b,
												p
											)
										)
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
				Object.defineProperty(exports, '__esModule', { value: true });
				exports.ModelValidationError = void 0;
				var ModelValidationError = /** @class */ (function (_super) {
					__extends(ModelValidationError, _super);
					function ModelValidationError(msg) {
						var _newTarget = this.constructor;
						var _this = _super.call(this, msg) || this;
						Object.setPrototypeOf(_this, _newTarget.prototype);
						_this.name = ModelValidationError.name;
						return _this;
					}
					return ModelValidationError;
				})(Error);
				exports.ModelValidationError = ModelValidationError;
			},
			{},
		],
		4: [
			function (require, module, exports) {
				'use strict';
				Object.defineProperty(exports, '__esModule', { value: true });
				exports.Face =
					exports.validateFaceJson =
					exports.FaceType =
						void 0;
				var error_1 = require('./error');
				var utils_1 = require('./utils');
				var vector_1 = require('./vector');
				var FaceType;
				(function (FaceType) {
					FaceType['WEST'] = 'west';
					FaceType['EAST'] = 'east';
					FaceType['DOWN'] = 'down';
					FaceType['UP'] = 'up';
					FaceType['NORTH'] = 'north';
					FaceType['SOUTH'] = 'south';
				})((FaceType = exports.FaceType || (exports.FaceType = {})));
				function validateFaceJson(json) {
					if (!utils_1.isObject(json)) {
						throw new error_1.ModelValidationError(
							'Invalid face: ' + JSON.stringify(json)
						);
					}
					if (
						!(
							json.texture != null &&
							typeof json.texture === 'string' &&
							json.texture.length >= 2 &&
							json.texture.startsWith('#')
						)
					) {
						throw new error_1.ModelValidationError(
							'Invalid face texture: ' +
								JSON.stringify(json.texture)
						);
					}
					if (json.uv != null) {
						vector_1.validateVec4(json.uv);
					}
					if (
						json.cullface != null &&
						!Object.values(FaceType).includes(json.cullface)
					) {
						throw new error_1.ModelValidationError(
							'Face has invalid cullface: ' +
								JSON.stringify(json.cullface)
						);
					}
					if (
						json.rotation != null &&
						![0, 90, 180, 270].includes(json.rotation)
					) {
						throw new error_1.ModelValidationError(
							'Invalid face rotation: ' +
								JSON.stringify(json.rotation)
						);
					}
					if (
						json.tintindex != null &&
						typeof json.tintindex !== 'number'
					) {
						throw new error_1.ModelValidationError(
							'Invalid face tintindex: ' +
								JSON.stringify(json.tintindex)
						);
					}
					return true;
				}
				exports.validateFaceJson = validateFaceJson;
				var Face = /** @class */ (function () {
					function Face(texture, rotation, uv, cullface, tintindex) {
						this.texture = texture;
						this.rotation = rotation;
						this.uv = uv;
						this.cullface = cullface;
						this.tintindex = tintindex;
					}
					Face.fromJson = function (json) {
						var _a;
						return new Face(
							json.texture,
							(_a = json.rotation) !== null && _a !== void 0
								? _a
								: 0,
							json.uv,
							json.cullface,
							json.tintindex
						);
					};
					return Face;
				})();
				exports.Face = Face;
			},
			{ './error': 3, './utils': 6, './vector': 7 },
		],
		5: [
			function (require, module, exports) {
				'use strict';
				// Types for minecraft json models (see https://minecraft.fandom.com/wiki/Model)
				var __values =
					(this && this.__values) ||
					function (o) {
						var s = typeof Symbol === 'function' && Symbol.iterator,
							m = s && o[s],
							i = 0;
						if (m) return m.call(o);
						if (o && typeof o.length === 'number')
							return {
								next: function () {
									if (o && i >= o.length) o = void 0;
									return { value: o && o[i++], done: !o };
								},
							};
						throw new TypeError(
							s
								? 'Object is not iterable.'
								: 'Symbol.iterator is not defined.'
						);
					};
				var __read =
					(this && this.__read) ||
					function (o, n) {
						var m =
							typeof Symbol === 'function' && o[Symbol.iterator];
						if (!m) return o;
						var i = m.call(o),
							r,
							ar = [],
							e;
						try {
							while (
								(n === void 0 || n-- > 0) &&
								!(r = i.next()).done
							)
								ar.push(r.value);
						} catch (error) {
							e = { error: error };
						} finally {
							try {
								if (r && !r.done && (m = i['return']))
									m.call(i);
							} finally {
								if (e) throw e.error;
							}
						}
						return ar;
					};
				Object.defineProperty(exports, '__esModule', { value: true });
				exports.resolveModelJson =
					exports.resolveModelHierarchy =
					exports.MinecraftModel =
					exports.validateMinecraftModelJson =
					exports.validateGroupJson =
						void 0;
				var display_1 = require('./display');
				var element_1 = require('./element');
				var error_1 = require('./error');
				var utils_1 = require('./utils');
				var vector_1 = require('./vector');
				function validateGroupJson(json) {
					var e_1, _a;
					if (!utils_1.isObject(json)) {
						throw new error_1.ModelValidationError(
							'Invalid group: ' + JSON.stringify(json)
						);
					}
					try {
						for (
							var _b = __values(['name', 'origin', 'children']),
								_c = _b.next();
							!_c.done;
							_c = _b.next()
						) {
							var prop = _c.value;
							if (!(prop in json)) {
								throw new error_1.ModelValidationError(
									'Group is missing property "' + prop + '"'
								);
							}
						}
					} catch (e_1_1) {
						e_1 = { error: e_1_1 };
					} finally {
						try {
							if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
						} finally {
							if (e_1) throw e_1.error;
						}
					}
					if (typeof json.name !== 'string') {
						throw new error_1.ModelValidationError(
							'Invalid group name: ' + JSON.stringify(json.name)
						);
					}
					vector_1.validateVec3(json.origin);
					if (!Array.isArray(json.children)) {
						throw new error_1.ModelValidationError(
							'Invalid group children: ' +
								JSON.stringify(json.children)
						);
					}
					json.children.forEach(function (c) {
						return typeof c === 'number' || validateGroupJson(c);
					});
					return true;
				}
				exports.validateGroupJson = validateGroupJson;
				function validateMinecraftModelJson(json) {
					var e_2, _a;
					if (!utils_1.isObject(json)) {
						throw new error_1.ModelValidationError(
							'Invalid model: ' + JSON.stringify(json)
						);
					}
					if (
						json.parent != null &&
						typeof json.parent !== 'string'
					) {
						throw new error_1.ModelValidationError(
							'Invalid property "parent": ' +
								JSON.stringify(json.parent)
						);
					}
					if (json.textures != null) {
						if (
							!utils_1.isObject(json.textures) ||
							!Object.entries(json.textures).every(function (_a) {
								var _b = __read(_a, 2),
									name = _b[0],
									texture = _b[1];
								return (
									typeof name === 'string' &&
									typeof texture === 'string'
								);
							})
						) {
							throw new error_1.ModelValidationError(
								'Invalid property "textures": ' +
									JSON.stringify(json.textures)
							);
						}
					}
					if (json.elements != null) {
						if (!Array.isArray(json.elements)) {
							throw new error_1.ModelValidationError(
								'Invalid property "elements": ' +
									JSON.stringify(json.elements)
							);
						}
					}
					if (json.display != null) {
						if (!utils_1.isObject(json.display)) {
							throw new error_1.ModelValidationError(
								'Invalid property "display": ' +
									JSON.stringify(json.display)
							);
						}
						var positions = Object.values(
							display_1.DisplayPosition
						);
						try {
							for (
								var _b = __values(Object.keys(json.display)),
									_c = _b.next();
								!_c.done;
								_c = _b.next()
							) {
								var position = _c.value;
								if (!positions.includes(position)) {
									throw new error_1.ModelValidationError(
										'Unknown display type: ' +
											JSON.stringify(position)
									);
								}
							}
						} catch (e_2_1) {
							e_2 = { error: e_2_1 };
						} finally {
							try {
								if (_c && !_c.done && (_a = _b.return))
									_a.call(_b);
							} finally {
								if (e_2) throw e_2.error;
							}
						}
					}
					if (
						json.ambientocclusion != null &&
						typeof json.ambientocclusion !== 'boolean'
					) {
						throw new error_1.ModelValidationError(
							'Invalid property "ambientocclusion": ' +
								JSON.stringify(json.ambientocclusion)
						);
					}
					if (json.groups != null) {
						if (!Array.isArray(json.groups)) {
							throw new error_1.ModelValidationError(
								'Invalid property "groups": ' +
									JSON.stringify(json.groups)
							);
						}
						json.groups.forEach(function (c) {
							return (
								typeof c === 'number' || validateGroupJson(c)
							);
						});
					}
					return true;
				}
				exports.validateMinecraftModelJson = validateMinecraftModelJson;
				var MinecraftModel = /** @class */ (function () {
					function MinecraftModel(
						elements,
						textures,
						parent,
						display,
						groups,
						ambientocclusion
					) {
						this.elements = elements;
						this.textures = textures;
						this.parent = parent;
						this.display = display;
						this.groups = groups;
						this.ambientocclusion =
							ambientocclusion !== null &&
							ambientocclusion !== void 0
								? ambientocclusion
								: true;
					}
					MinecraftModel.fromJson = function (json) {
						var e_3, _a;
						var _b, _c, _d;
						var displayPositions = undefined;
						if (json.display != null) {
							displayPositions = {};
							try {
								for (
									var _e = __values(
											Object.entries(json.display)
										),
										_f = _e.next();
									!_f.done;
									_f = _e.next()
								) {
									var _g = __read(_f.value, 2),
										position = _g[0],
										displayJson = _g[1];
									displayPositions[position] =
										displayJson != null
											? display_1.Display.fromJson(
													displayJson
											  )
											: displayJson;
								}
							} catch (e_3_1) {
								e_3 = { error: e_3_1 };
							} finally {
								try {
									if (_f && !_f.done && (_a = _e.return))
										_a.call(_e);
								} finally {
									if (e_3) throw e_3.error;
								}
							}
						}
						return new MinecraftModel(
							(_c =
								(_b = json.elements) === null || _b === void 0
									? void 0
									: _b.map(function (e) {
											return element_1.Element.fromJson(
												e
											);
									  })) !== null && _c !== void 0
								? _c
								: [],
							(_d = json.textures) !== null && _d !== void 0
								? _d
								: {},
							json.parent,
							displayPositions,
							json.groups,
							json.ambientocclusion
						);
					};
					MinecraftModel.prototype.hasElements = function () {
						return (
							this.elements != null && this.elements.length >= 1
						);
					};
					return MinecraftModel;
				})();
				exports.MinecraftModel = MinecraftModel;
				function resolveModelHierarchy(root, ancestors) {
					var hierarchy = [root];
					var current = ancestors[root.parent];
					while (current != null) {
						hierarchy.push(current);
						current = ancestors[current.parent];
					}
					return hierarchy;
				}
				exports.resolveModelHierarchy = resolveModelHierarchy;
				function resolveModelJson(root, ancestors) {
					var e_4, _a, e_5, _b;
					var _c;
					var hierarchy = resolveModelHierarchy(root, ancestors);
					// Properties to resolve
					var elements;
					var ambientocclusion;
					var display;
					var groups;
					var textures = {};
					try {
						// Resolve top -> down
						for (
							var hierarchy_1 = __values(hierarchy),
								hierarchy_1_1 = hierarchy_1.next();
							!hierarchy_1_1.done;
							hierarchy_1_1 = hierarchy_1.next()
						) {
							var model = hierarchy_1_1.value;
							if (
								elements == null &&
								model.elements != null &&
								model.elements.length >= 1
							) {
								elements =
									(_c = model.elements) !== null &&
									_c !== void 0
										? _c
										: [];
							}
							if (
								ambientocclusion == null &&
								model.ambientocclusion != null
							) {
								ambientocclusion = model.ambientocclusion;
							}
							if (display == null && model.display) {
								display = model.display;
							}
							if (groups == null && model.groups) {
								groups = model.groups;
							}
						}
					} catch (e_4_1) {
						e_4 = { error: e_4_1 };
					} finally {
						try {
							if (
								hierarchy_1_1 &&
								!hierarchy_1_1.done &&
								(_a = hierarchy_1.return)
							)
								_a.call(hierarchy_1);
						} finally {
							if (e_4) throw e_4.error;
						}
					}
					try {
						// Resolve bottom -> up
						for (
							var _d = __values(hierarchy.reverse()),
								_e = _d.next();
							!_e.done;
							_e = _d.next()
						) {
							var model = _e.value;
							if (model.textures != null) {
								Object.assign(textures, model.textures);
							}
						}
					} catch (e_5_1) {
						e_5 = { error: e_5_1 };
					} finally {
						try {
							if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
						} finally {
							if (e_5) throw e_5.error;
						}
					}
					return {
						textures: textures,
						elements: elements,
						display: display,
						groups: groups,
						ambientocclusion: ambientocclusion,
					};
				}
				exports.resolveModelJson = resolveModelJson;
			},
			{
				'./display': 1,
				'./element': 2,
				'./error': 3,
				'./utils': 6,
				'./vector': 7,
			},
		],
		6: [
			function (require, module, exports) {
				'use strict';
				Object.defineProperty(exports, '__esModule', { value: true });
				exports.clamp = exports.isObject = void 0;
				function isObject(o) {
					return (
						typeof o === 'object' &&
						Array.isArray(o) === false &&
						o !== null
					);
				}
				exports.isObject = isObject;
				function clamp(num, min, max) {
					return Math.max(min, Math.min(num, max));
				}
				exports.clamp = clamp;
			},
			{},
		],
		7: [
			function (require, module, exports) {
				'use strict';
				Object.defineProperty(exports, '__esModule', { value: true });
				exports.validateVec4 =
					exports.isVec4 =
					exports.validateVec3 =
					exports.isVec3 =
						void 0;
				var error_1 = require('./error');
				function isVec3(vec) {
					return (
						Array.isArray(vec) &&
						vec.length === 3 &&
						vec.every(function (e) {
							return typeof e === 'number';
						})
					);
				}
				exports.isVec3 = isVec3;
				function validateVec3(vec) {
					if (!isVec3(vec)) {
						throw new error_1.ModelValidationError(
							'Invalid Vec3: ' + JSON.stringify(vec)
						);
					}
					return true;
				}
				exports.validateVec3 = validateVec3;
				function isVec4(vec) {
					return (
						Array.isArray(vec) &&
						vec.length === 4 &&
						vec.every(function (e) {
							return typeof e === 'number';
						})
					);
				}
				exports.isVec4 = isVec4;
				function validateVec4(vec) {
					if (!isVec4(vec)) {
						throw new error_1.ModelValidationError(
							'Invalid Vec4: ' + JSON.stringify(vec)
						);
					}
					return true;
				}
				exports.validateVec4 = validateVec4;
			},
			{ './error': 3 },
		],
		'@oran9e/minecraft-model': [
			function (require, module, exports) {
				'use strict';
				var __createBinding =
					(this && this.__createBinding) ||
					(Object.create
						? function (o, m, k, k2) {
								if (k2 === undefined) k2 = k;
								Object.defineProperty(o, k2, {
									enumerable: true,
									get: function () {
										return m[k];
									},
								});
						  }
						: function (o, m, k, k2) {
								if (k2 === undefined) k2 = k;
								o[k2] = m[k];
						  });
				var __exportStar =
					(this && this.__exportStar) ||
					function (m, exports) {
						for (var p in m)
							if (
								p !== 'default' &&
								!Object.prototype.hasOwnProperty.call(
									exports,
									p
								)
							)
								__createBinding(exports, m, p);
					};
				Object.defineProperty(exports, '__esModule', { value: true });
				__exportStar(require('./model'), exports);
				__exportStar(require('./element'), exports);
				__exportStar(require('./face'), exports);
				__exportStar(require('./display'), exports);
				__exportStar(require('./vector'), exports);
				__exportStar(require('./error'), exports);
			},
			{
				'./display': 1,
				'./element': 2,
				'./error': 3,
				'./face': 4,
				'./model': 5,
				'./vector': 7,
			},
		],
	},
	{},
	[]
);
