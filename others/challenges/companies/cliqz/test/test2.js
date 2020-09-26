var assert = require('assert'),
	s = require('../es2');

describe('ex. 2', function() {
	describe('#solution1()', function() {
		it('no solutions', function() {
			assert.equal(0, s.solution1(10, [1,1,1,1,1,1]));
			assert.equal(0, s.solution1(3, [1,1,1,1,1,1]));
			assert.equal(0, s.solution1(4, [4,4,4,4,4,4,5,6,7,8]));
			assert.equal(0, s.solution1(4, [4,-1,4,1,4,-1,-4,1,4,1]));
			assert.equal(0, s.solution1(1, [2,0,0,0,0,0,0,0,0,0]));
			assert.equal(0, s.solution1(4, [1,0,0,1,0,0,1,0,1,0]));
		});
		it('right # of solutions', function() {
			assert.equal(20, s.solution1(0, [4,-1,4,1,4,-1,-4,1,4,1]));
			assert.equal(1, s.solution1(2, [1,0,0,0,0,0,0,0,0,0]));
			assert.equal(2, s.solution1(10, [2,1,1,1,8,1]));
			assert.equal(6, s.solution1(10, [2, 8, 1, 9, 8]));
			assert.equal(8, s.solution1(10, [2, 3, 7, 9, 2, 1, 8]));
			assert.equal(7, s.solution1(10, [2, 8, 1, 9, 8, 5]));
			assert.equal(2, s.solution1(11, [2, 8, 1, 9, 8, 5]));
			assert.equal(4, s.solution1(13, [2, 8, 1, 9, 8, 5]));
		});
	});
});

describe('ex. 2', function() {
	describe('#solution2()', function() {
		it('no solutions', function() {
			assert.equal(0, s.solution2(10, [1,1,1,1,1,1]));
			assert.equal(0, s.solution2(3, [1,1,1,1,1,1]));
			assert.equal(0, s.solution2(4, [4,4,4,4,4,4,5,6,7,8]));
			assert.equal(0, s.solution2(4, [4,-1,4,1,4,-1,-4,1,4,1]));
			assert.equal(0, s.solution2(1, [2,0,0,0,0,0,0,0,0,0]));
			assert.equal(0, s.solution2(4, [1,0,0,1,0,0,1,0,1,0]));
		});
		it('right # of solutions', function() {
			assert.equal(20, s.solution2(0, [4,-1,4,1,4,-1,-4,1,4,1]));
			assert.equal(1, s.solution2(2, [1,0,0,0,0,0,0,0,0,0]));
			assert.equal(2, s.solution2(10, [2,1,1,1,8,1]));
			assert.equal(6, s.solution2(10, [2, 8, 1, 9, 8]));
			assert.equal(8, s.solution2(10, [2, 3, 7, 9, 2, 1, 8]));
			assert.equal(7, s.solution2(10, [2, 8, 1, 9, 8, 5]));
			assert.equal(2, s.solution2(11, [2, 8, 1, 9, 8, 5]));
			assert.equal(4, s.solution2(13, [2, 8, 1, 9, 8, 5]));
		});
	});
});
