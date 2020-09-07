/*
https://en.wikipedia.org/wiki/Facade_pattern
*/

function Mortgage(name) {
    this.name = name;
}

// façade interface 
Mortgage.prototype.applyFor = function (amount) {
    // access multiple subsystems...
    var result = !new Bank().verify(this.name, amount)
        ||
        !new Credit().get(this.name)
        ||
        !new Background().check(this.name)
        ? "denied" : "approved";

    return this.name + " has been " + result + " for a " + amount + " mortgage";
}

function Bank() {
    this.verify = function (name, amount) {
        // complex logic ...
        return true;
    }
}

function Credit() {
    this.get = function (name) {
        // complex logic ...
        return true;
    }
}

function Background() {
    this.check = function (name) {
        // complex logic ...
        return true;
    }
}


var mortgage = new Mortgage("Joan Templeton"),
    result = mortgage.applyFor("$100,000");

console.log(result);
