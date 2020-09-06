function FibonacciIterator() {
    this.current = 1;
    this.previous = 0;
}
FibonacciIterator.prototype.next = function(t) {
    t = this.previous + this.current;
    this.previous = this.current;
    return this.current = t;
};
var fi = new FibonacciIterator();

for(var i =0; i < 100; i++)
	console.log(fi.next());