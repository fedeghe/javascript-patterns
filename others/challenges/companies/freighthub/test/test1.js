var assert = require('assert'),
    s = require('../es1');

describe('ex. 1', function() {
    describe('#solution()', function() {
        var a1 = [2, 4, 6, 8, 9, 15],
            a2 = [3, 5, 6, 7, 9, 12],
            a3 = [2, 4, 8, 16, 32, 64];
        
        it('pow powers of 2', function() {
            assert.equal('["4","16","64"]', JSON.stringify(s(a1)));
        });

        it('pow powers of 2 (no results)', function() {
            assert.equal('[]', JSON.stringify(s(a2)));
        });

        it('pow powers of 2 (all results)', function() {
            assert.equal('["4","16","64","256","1024","4096"]', JSON.stringify(s(a3)));
        });
    });
});
