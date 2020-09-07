/*
https://en.wikipedia.org/wiki/Bridge_pattern
*/
function FiatCar(){}
FiatCar.prototype.startEngine = function (key) {
	key.correct && console.log('prrrr');
}

function AudiCar() {}
AudiCar.prototype.startEngine = function (action) {
	action.name == 'pushButton' && console.log('wrommmm');
};


function FerrariCar() {}
FerrariCar.prototype.startEngine = function (fingerPrint) {
	fingerPrint.check() && console.log('WWWWWRRRRROOOOOOMMMMMMMMM');
};

function Key() {this.correct = true;}
function Action() {this.name = 'pushButton';}
function Fingerprint() {this.check = function (){return true;};}

function FiatCarAdapter() {
	this._car = new FiatCar();	
}
FiatCarAdapter.prototype.startEngine = function () {
	this._car.startEngine(new Key());
};


function AudiCarAdapter() {
	this._car = new AudiCar();	
}
AudiCarAdapter.prototype.startEngine = function () {
	this._car.startEngine(new Action());
};

function FerrariCarAdapter() {
	this._car = new FerrariCar();	
}
FerrariCarAdapter.prototype.startEngine = function () {
	this._car.startEngine(new Fingerprint());
};


var cars = [
	new FiatCarAdapter(),
	new AudiCarAdapter(),
	new FerrariCarAdapter()
];
for(var i=0, l=cars.length; i < l; i++){
	cars[i].startEngine();
}

