'use strict';
var esprima = require('esprima');
var traverse = require('./');
// var assert = require('assert');
var bufferSplit = require('buffer-split');
var chirp = require('./chirp');

function assertify(exprObj, test){
	return chirp.equal(traverse(exprObj), test);
}

// quickly assert a single line of Code
function assertifySingleLineOfCode(line){
	return assertify(esprima.parse(line, {})['body'][0]['expression'], line);
}

function assertifyMultipleLinesOfCode(lines){
	var linesArr = bufferSplit(lines, new Buffer('\r\n'));
	return esprima.parse(lines, {})['body'].every(function(e, i){
		// assures each expression statement is an element in 'body' array
		return assertify(e['expression'], linesArr[i].toString());
	});
}

describe("Validating traverse() correctly re-generates Expect API expressions from JSON generated by Esprima Parser", function() {
	it("Simple equality argument", function() {
		assertifySingleLineOfCode("expect(foo).to.equal('bar');");
	});

	it("Simple type argument", function() {
		assertifySingleLineOfCode("expect('test').to.be.a('string');");
	});

	it("Simple API that does not end in argument", function() {
		assertifySingleLineOfCode("expect(true).to.be.true;");
	});

	it("Simple property argument", function() {
		assertifySingleLineOfCode("expect(foo).to.have.length(3);");
	});

	it('Mutiple MemberExpressions and arguments', function(){
		assertifySingleLineOfCode("expect(tea).to.have.property('flavors').with.length(3);")
	});

	it("Test null", function() {
		assertifySingleLineOfCode("expect(null).to.be.a('null');")
	});

	it("Test undefined", function() {
		assertifySingleLineOfCode("expect(undefined).to.be.an('undefined');")
	});

	it("Simple Object argument", function() {
		assertifySingleLineOfCode("expect({ foo: 'bar' }).to.eql({ foo: 'bar' });");
	});

	it("Object nested in Array", function() {
		assertifySingleLineOfCode("expect([{ id: 1 }]).to.deep.include.members([{ id: 1 }]);");
	});

	it("Object(s) nested in Array", function() {
		assertifySingleLineOfCode("expect([{ id: 1 }, {id: 2}]).to.deep.include.members([{ id: 1 }, {id: 2}]);")
	});

	it("Object with multiple properties", function() {
		assertifySingleLineOfCode("expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');");
	});

	it("Simple Arrays", function() {
		assertifySingleLineOfCode("expect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);");
	});

	it("Deeply Nested Arrays", function() {
		assertifySingleLineOfCode("expect([ [1, 2, 3],[ ['S', 'T', 'R'],['I'], 'N'], 4]).to.include.members([1, 2, 3]);");
	});

	it("Deeply nested objects", function() {
		assertifySingleLineOfCode("expect({ two: { plus: { two: { is: four}}}}).to.have.property(two).that.is.an('object').that.deep.equals({ plus: { two: { is: four}}})")
	});

	it("Deeply nested mix", function() {
		assertifySingleLineOfCode("expect([[ 'chai', 'matcha', 'konacha' ], [ { tea: 'chai' }, { tea: 'matcha' }, { tea: 'konacha' } ]]).to.have.deep.property('[0][1]', 'matcha')");
	});

	it("Multiple Expect API lines", function() {
		assertifyMultipleLinesOfCode(new Buffer("expect(obj).to.have.property('foo').that.is.a('string');\r\nexpect(deepObj).to.have.property('green').that.is.an('object').that.deep.equals({ tea: 'matcha' });\r\nexpect(deepObj).to.have.property('teas').that.is.an('array').with.deep.property('[2]').that.deep.equals({ tea: 'konacha' });", 'utf-8'));
	});
});

