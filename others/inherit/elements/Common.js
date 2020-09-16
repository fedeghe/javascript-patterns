const API = require('../API');

class Common extends API {
    commonMethod = (...args) => {
        // console.log('common traking')
        this.get('traking request ' + args.join(', '))
    }
}
module.exports = Common;