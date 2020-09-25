var fs = require('fs'),
	path = require('path');

module.exports = (function () {
	
	$$cashRegister.js$$

	$$cart.js$$

	function Store(settingsFilePath) {
		var self = this;
		self.settings =  JSON.parse(fs.readFileSync(settingsFilePath, "utf8"));
	}
	
	Store.prototype.printReceipt = function (listFileContent, stealth) {
		this.cart = Cart.create(listFileContent, this);
		this.cashRegister = CashRegister.create(listFileContent, this);

		this.cashRegister.process(this.cart);
		!stealth && this.cashRegister.printReceipt();
	};

	return {
		create : function (settingsFilePath) {
			return new Store(settingsFilePath);
		}
	};
})();