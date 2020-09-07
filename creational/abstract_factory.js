/*
Definition
The essence of the Abstract Factory Pattern is to "Provide an interface for creating families of related or dependent objects without specifying their concrete classes.

Intent
- Provide an interface for creating families of related or dependent objects without specifying their concrete classes.
- A hierarchy that encapsulates: many possible "platforms", and the construction of a suite of "products".
- The new operator considered harmful.

*/


function FiatCar(platenumber){
	this.platenumber = platenumber;
	this.brand = "Fiat";
}
FiatCar.prototype.startEngine = function ( ) {
	console.log('Start ' + this.brand + ': prrrr');
}


function AudiCar(platenumber) {
	this.platenumber = platenumber;
	this.brand = "Audi";
}
AudiCar.prototype.startEngine = function ( ) {
	console.log('Start ' + this.brand + ': wrommmm');
};

function FerrariCar(platenumber) {
	this.platenumber = platenumber;
	this.brand = "Ferrari";
}
FerrariCar.prototype.startEngine = function ( ) {
	console.log('Start ' + this.brand + ': WWWWWRRRRROOOOOOMMMMMMMMM');
};
		
	
function FiatCreator() {
	this.create = function (pn) {
		return new FiatCar(pn);
	};
}
function AudiCreator() {
	this.create = function (pn) {
		return new AudiCar(pn);
	};
}
function FerrariCreator() {
	this.create = function (pn) {
		return new FerrariCar(pn);
	};
}


// run
// 
var cars = [],
	fiatCreator = new FiatCreator(),
	audiCreator = new AudiCreator(),
	ferrariCreator = new FerrariCreator();

cars.push(fiatCreator.create("AN646TT"));
cars.push(audiCreator.create("BN646GG"));
cars.push(ferrariCreator.create("BIGBOY#1"));

console.log(cars);

for (var i = 0, l=cars.length; i < l; i++) {
	cars[i].startEngine();
}