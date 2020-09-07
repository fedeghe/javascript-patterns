/*
https://en.wikipedia.org/wiki/Composite_pattern
*/

function BasicIngredient(name, calories) {
	this.name = name;
	this.calories = calories;
}
BasicIngredient.prototype.getName = function () {return this.name;}
BasicIngredient.prototype.getCalories = function () {return this.calories;}

function CompoundIngredient(name) {
	this.name = name;
	this.ingredients = [];
}
CompoundIngredient.prototype.getName = function () {return this.name;};
CompoundIngredient.prototype.addIngredient = function (ingredient) {
	this.ingredients.push(ingredient);
}

//hint : same as in BasicIngredient
CompoundIngredient.prototype.getCalories = function () {
	var tot = 0,
		i = 0,
		l = this.ingredients.length;
	for(null; i<l; i++)tot += this.ingredients[i].getCalories();
	return tot;
}

var egg = new BasicIngredient('Egg', 155),
	milk = new BasicIngredient('Milk', 42),
	sugar = new BasicIngredient('Sugar', 387),
	rice = new BasicIngredient('Rice', 370),
	ricePudding = new CompoundIngredient('Ricepudding');
ricePudding.addIngredient(egg);
// ricePudding.addIngredient(egg);
// ricePudding.addIngredient(egg);
ricePudding.addIngredient(milk);
ricePudding.addIngredient(sugar);
ricePudding.addIngredient(rice);

console.log(ricePudding.getCalories());