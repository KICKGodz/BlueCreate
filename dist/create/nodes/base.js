(function (global) {
	var LiteGraph = global.LiteGraph;

	// Item - Allows for Item Inputs to Machines
	function Item() {
		this.addOutput('string', 'string');
		this.addProperty('value', '');
		this.widget = this.addWidget('text', 'value', '', 'value');
		this.widgets_up = true;
		this.size = [180, 30];
	}

	Item.title = 'Item';
	Item.desc = 'Allows for Item Inputs to Machines';

	Item.prototype.getTitle = function () {
		if (this.flags.collapsed) {
			return this.properties.value;
		}
		return this.title;
	};

	Item.prototype.onExecute = function () {
		this.setOutputData(0, this.properties['value']);
	};

	Item.prototype.setValue = function (v) {
		this.setProperty('value', v);
	};

	LiteGraph.registerNodeType('Base/Item', Item);

	// Liquid - Allows for Liquid Inputs to Machines
	function Liquid() {
		this.addOutput('string', 'string');
		this.addProperty('value', '');
		this.widget = this.addWidget('text', 'value', '', 'value');
		this.widgets_up = true;
		this.size = [180, 30];
	}

	Liquid.title = 'Liquid';
	Liquid.desc = 'Allows for Liquid Inputs to Machines';

	Liquid.prototype.getTitle = function () {
		if (this.flags.collapsed) {
			return this.properties.value;
		}
		return this.title;
	};

	Liquid.prototype.onExecute = function () {
		this.setOutputData(0, this.properties['value']);
	};

	Liquid.prototype.setValue = function (v) {
		this.setProperty('value', v);
	};

	LiteGraph.registerNodeType('Base/Liquid', Liquid);

	// Output - Changes the Output Location if the Node is Used
	function Output() {
		this.addInput('Item / Liquid');
		this.size = [180, 180];
	}

	Output.title = 'Output';
	Output.desc = 'Changes the Output Location if the Node is Used';

	Output.prototype.getTitle = function () {
		if (this.flags.collapsed) {
			return this.properties.value;
		}
		return this.title;
	};

	LiteGraph.registerNodeType('Base/Output', Output);
})(this);
