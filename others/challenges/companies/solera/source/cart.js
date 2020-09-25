var Cart = (function () {

	function Cart (list, store) {
		this.errors = [];
		this.store = store;
		this.storeSettings = store.settings;
		this.list = list.split(/\n/);
		this.content = {};
		this.fill();
	}

	Cart.prototype.fill = function () {
		var self = this;

		this.list = this.list.filter(function(item){
			item = item.trim();
			if (item.length == 0) return false;
			var present = item in self.storeSettings.items;
			if (!present) {
				self.errors.push('WARNING: `' + item + '` element is not available in the store, thus will be ignored');
			} else {
				if (item in self.content) {
					self.content[item]++;
				} else {
					self.content[item] = 1;
				}
			}
			return true;
		});
	};

	return {
		create : function (list, store) {
			return new Cart(list, store);
		}
	};
})();