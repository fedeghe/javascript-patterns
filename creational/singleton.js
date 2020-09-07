var God = (function () {
	function God() {
		this.power = Infinity;

		//static !!!!
		if (God._instance) {
			console.log('You will have only one God');
			return God._instance;
		}
		console.log('God has been created... humm....ok God created himself!');
		God._instance = this;
	}

	// traditional proto
	God.prototype.readHisThoughts = function () {
		console.log('Thinking about undoing mankind!');
	}

	// static function !!!
	God.getInstance = function () {
		if (!God._instance)
			God._instance = new God();
		return God._instance;
	}
	God._instance = null;

	return God;
})();



var God1 = new God(),
	God2 = new God();

God1.readHisThoughts();

console.log('Is there only one God? (..in You I mean): ' + (God1 === God2));