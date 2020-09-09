function TrafficLight() {
	this.count = 0,
	this.states = [Red, Green, Yellow],
	this.currentState = new this.states[this.count](this);
}
TrafficLight.prototype.change = function (state) {
	// limits number of changes
	if (this.count++ >= 10) return;
	this.currentState = state;
	this.currentState.go();
};

TrafficLight.prototype.start = function () {
	this.currentState.go();
};
 
function Red(light) {
	this.light = light;
}
Red.prototype.go = function () {
	console.log("Red --> for 1 minute");
	this.light.change(new Green(this.light));
}
 
function Yellow(light) {
	this.light = light;
}
Yellow.prototype.go = function () {
	console.log("Yellow --> for 10 seconds");
	this.light.change(new Red(this.light));
}
 
function Green (light) {
	this.light = light;	
}
Green.prototype.go = function () {
	console.log("Green --> for 1 minute");
	this.light.change(new Yellow(this.light));
}
 
// log helper
 
 

var light = new TrafficLight();
light.start();

