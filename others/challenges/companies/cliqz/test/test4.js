var assert = require('assert'),
	s = require('../es4');

describe('ex. 3 more memoization', function() {
	describe('helpers functions', function() {

		describe('#matMultSq2()', function () {
			it('should return the input (mult against unity matrix)', function() {
				var m1 = [[2,3],[4,5]],
					I = [[1,0],[0,1]],
					res = JSON.stringify(s.matMultSq2(m1, I));
				assert.equal(res, '[[2,3],[4,5]]');
			});
			it('should return the right result, simple multiplication', function() {
				var m1 = [[4,3],[2,1]],
					I = [[0,1],[2,3]],
					res = JSON.stringify(s.matMultSq2(m1, I));
				assert.equal(res, '[[6,13],[2,5]]');
			});
			it('couterexample proofs cancellation law is not valid', function() {
				var m1 = [[0,0],[1,0]],
					I = [[0,0],[0,1]],
					res = JSON.stringify(s.matMultSq2(m1, I));
				assert.equal(res, '[[0,0],[0,0]]');
			});
			it('check A x Ainv = I', function() {
				var m1 = [[3,2],[1,1]],
					m2 = [[1,-2],[-1, 3]],
					res = JSON.stringify(s.matMultSq2(m1, m2));
				assert.equal(res, '[[1,0],[0,1]]');
			});
		});
		describe('#unitFibPow()', function () {
			it('should return the right matrix exp=1,2,8', function() {
				var res1 = JSON.stringify(s.unitFibPow(1)),
					res2 = JSON.stringify(s.unitFibPow(2)),
					res3 = JSON.stringify(s.unitFibPow(8));
				assert.equal(res1, '[[2,1],[1,1]]');
				assert.equal(res2, '[[5,3],[3,2]]');
				assert.equal(res3, '[[590237,199867],[199867,390370]]');
			});
		});
		describe('#factors()', function () {
			it('should return the right factors for 3,6,78,2343', function() {
				var res1 = JSON.stringify(s.factors(3)),
					res2 = JSON.stringify(s.factors(6)),
					res3 = JSON.stringify(s.factors(78)),
					res4 = JSON.stringify(s.factors(2343));
				assert.equal(res1, '[1,0]');
				assert.equal(res2, '[2,1]');
				assert.equal(res3, '[6,3,2,1]');
				assert.equal(res4, '[11,8,5,2,1,0]');
			});
		});
		describe('#matFactors()', function () {
			it('should return the right matrix factors the final multiplication', function() {
				var res1 = JSON.stringify(s.matFactors([1,0])),
					res2 = JSON.stringify(s.matFactors([2,1])),
					res3 = JSON.stringify(s.matFactors([6,3,2,1]));
				assert.equal(res1, '[[[2,1],[1,1]],[[1,1],[1,0]]]');
				assert.equal(res2, '[[[5,3],[3,2]],[[2,1],[1,1]]]');
				assert.equal(res3, '[[[177565,857723],[857723,319842]],[[34,21],[21,13]],[[5,3],[3,2]],[[2,1],[1,1]]]');
			});
		});
		describe('#multMats()', function () {
			it('should multiply correctly the matrices', function() {
				var res1 = JSON.stringify(s.multMats([[[2,1],[1,1]],[[1,1],[1,0]]])),
					res2 = JSON.stringify(s.multMats([[[5,3],[3,2]],[[2,1],[1,1]]])),
					res3= JSON.stringify(s.multMats([[[177565,857723],[857723,319842]],[[34,21],[21,13]],[[5,3],[3,2]],[[2,1],[1,1]]]));
				assert.equal(res1, '[[3,2],[2,1]]');
				assert.equal(res2, '[[13,8],[8,5]]');
				assert.equal(res3, '[[676221,791464],[791464,884757]]');
			});
		});
	});
	describe('The solution()', function() {
		it('- check results of the following input 0, 1, 2, 3, 8, 9, 10, 11, 139, 339, 1339, 10k, 20k', function() {
			assert.equal(0, s.solution(0));
			assert.equal(1, s.solution(1));
			assert.equal(1, s.solution(2));
			assert.equal(2, s.solution(3));
			assert.equal(21, s.solution(8));
			assert.equal(34, s.solution(9));
			assert.equal(55, s.solution(10));
			assert.equal(89, s.solution(11));
			assert.equal(916261, s.solution(139));
			assert.equal(141186, s.solution(339));
			assert.equal(797061, s.solution(1339));
			assert.equal(366875, s.solution(10000));
			assert.equal(093125, s.solution(20000));
			assert.equal(badFib(20) , s.solution(20)); //just a check against badFib
		});
		it('- time comparison against badFib (recursive oneline implementation)', function(done) {
			var t2, t11, t12,
				t2, t21, t22,
				inp = 40,
				attempts = 400;

			t11 = +new Date;
			for (var i = 0; i < attempts; i++) {
				s.solution(inp);
			}
			t12 = +new Date;
			t1 = (t12 - t11) / attempts;

			t21 = +new Date;
			// badFib(inp);
			t22 = +new Date;
			t2 = t22 - t21;
			done();
			console.log("\tOptimized: "+t1 + "ms");
			// console.log("\tbadFib: " + t2 + "ms");
		});
	});
});


// comparison in time of badFig against s.solution is more than crazy, eg:
// input 30 -> badFib took +1400ms
// 			-> s.solution looked still not measurable (0ms)
function badFib(n) {
	return n < 2 ? n : (badFib(n-1)%1E6 + badFib(n-2)%1E6);
}


