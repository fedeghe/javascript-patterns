
function ObservableObject(){
	this.observers = {};
}

ObservableObject.prototype.subscribe = function (f) {
	if (!(f.name in this.observers)) {
		this.observers[f.name] = f;
	}
};
ObservableObject.prototype.unsubscribe = function (f) {
	if (f.name in this.observers) {
		this.observers[f.name] = null;
		delete this.observers[f.name];
	}	
};
ObservableObject.prototype.notify = function () {
	for (var i in this.observers) {
		this.observers[i].apply(null, arguments);
	}
};


var sub1 = new ObservableObject();
function obs1(n) {
	console.log('Observer 1');
	console.log(n);
}
function obs2(n) {
	console.log('Observer 2');
	console.log(n);
}
sub1.subscribe(obs1);
sub1.subscribe(obs2);
sub1.notify({
	title : 'The observer is friendly',
	text : 'Get used to think about patterns!'
});
sub1.unsubscribe(obs2);
sub1.notify({
	title : 'The observer is friendly',
	text : 'Never forget about patterns!'
});
