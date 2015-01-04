'use strict';

function toLocaleLowerCase() {
	return arguments[0].toString().toLocaleLowerCase();
}

function removeExtraWhiteSpaces() {
	return arguments[0].toString().replace(/\s+/g, '');
}

module.exports = {
	'toLocaleLowerCase': toLocaleLowerCase,
	'removeExtraWhiteSpaces': removeExtraWhiteSpaces
};
