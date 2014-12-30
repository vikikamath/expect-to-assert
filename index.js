'use strict';

var a;

function t(o){
	if (Array.isArray(o)){
		o.forEach(function(i){
			t(i);
			a.push(',');
		});
		// remove the trailing comma from arguments, objects or array items.
		a.pop();
	} else if (o && typeof o === 'object'){
		if (o.type === 'Literal'){
			a.push(o.raw);
		} else if (o.type === 'Identifier'){
			a.push(o.name);
		} else if (o.type === 'Property'){
			t(o.key);
			a.push(':');
			t(o.value);
		} else if (o.type === 'ObjectExpression'){
			a.push('{');
			t(o.properties);
			a.push('}');
		} else if (o.type === 'ArrayExpression'){
			a.push('[');
			t(o.elements);
			a.push(']');
		} else if (o.type === 'CallExpression'){
			t(o.callee);
			a.push('(');
			t(o.arguments);
			a.push(')');
		} else if (o.type === 'MemberExpression'){
			t(o.object);
			a.push('.');
			t(o.property);
		}

	}
}

module.exports = function(obj){
	a = new Array();
	t(obj);
	a.push(';');
	return a.join('');
};
