'use strict';

function processArray(arr, acc){
	return arr.reduceRight(function(prev, curr){
		if (prev) {
			prev.unshift(',');
		}
		return traverse(curr, acc);
	}, []);
}

function traverse(obj, acc){
	if(obj.type === 'MemberExpression'){
		acc.unshift('.' + obj.property.name);
		return traverse(obj.object, acc);
	}else if(obj.type === 'Identifier'){
		acc.unshift(obj.name);
		return acc;
	}else if(obj.type === 'Literal'){
		acc.unshift(obj.raw);
		return acc;
	}else if(obj.type === 'CallExpression'){
		acc.unshift(')');
		acc.unshift(processArray(obj.arguments, acc));
		acc.unshift('(');
		return traverse(obj.callee, acc);
	}else if(obj.type === 'ArrayExpression'){
		acc.unshift(']');
		acc.unshift(processArray(obj.elements, acc));
		acc.unshift('[');
	}else if(obj.type == 'ObjectExpression'){
		acc.unshift('}');
		acc.unshift(processArray(obj.properties, acc));
		acc.unshift('{');
	}else if(obj.type === 'Property'){
		acc.unshift(traverse(obj.value, acc));
		acc.unshift(':');
		acc.unshift(traverse(obj.key, acc));
		return acc;
	}
}

module.exports = function(obj){
	return (traverse(obj, [';']).join(''));
};
