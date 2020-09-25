var assert = require('assert'),
	s = require('../es2');


describe('ex. 2', function() {
	describe('#solution()', function() {

		var data1 = [{
				requestId: 'poiax',
				startedAt: 1489744808,
				ttl: 8
			}, {
				requestId: 'kdfhd',
				startedAt: 1489744803,
				ttl: 3
			}, {
				requestId: 'uqwyet',
				startedAt: 1489744806,
				ttl: 12
			}, {
				requestId: 'qewaz',
				startedAt: 1489744810,
				ttl: 1
			}],

			data2 = [{
				requestId: 'poiax',
				startedAt: 1489744808,
				ttl: 45
			}, {
				requestId: 'kdfhd',
				startedAt: 1489744803,
				ttl: 33
			}, {
				requestId: 'uqwyet',
				startedAt: 1489744806,
				ttl: 22
			}, {
				requestId: 'qewaz',
				startedAt: 1489744810,
				ttl: 11
			}];

		it('get cumulative TTL (data1)', function() {
			assert.equal(15, s(data1));
		});
		
		it('get cumulative TTL (data2)', function() {
			assert.equal(50, s(data2));
		});
	});
});