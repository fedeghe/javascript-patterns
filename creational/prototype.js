
function Person(name, age, weight){
	this.name = name;
	this.age = age;
	this.weight = weight;
}

Person.prototype.clone = function () {
	var clone = new Person();
	for (var a in this) {
		clone[a] = this[a];
	}
	return clone;
}


var p1 = new Person('Federico', 39, 99),
	p2 = p1.clone();

console.dir(p1);
console.dir(p2);
