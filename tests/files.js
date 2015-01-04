'use strict';

var fs = require('fs'),
		traverse = require('../'),
		chirp = require('../chirp');

describe("Reading code from files", function() {
	var fileContents;

	function readFileSynchronously(name, cb){
		// why sync? read the whole file before testing
		fileContents = fs.readFileSync( name, 'utf8');
		cb();
	}

	describe("simple file", function() {

		beforeEach(function(done){
			return readFileSynchronously('./fixtures/empty_use_strict.js', done);
		});

		it("should parse all 'expect' statements in fileContents", function(done) {
			chirp.equal(fileContents.toString(), "'use strict';\n");
			done();
		});

		afterEach(function(done) {
			fileContents = undefined;
			done();
		});

	});

	describe("Reading from a testfile with single var but multiple variable declarations", function() {

		beforeEach(function(done) {
			return readFileSynchronously('./fixtures/single_var_statements.js', done);
		});

		it("should parse variable declarations with single var correctly", function(done) {
			chirp.equal(traverse(fileContents.toString()), fileContents.toString());
			done();
		});

		afterEach(function(done) {
			fileContents = undefined;
			done();
		});

	});

	describe("Reading from a testfile with multiple variable declarations", function() {

		beforeEach(function(done) {
			return readFileSynchronously('./fixtures/multiple_var_statements.js', done);
		});

		it("should parse variable declarations with single var correctly", function(done) {
			chirp.equal(traverse(fileContents.toString()), fileContents.toString());
			done();
		});

		afterEach(function(done) {
			fileContents = undefined;
			done();
		});

	});

	describe("Reading from a simple test file with only expect API", function() {

		beforeEach(function(done){
			return readFileSynchronously('./fixtures/actual_test_spec.js', done);
		});

		it("should parse all expect API statements", function(done) {
			chirp.equal(traverse(fileContents.toString()), fileContents.toString());
			done();
		});

		afterEach(function(done) {
			fileContents = undefined;
			done();
		});

	});
});



describe("Reading from a test file with both expect and assert API", function() {

});
