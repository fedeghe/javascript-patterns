function Foo(attributes) {
    this._attributes = attributes;
}

Object.defineProperty(Foo.prototype, 'bar', {
    get: function () {
        if (typeof this._bar == 'undefined') {
            console.log('creating Bar');
            this._bar = new Bar(this._attributes.bar);
        }

        return this._bar;
    },
    set: function (bar) {
        delete this._bar;
        this._attributes.bar = bar;
    }
});

function Bar(attributes) {
    this._attributes = attributes;
}

Object.defineProperty(Bar.prototype, 'baz', {
    get: function () {
        return this._attributes.baz;
    },
    set: function (baz) {
        this._attributes.baz = baz;
    }
});

var foo = new Foo({ bar: { baz: 'stuff' } });
console.log(foo.bar.baz);