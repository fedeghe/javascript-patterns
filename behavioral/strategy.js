function Shipping() {
    this.company = "";
};
Shipping.prototype.setStrategy = function(company) {
    this.company = company;
};
Shipping.prototype.calculate = function(package) {
        return this.company.calculate(package);
};


//
// A strategy can be a complex object
//
function UPS() {
    this.calculate = function(package) {
        // calculations...
        return "$45.95";
    };
}
function USPS() {this.calculate = function(package) {return "$39.40";};}
function Fedex() {this.calculate = function(package) {return "$43.20";};}

// 
// or even a supersimple one
// 
var theBezt = {
    calculate : function(package) {return "$1.20";}
};

var package = {
        from: "76712",
        to: "10012",
        weigth: "lkg"
    },
    // the 3 strategies
    ups = new UPS(),
    usps = new USPS(),
    fedex = new Fedex();

var shipping = new Shipping();

shipping.setStrategy(ups);
console.log("UPS Strategy: " + shipping.calculate(package));
shipping.setStrategy(usps);
console.log("USPS Strategy: " + shipping.calculate(package));
shipping.setStrategy(fedex);
console.log("Fedex Strategy: " + shipping.calculate(package));
shipping.setStrategy(theBezt);
console.log("theBezt Strategy: " + shipping.calculate(package));

