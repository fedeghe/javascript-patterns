const API = require('../API');

class Integration extends API {
    getIntegration = id => this.get(`integration with id: ${id}`);
}
module.exports = Integration;