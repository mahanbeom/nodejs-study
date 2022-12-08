var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

server.start(router.route, requestHandlers.handle);
