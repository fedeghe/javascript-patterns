
		function Stripe(color) {
			this.color = color;
		}

		function Light(color) {
			this.color = color;
		}

		function Ball(color, size) {
			this.color = color;
			this.size = size;
		}

		function Tree() {
			this.stripes = [];
			this.lights = [];
			this.balls = [];
		}


// createTwo builders for different Tournaments
// 

function treeBuilder1(){}
treeBuilder1.prototype.build = function () {
	var t = new Tree();
	t.stripes.push(new Stripe('red'));
	t.stripes.push(new Stripe('silver'));

	t.balls.push(new Ball('red', 'xl'));

	t.lights.push(new Light('red'));
	t.lights.push(new Light('white'));
	return t;
};

function treeBuilder2(){}
treeBuilder2.prototype.build = function () {
	var t = new Tree();
	t.stripes.push(new Stripe('blue'));
	t.stripes.push(new Stripe('green'));
	t.stripes.push(new Stripe('silver'));

	t.balls.push(new Ball('blue', 'xl'));
	t.balls.push(new Ball('silver', 'xs'));

	t.lights.push(new Light('gold'));
	t.lights.push(new Light('silver'));
	return t;
};



// now the director of builders
//

function TreeBuilder(){}
TreeBuilder.prototype.build = function (b) {
	return b.build();
}


// use
// 
var b1 = new TreeBuilder();
console.dir(b1.build(new treeBuilder1()));
console.dir(b1.build(new treeBuilder2()));

