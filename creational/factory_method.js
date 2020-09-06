
function Strawberry(){
	this.tastePower = 10;
	this.taste = 'Strawberry';
}
Strawberry.prototype.chew = function () {
	if (!this.tastePower) return false;
	console.log('chew '+ this.taste);
	return this.tastePower--;
}

function Mint(){
	this.tastePower = 15;
	this.taste = 'Mint';
}
Mint.prototype.chew = function () {
	if (!this.tastePower) return false;
	console.log('chew '+ this.taste);
	return this.tastePower--;
}

var ChewingFactory = {
	getChewingGum : function(taste) {
		if (typeof taste === 'undefined') return;
		switch (taste) {
			case 'strawberry':
				return new Strawberry();
			break;
			case 'mint':
				return new Mint();
			break;
			default : 
				return false;
		}
	}
};

// run
//
var strawberryChewingGum = ChewingFactory.getChewingGum('strawberry'),
	mintChewingGum = ChewingFactory.getChewingGum('mint');



while(strawberryChewingGum.chew());
while(mintChewingGum.chew());
