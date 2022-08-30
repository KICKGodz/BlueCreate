(function (global) {
	var LiteGraph = global.LiteGraph;

	// Press - Presses Items or Liquids into Sheets or other Products
	function Press() {
		this.addInput('Item / Liquid', 'string');
		this.size = [180, 180];
	}

	Press.title = 'Press';
	Press.desc = 'Presses Items or Liquids into Sheets or other Products';

	Press.prototype.getTitle = function () {
		if (this.flags.collapsed) {
			return this.properties.value;
		}
		return this.title;
	};

	LiteGraph.registerNodeType('Machine/Press', Press);

	// Mixer - Mixes Items and/or/nor Liquids to make a Product
	function Mixer() {
		this.addInput('Item / Liquid', 'string');
		this.size = [180, 180];
	}

	Mixer.title = 'Mixer';
	Mixer.desc = 'Mixes Items and/or/nor Liquids to make a Product';

	Mixer.prototype.getTitle = function () {
		if (this.flags.collapsed) {
			return this.properties.value;
		}
		return this.title;
	};

	LiteGraph.registerNodeType('Machine/Mixer', Mixer);

	// Crushing Wheel - Crushes Down Items into other Products
	function CrushingWheels() {
		this.addInput('Item', 'string');
		this.size = [180, 180];
	}

	CrushingWheels.title = 'Crushing Wheels';
	CrushingWheels.desc = 'Crushes Down Items into other Products';

	CrushingWheels.prototype.getTitle = function () {
		if (this.flags.collapsed) {
			return this.properties.value;
		}
		return this.title;
	};

	LiteGraph.registerNodeType('Machine/Crushing Wheels', CrushingWheels);
})(this);
