var fs = require('fs'),
    readl = require('readline'),
    processor = require('./lib/processor.js');

function solution(fname, cb) {
    var res = [],
        lineReader = readl.createInterface({
            input: fs.createReadStream(fname)
        });

    lineReader.on('line', function (line) {
        res.push(line.split(','));
    });

    lineReader.on('close', function () {
        cb(processor(res));
    });
}

module.exports = solution;