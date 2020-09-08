var God = (function () {

    God._instance = null;
    // static instance attached to the following
    
	function God() {
		this.power = Infinity;

		// check the static !!!!
		if (God._instance) {
            // already have it
			return God._instance;
        }

        // created, autoreturn being called as constructor, assign to local instance
		God._instance = this;
	}

	// dummy proto method
	God.prototype.doTheRightThingAsap = function () { console.log('Kill all humans!'); };
	
	// optional static function !!!
	God.getInstance = function () {
		if (!God._instance)
			God._instance = new God();
		return God._instance;
    }
    
	return God;
})();

// =======================================================================================
// USE IT

var God1 = new God(),
	God2 = new God();
God1.doTheRightThingAsap();
console.log('One God: ' + (God1 === God2));
