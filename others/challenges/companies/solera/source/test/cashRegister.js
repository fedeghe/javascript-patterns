// require mocha and baselib for store
var assert = require('assert'),
	storeFac = require('../lib.js'),

	// include test list
	// 
	list1 = `
		$$../../list1.txt$$
	`,
	list2 = `
		$$../../list2.txt$$
	`;


$$../cashRegister.js$$

$$../cart.js$$




var	tests = [{
	label : 'Cart for first list1.txt',
	list : list1,
	expected : {
		listLength : 20,
		articlesKinds : 7,
		unavailableItems : 2,
		items : {
			apple : 1,
			orange : 3,
			papaya : 7,
			"orange juice" : 1,
			"papaya bio" : 1,
			garlic : 4,
			pumpking : 1
		}

	}
},{
	label : 'Cart for first list2.txt',
	list : list2,
	expected : {
		listLength : 26,
		articlesKinds : 9,
		unavailableItems : 3,
		items : {
			apple : 2,
			orange : 2,
			papaya : 6,
			"orange juice" : 1,
			"papaya bio" : 1,
			garlic : 4,
			pumpking : 2,
			banana : 3,
			kiwi : 2
		}

	}
}];



tests.forEach(function (test) {
	describe(test.label, function () {
		testList(test.list, test.expected);
	});	
});


function testList(list, exp){
	var store = storeFac.create('market.json'),
		storeSettings = store.settings,
		mycart = Cart.create(list, store),
		tmp;

	store.printReceipt(list, true);

	describe('check list', function () {
		it('should contain ' + exp.listLength + ' lines', function () {
			assert.equal(exp.listLength, mycart.list.length)
		});
	});
	describe('cart content', function () {
		it('should contain ' + exp.articlesKinds + ' different kind of artiles', function () {
			var l, t = 0; for(l in mycart.content)t++; 
			assert.equal(exp.articlesKinds, t)
		});
		it('should handle ' + exp.unavailableItems +' elements not available in the store', function () {
			assert.equal(exp.unavailableItems, mycart.errors.length)
		});
	});
	describe('checkout list price check (discount and vat)', function () {
		for (tmp in exp.items){
			(function (t, num){
				it(t + " cost", function () {
					assert.equal(
						store.cashRegister.receipt.items[t].price,
						store.cashRegister.applyDiscountAndVat(t, mycart)
					)
				})	
			})(tmp, exp.items[tmp]);
		}
	});
}

