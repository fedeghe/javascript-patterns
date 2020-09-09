var Request = function(amount) {
    this.amount = amount;
    this.out = [];
};
 
Request.prototype.get = function(bill) {
    var count = Math.floor(this.amount / bill);
    this.amount -= count * bill;
    this.out.push({number : count, value : bill});
    return this;
};


var request = new Request(378);
request.get(100).get(50).get(20).get(5).get(1);
console.log(request.out);