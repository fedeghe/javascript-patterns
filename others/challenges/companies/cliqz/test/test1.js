var assert = require('assert'),
	s = require('../es1');


describe('ex. 1', function() {
  describe('#solution()', function() {
    it('should spot divergence', function() {
      assert.equal(-1, s([1,1,1,1,1,-5]));
      assert.equal(-1, s([1,2,3,1,2,3,4,5,6,3,4,5,2,3,-4]));
      assert.equal(-1, s([2,2,2,2,2,2,2,2,2,2,2,2,2,2,-4]));
      assert.equal(-1, s([4,4,4,4,-3,-3,-3,-3]));
      assert.equal(-1, s([8,0,0,0,0,0,0,0,0,0,0,0,0,0,0]));
      assert.equal(-1, s([0]));
      assert.equal(-1, s([1,-1]));
      assert.equal(-1, s([2,0,-2]));
      assert.equal(-1, s([5,0,0,0,0,1,-6]));
      assert.equal(-1, s([5,0,0,0,0,1,-6,0,0,12,23,34,45,56,67]));
    });
    it('should exit from the back in the right number of steps', function() {
      assert.equal(6, s([1,1,1,1,1,-6]));
      assert.equal(3, s([2,8,3,4,3,-9]));
      assert.equal(6, s([1,2,3,1,2,3,4,5,6,3,-14,5,2,3,4]));
      assert.equal(2, s([7,3,7,5,3,9,2,-30,6,4,12,3,98,6,5,4]));
      assert.equal(3, s([7,3,7,5,3,9,2,2,6,-30,12,3,98,6,5,4]));
      assert.equal(4, s([7,3,7,5,3,9,2,2,6,3,12,3,-98,6,5,4]));
      assert.equal(1, s([-1]));
      assert.equal(1, s([-1,23,2,5,75,3,4,5,6,2,87,3,12312,9,0,1,3,8,3,7]));
    });
    it('should exit from the front in right number of steps', function() {
      assert.equal(6, s([1,1,1,1,1,1]));
      assert.equal(6, s([1,1,1,1,1,1]));
      assert.equal(7, s([1,2,3,1,2,3,4,5,6,3,4,5,2,3,4]));
      assert.equal(5, s([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]));
      assert.equal(15, s([2,2,-1,2,2,-1,2,2,-1,2,2,-1,2,2,-1]));
      assert.equal(16, s([1,2,2,-1,1,2,2,-1,1,2,2,-1,1,2,2,-1]));
      assert.equal(16, s([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]));
      
      assert.equal(1, s([1]));
    });
  });
});