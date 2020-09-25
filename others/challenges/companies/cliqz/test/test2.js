var assert = require('assert'),
	s = require('../es2');

describe('ex. 2', function() {
	describe('#solution()', function() {
		it('no solutions', function() {
			assert.equal(0, s(10, [1,1,1,1,1,1]));
			assert.equal(0, s(3, [1,1,1,1,1,1]));
			assert.equal(0, s(4, [4,4,4,4,4,4,5,6,7,8]));
			assert.equal(0, s(4, [4,-1,4,1,4,-1,-4,1,4,1]));
			assert.equal(0, s(1, [2,0,0,0,0,0,0,0,0,0]));
			assert.equal(0, s(4, [1,0,0,1,0,0,1,0,1,0]));
		});
		it('right # of solutions', function() {
			assert.equal(20, s(0, [4,-1,4,1,4,-1,-4,1,4,1]));
			assert.equal(1, s(2, [1,0,0,0,0,0,0,0,0,0]));
			assert.equal(2, s(10, [2,1,1,1,8,1]));
			assert.equal(6, s(10, [2, 8, 1, 9, 8]));
			assert.equal(8, s(10, [2, 3, 7, 9, 2, 1, 8]));
			assert.equal(7, s(10, [2, 8, 1, 9, 8, 5]));
			assert.equal(2, s(11, [2, 8, 1, 9, 8, 5]));
			assert.equal(4, s(13, [2, 8, 1, 9, 8, 5]));
		});
	});
});
