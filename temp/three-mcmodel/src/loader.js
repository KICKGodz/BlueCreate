'use strict';
exports.__esModule = true;
exports.AbstractLoader = void 0;
var three_1 = require('three');
var AbstractLoader = /** @class */ (function () {
	function AbstractLoader(manager) {
		if (manager === void 0) {
			manager = three_1.DefaultLoadingManager;
		}
		this.manager = manager;
		this.path = '';
	}
	AbstractLoader.prototype.setPath = function (value) {
		this.path = value;
		return this;
	};
	return AbstractLoader;
})();
exports.AbstractLoader = AbstractLoader;
