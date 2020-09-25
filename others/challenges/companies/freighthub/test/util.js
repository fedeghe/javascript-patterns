var assert = require('assert'),
	util = require('../lib/util.js');

describe('util', function() {

	describe('#isRect()', function() {
		it('definitely a rect (assume ∏/2 all)', function() {
			assert.equal(true, util.isRect([1,2,1,2]));
			assert.equal(true, util.isRect([3,2,3,2]));
			assert.equal(true, util.isRect([36,24,36,24]));
		});
		it('definitely not a rect (assume ∏/2 all)', function() {
			assert.equal(false, util.isRect([3,2,1,2]));
			assert.equal(false, util.isRect([3,2,5,2]));
			assert.equal(false, util.isRect([36,24,26,24]));
		});
	});

	describe('#isSquare()', function() {
		it('definitely a square (assume ∏/2 all)', function() {
			assert.equal(true, util.isSquare([1,1,1,1]));
			assert.equal(true, util.isSquare([3,3,3,3]));
			assert.equal(true, util.isSquare([32,32,32,32]));
		});
		it('definitely not a square (assume ∏/2 all)', function() {
			assert.equal(false, util.isSquare([3,2,1,2]));
			assert.equal(false, util.isSquare([3,2,5,2]));
			assert.equal(false, util.isSquare([36,24,26,24]));
		});
	});

	describe('#str2intArr()', function() {
		it('conversion ok', function() {
			assert.equal(JSON.stringify([1,2,3]), JSON.stringify(util.str2intArr(['1','2','3'])));
			assert.equal(JSON.stringify([4,2,3]), JSON.stringify(util.str2intArr(['4','2','3'])));
		});
	});
});