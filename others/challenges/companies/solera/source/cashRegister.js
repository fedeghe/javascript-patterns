var CashRegister = (function () {
	
	$$/source/receipt.js$$

	var strategies = {
		FIVE_FOR_THREE : {
			fun : function (n, unitPrice) {
				return parseFloat((n - Math.floor(n/5)*2) * unitPrice, 10).toFixed(2);
			},
			label : "5x3"
		},
		THREE_FOR_TWO : {
			fun : function (n, unitPrice) {
				return parseFloat((n - Math.floor(n/3)) * unitPrice, 10).toFixed(2);
			},
			label : "3X2"
		},
		DEFAULT : {
			fun : function (n, unitPrice) {
				return parseFloat(n * unitPrice, 10).toFixed(2);
			}
		}
	}

	function CashRegister (cart, store) {
		this.cart = cart;
		this.store = store;
		this.total = 0;
		this.storeSettings = store.settings;
		this.receipt = Receipt.create(this.storeSettings);
	}
	
	CashRegister.prototype.applyDiscountAndVat = function (item, cart) {
		var self = this,
			disc = this.storeSettings.items[item].discount in strategies ?
				this.storeSettings.items[item].discount 
				: 
				'DEFAULT',
			vatCat = this.storeSettings.items[item].vat || 0,
			vat = vatCat in this.storeSettings.vats ? this.storeSettings.vats[vatCat] : 0,
			res = 0;
		this.setStrategy(strategies[disc].fun);
		res = this.calc(
				cart.content[item],
				self.storeSettings.items[item].price,
				self.storeSettings.items[item].price.vat
			);
		return parseFloat((res * (1 + vat)).toFixed(2), 10);
	};
	CashRegister.prototype.getVat = function (item) {
		var vatCat = this.storeSettings.items[item].vat || 0;
		return vatCat in this.storeSettings.vats ? this.storeSettings.vats[vatCat] : 0;
	};

	CashRegister.prototype.process = function (cart) {
		var item,
			self = this,
			tmp = 0,
			disc;
		for (item in cart.content) {
			disc = self.storeSettings.items[item].discount in strategies?
					self.storeSettings.items[item].discount 
					: 
					'DEFAULT';
			// this.setStrategy(strategies[disc].fun);
			tmp = self.applyDiscountAndVat(item, cart);

			this.receipt.addLine({
				num : cart.content[item],
				name : item,
				discount : 'label' in strategies[disc] ? strategies[disc].label : '',
				unitPrice : self.storeSettings.items[item].price,
				price : self.applyDiscountAndVat(item, cart),
				vat : self.getVat(item)
			});
			this.total = this.total + tmp;
		}
		
		this.receipt.setTotal(this.total);
		return this;
	};

	CashRegister.prototype.setStrategy = function (fun) {
		this.calc = fun;
	};

	CashRegister.prototype.printReceipt = function () {
		this.receipt.print();
	};

	return {
		create : function (cart, store) {
			return new CashRegister(cart, store);
		}
	};
})();