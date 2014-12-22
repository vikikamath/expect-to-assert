'use strict';

var slice = Array.slice? Array.slice: Array.prototype.slice;

function toLocaleLowerCase() {
	return arguments[0].toLocaleLowerCase();
}

function removeExtraWhiteSpaces() {
	return arguments[0].replace(/\s+/g, '');
}

module.exports = {
	'toLocaleLowerCase': toLocaleLowerCase,
	'removeExtraWhiteSpaces': removeExtraWhiteSpaces
};
