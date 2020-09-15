const API = require('../API');

class Datasource extends API {
    getDatasource = id => this.get(`datasource with id: ${id}`);
}
module.exports = Datasource;