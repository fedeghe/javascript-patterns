var assert = require('assert'),
	
	solution = require('../es3');

describe('ex. 3', function() {
	describe('#solution()', function() {
		var fname1 = 'test/poly1.txt',
			fname2 = 'test/poly2.txt';
		it('shape buckets (' + fname1 + ')', function(done) {
			solution(fname1, function (r) {
				assert.equal(3, r.triangles.length);
				assert.equal(1, r.squares.length);
				assert.equal(2, r.rectangles.length);
				assert.equal(2, r.anything_else.length);
				done();
			});
		});
		it('shape buckets (' + fname2 + ')', function(done) {
			solution(fname2, function (r) {
				assert.equal(2, r.triangles.length);
				assert.equal(1, r.squares.length);
				assert.equal(2, r.rectangles.length);
				assert.equal(3, r.anything_else.length);
				done();
			});
		});
	});
});