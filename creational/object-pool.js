function Pool(limit, constructor, expand) {
    console.log('Creating an ' + (expand ? '' : 'un')+ 'expandable pool with ' + limit + 'dead instances');
    this.expand = expand || false
    this.limit = limit;
    this.constructor = constructor;
    this.instances = [];
    for (var i = 0; i < limit; i++) {
        this.instances.push(this.createInstance());
    }
    console.log('pool created')
}
Pool.prototype.createInstance = function () {
    console.log('creating dead instance')
    var tmp = new this.constructor();
    tmp.dead = true;
    return tmp;
}
Pool.prototype.getSize = function () { return this.instances.length; };
Pool.prototype.release = function (instance) {
    console.log('releasing an instance')
    instance.dead = true;
}
Pool.prototype.revive = function (instance) {
    console.log('reviving dead instance')
    instance.dead = false;
    return instance;
};
Pool.prototype.get = function () {
    var tmp;
    console.log('retrieving one instance');
    for (var i = 0, l = this.instances.length; i < l; i++) {
        if (this.instances[i].dead) {
            console.log('found one dead');
            return this.revive(this.instances[i]);
        }
    }
    if (this.expand) {
        console.log('the pool is expandable')
        tmp = this.revive(this.createInstance())
        this.instances.push(tmp);
        console.log('added a new instance (#' + this.getSize() + ')')
        return tmp;
    }
    throw new Error('Pool limit reached, release some instances')
};


// USE IT

// class to populate the pool
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.init = function (x, y) {
    this.x = x;
    this.y = y;
};

// pool instance
var myPool = new Pool(3, Point);

var p1 = myPool.get(),
    p2 = myPool.get(),
    p3 = myPool.get();

p1.init(10, 12);
p2.init(14, 16);
p3.init(18, 20);

try {
    var t = myPool.get();
    t.init(10, 20)
} catch (e) {
    console.log('The non expandable pool is full thus:')
    console.log(e)
    myPool.release(p3)
} finally {
    console.log('now in any case we can get one')
    var s = myPool.get();
    s.init(10, 20)
}



