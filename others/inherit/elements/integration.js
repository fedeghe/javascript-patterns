const Common = require('./Common');

class Integration extends Common {
    getIntegration = id => {
        this.get(`integration with id: ${id}`);
        this.commonMethod('int', id);
        console.log('----')
    }
}
module.exports = Integration;