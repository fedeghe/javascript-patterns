
function advancedCar(n) {
	this.name = n;
	this.direction = 0;
	this.speed = 0;
}
advancedCar.prototype.steerLeft = function (a) {
	console.log('(adv ship turn left)');
	this.direction -= a;
};
advancedCar.prototype.steerRight = function (a) {
	console.log('(adv ship turn right)');
	this.direction += a;
};
advancedCar.prototype.throttle = function (a) {this.speed += a;};
advancedCar.prototype.slowdown = function (s) {this.speed = s;};


function simpleCar () {
	this.direction = 0;
}
simpleCar.prototype.left = function () {this.direction -= 30;}
simpleCar.prototype.right = function () {this.direction += 30;}


// I`m only able to use a simpleCar 
// but I have a advancedCar
// 


function carAdapter(){
	this._car = new advancedCar('noname');
}
carAdapter.prototype.left = function () {
	console.log('ADPTR ship turn left');
	this._car.steerLeft(30);
}
carAdapter.prototype.right = function () {
	console.log('ADPTR ship turn right');
	this._car.steerRight(30);
}


//use it
//
var car = new carAdapter();
// now althoug I`m using an advanced ship I treat it as a simple one
// only using the wrapped interface
car.left();
car.left();
car.right();
