/*
https://en.wikipedia.org/wiki/Delegation_pattern
*/


// DELEGATOR

var Delegator = function () {
  this.delegate = undefined;
};

Delegator.prototype.f = function () {
  if (this.delegate) {
    return this.delegate();
  }
};

Delegator.prototype.delegateA = function () {
  this.delegate = DelegateA;
};

Delegator.prototype.delegateB = function () {
  this.delegate = DelegateB;
};


// DELEGATES

// ==========================
var DelegateA = function () {
  return 'Delegate A is running';
};
// ==========================

// ==========================
var DelegateB = function () {
    return 'Delegate B is running';
};
// ==========================



// use it

var D = new Delegator()
D.delegateA();
D.f();

D.delegateB();
D.f();