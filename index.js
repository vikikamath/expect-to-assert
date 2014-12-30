'use strict';

var a;

function t(o){
	if (Array.isArray(o)){
		o.forEach(function(i){
			t(i);
			a.push(',');
		});
		// remove the trailing comma from arguments, objects or array items.
		if (a[a.length - 1] === ','){
			a.pop();
		}
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

			if (o.property.type === 'Literal'){ // handles bracket notation
				a.push("[");
			} else { // and dot notation
				a.push('.');
			}
			t(o.property);

			if (o.property.type === 'Literal') {
				a.push("]");
			}
		} else if (o.type === 'ReturnStatement'){
			a.push('return ');
			t(o.argument);
			a.push(';');
		} else if (o.type === 'BlockStatement'){
			t(o.body);
		} else if (o.type === 'ExpressionStatement'){
			t(o.expression);
			a.push(';');
		}else if (o.type === 'FunctionExpression'){
			a.push('function ');
			if (o.id && o.id !== null){
				a.push(o.id);
			}
			a.push('(');
			if (o.params.length){
				t(o.params);
			}
			a.push('){');
			t(o.body);
			a.push('}');
		}

	}
}

module.exports = function(obj){
	a = new Array();
	t(obj);
	// a.push(';');
	return a.join('');
};
