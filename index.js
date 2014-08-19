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

Bloater.prototype.addState = function (name, mapping) {
	bloater.states.push({
		name: name,
		mapping: mapping
	});
	return this;
};

 Bloater.prototype.get = function (state) {
	var st,
		ent = this.entity,
		obj = {};
	this.states.forEach(function (s) {
		if (s.name === state) {
			st = s;
		}
	});

	st.mapping.forEach(function (property) {
		if (ent.hasOwnProperty(property)) {
			obj[property] = ent[property];
		}
	});

	return obj;
};
	
module.exports = bloater;