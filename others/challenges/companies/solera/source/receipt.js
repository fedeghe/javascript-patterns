var Receipt = (function () {

	function Receipt (settings) {
		this.storeName = settings.storeName;
		this.currency = settings.currency;
		this.date = ("" + new Date).replace(/(GMT.*)$/, '');
		this.items = {};
		this.lines = [];
		this.total = 0;
	}

	Receipt.prototype.addLine = function (data) {
		this.items[data.name] = data;
	}
	Receipt.prototype.setTotal = function (tot) {
		this.total = parseFloat(tot, 10);
	}

	Receipt.prototype.print = function () {
		var i,
			brd,
			max = 0;

		this.lines.push(this.storeName + " Thank You for Your purchase!\n")
		this.lines.push("Date : " + this.date)
		this.lines.push("\n# Art.    Price         Due   Offer Vat")
		for (i in this.items) {
			this.lines.push(
				this.items[i].num + ' ' +
				(this.items[i].name.length > 5 ? this.items[i].name.substr(0,4) + "." : this.items[i].name)+
				" X " +
				this.items[i].unitPrice + this.currency +
				"\t\t" +
				this.items[i].price  + this.currency + 
				(this.items[i].discount ? " " + this.items[i].discount : "   ") + 
				(this.items[i].vat ? "   " + this.items[i].vat * 100 +"% incl." : "")
			);
		}
		

		this.lines.push("\nTOTAL: " + this.total.toFixed(2) + this.currency);
		

		this.lines.filter(function (el) {
			max = max > el.length ? max : el.length;
		});

		brd = new Array(max+1).join('=');

		console.log(brd+"\n")
		this.lines.forEach(function (l){console.log(l)});
		console.log(brd+"\n")
	}

	return {
		create : function (settings) {
			return new Receipt(settings);
		}
	};
})();