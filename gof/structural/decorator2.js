/*
https://en.wikipedia.org/wiki/Decorator_pattern
*/
var tree = {};
tree.decorate = function () {
	console.log('The tree is finished');
};
tree.getDecorator = function (d) {
	tree[d].prototype = this;
	return new tree[d];
};

tree.blueBalls = function () {
	this.decorate = function () {
		this.blueBalls.prototype.decorate();
		console.log('Adding BLUE balls');
	}
};
tree.redBalls = function () {
	this.decorate = function () {
		this.redBalls.prototype.decorate();
		console.log('Adding RED balls');
	}
};
tree.angel = function () {
	this.decorate = function () {
		this.angel.prototype.decorate();
		console.log('Adding the angel on the top');
	}
}

tree = tree.getDecorator('blueBalls');
tree = tree.getDecorator('redBalls');
tree = tree.getDecorator('angel');
tree.decorate();