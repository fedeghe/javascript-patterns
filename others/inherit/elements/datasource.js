const Common = require('./Common');

class Datasource extends Common {
    getDatasource = id => this.get(`datasource with id: ${id}`);
    getDatasource = id => {
        this.get(`datasource with id: ${id}`);
        this.commonMethod('ds', id);
        console.log('----')
    }
}
module.exports = Datasource;