var util = require('./util.js');
function Processor() {
    this.r = {
        'triangles' : [],
        'squares' : [],
        'rectangles' : [],
        'anything_else' : []
    };
    this.rules = {
        3 : [{
            cat : 'triangles'
        }],
        4 : [{
            cat : 'squares',
            validate : function (s) {return util.isSquare(s);}
        },
        {
            cat : 'rectangles',
            validate : function (s) {return util.isRect(s);}
        }]
    }
}
Processor.prototype.check = function(lines) {
    var i = 0, l = lines.length;
    for (null; i < l; i++) this._fillType(lines[i]);
    return this.r;
}
Processor.prototype._fillType = function(si) {
    var self = this,
        sides = util.str2intArr(si),
        size = sides.length,
        found, 
        i, l;
    if (size in this.rules) {
        this.rules[size].some(function (e) {
            if (!('validate' in e) || e.validate(sides)) {
                self.r[e.cat].push(sides);
                found = true;
            }
        });
    }
    !found && this.r['anything_else'].push(sides);
}

module.exports = function (sides) {
    return (new Processor).check(sides);
};