const restify = require('restify'),
    corsMiddleware = require('restify-cors-middleware'),
    ip_addr = '127.0.0.1',
    port = '8888',
    channels = require('./channels.json');


var server = restify.createServer();

server.use(require('restify-plugins').queryParser());

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*']
})

server.pre(cors.preflight);
server.use(cors.actual);

var PATH = '/channels';
server.get({path : PATH} , getChannels);

function getChannels(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send(200, {
        data: channels
    });
}

server.listen(port, ip_addr, function () {
    console.log('%s listening at %s ', server.name, server.url);
});