/*
https://en.wikipedia.org/wiki/Decorator_pattern
*/
function Armor () {
	this.integrity = 10;
}
Armor.prototype.getIntegrity = function () {return this.integrity;}
Armor.prototype.getDamage = function () {return 10 - this.integrity;}
Armor.prototype.hit = function (strength) {
	this.integrity -= strength;
	console.log('Armor hit -> ' + this.integrity);
}

function Shield (superArmor) {
	this.superArmor = superArmor;
}
Shield.prototype.getIntegrity = function () {return this.superArmor.integrity;}
Shield.prototype.getDamage = function () {return 10 - this.superArmor.integrity;}
Shield.prototype.hit = function (strength) {
	strength *= 0.5;
	this.superArmor.integrity -= strength;
	console.log('ShiededArmor hit -> ' + this.superArmor.integrity);
}



// normal Armor
// 
console.log('Normal Armor');
var a1 = new Armor();
do{
	a1.hit(1);
} while (a1.getDamage() < 10);


// with Shield
console.log('Shielded Armor');
var a2 = new Shield(new Armor());
do{
	a2.hit(1);
} while (a2.getDamage() < 10);