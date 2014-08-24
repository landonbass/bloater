/**
 * Convert objects based on desired 'state'
 *
 * 
 * 
 */
 
 'use strict';
 
var Bloater = function () {
	this.entity = {};
	this.states = [];
}
	, bloater = new Bloater();

Bloater.prototype.set = function (e) {
	this.entity = e;
	return this;
};

Bloater.prototype.clearStates = function () {
	bloater.states = [];
	return this;
};

Bloater.prototype.addState = function (state) {
	this.states.push({
		name: state.name,
		mapping: state.mapping
	});
	return this;
};

 Bloater.prototype.get = function (stateName) {
	var selectedState,
		ent = this.entity,
		obj = {};
	this.states.forEach(function (state) {
		if (state.name === stateName) {
			selectedState = state;
		}
	});

	selectedState.mapping.forEach(function (property) {
		if (ent.hasOwnProperty(property)) {
			obj[property] = ent[property];
		}
	});

	return obj;
};
	
module.exports = bloater;