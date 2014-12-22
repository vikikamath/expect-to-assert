'use strict';
var assert = require('assert');
var transforms = require('./transforms');
var Chirp = function(){}; // meek-assert :)

Chirp.prototype.equal = function(){
	// NOTE: From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
		// You should not slice on arguments because it prevents optimizations in JavaScript engines (V8 for example).
		var args = Array.slice? Array.slice(arguments): Array.prototype.slice.call(arguments);
		Object.keys(transforms).forEach(function(xform){
			args.forEach(function(arg, i, arr){
				// mutate the args array
				return arr.splice(i, 1, transforms[xform].apply(null, [arg]));
			});
			console.log(xform + " applied, results -->" + args);
		});
		return assert.equal.apply(this, args);
};

Chirp.prototype.fail = assert.fail;

Chirp.prototype.ok = assert.ok;

// TODO: Define rest of Assert API here

module.exports = new Chirp();
