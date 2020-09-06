function inherit(Child, Parent){
    function T() {};
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    Child.prototype.constructor = Child;
    Child.superClass = Parent.prototype;
    Child.baseConstructor = Parent;    
}


function TrafficLight() {
	this.changes = 0,
	// this.states = [Red, Green, Yellow],
	// this.currentState = new this.states[this.changes](this);
	this.currentState = new Red(this);
}
TrafficLight.prototype.change = function (state) {
	// limits number of changes
	if (this.changes++ >= 10) return;
	this.currentState = state;
	this.currentState.go();
};
TrafficLight.prototype.start = function () {
	this.currentState.go();
};


function Red(tlight) {this.tlight = tlight;}
Red.prototype.go = function () {
	console.log("Red --> for 1 minute");
	this.tlight.change(new Green(this.tlight));
}

function Yellow(tlight) {this.tlight = tlight;}
Yellow.prototype.go = function () {
	console.log("Yellow --> for 10 seconds");
	this.tlight.change(new Red(this.tlight));
}

function Green (tlight) {this.tlight = tlight;}
Green.prototype.go = function () {
	console.log("Green --> for 1 minute");
	this.tlight.change(new Yellow(this.tlight));
}

var tlight = new TrafficLight();
tlight.start();