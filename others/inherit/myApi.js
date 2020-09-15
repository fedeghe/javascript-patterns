const datasource = require('./elements/datasource'),
    integration = require('./elements/integration');

function Classes(bases) {

    class Bases {
        constructor() {
            bases.forEach(base => Object.assign(this, new base()));
        }
    }

    bases.forEach(base => {
        Object.getOwnPropertyNames(base.prototype)
            .filter(prop => prop != 'constructor')
            .forEach(prop => Bases.prototype[prop] = base.prototype[prop]);
    });

    return Bases;
}


// dumb aggregator
class MyApi extends Classes([datasource, integration]) { }

module.exports = MyApi;