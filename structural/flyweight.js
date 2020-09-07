/*
https://en.wikipedia.org/wiki/Flyweight_pattern
*/

// const util = require('util');
function Application(name, price) {
	this.name = name || '';
	this.rate = 5;
	this.price = price || 0;
}


var app1 = new Application('fb', 0),
	app2 = new Application('tw', 0);
	/*
	what if we have 1000 apps or more ?
	*/


function fwApplication(){}
fwApplication.prototype.name = '';
fwApplication.prototype.rate = 5;
fwApplication.prototype.price = null;

var oneMillionApps = [],
	oneMillionBadApps = [],
	i = 0;

for(i = 0; i < 1E6; i++) 
	oneMillionApps.push(new fwApplication());

// console.log(util.inspect(process.memoryUsage()));

console.log('name1: ', oneMillionApps[3434].name);
console.log('rate1: ', oneMillionApps[3434].rate);
console.log('price1: ', oneMillionApps[3434].price);
console.log('name2: ', oneMillionApps[123456].name);
console.log('rate2: ', oneMillionApps[123456].rate);
console.log('price2: ', oneMillionApps[123456].price);

oneMillionApps[3434].name = 'fb';
oneMillionApps[3434].rate = 4;
oneMillionApps[3434].price = 10;

console.log('name1: ', oneMillionApps[3434].name);
console.log('rate1: ', oneMillionApps[3434].rate);
console.log('price1: ', oneMillionApps[3434].price);
console.log('name2: ', oneMillionApps[123456].name);
console.log('rate2: ', oneMillionApps[123456].rate);
console.log('price2: ', oneMillionApps[123456].price);


console.log('-------');
for (i = 0; i < 1E6; i++) 
	oneMillionBadApps.push(new Application());

// console.log(util.inspect(process.memoryUsage()));