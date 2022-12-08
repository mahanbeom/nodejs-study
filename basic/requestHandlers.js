function view(response) {
    console.log('request handler called --> view');
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write("hello view");
    response.end();
}

function create(response) {
    console.log('request handler called --> create');
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write("hello create");
    response.end();
}

function home(response) {
    console.log('request handler called --> home');
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write("hello home");
    response.end();
}

var handle = {};
handle['/'] = home;
handle['/view'] = view;
handle['/create'] = create;

exports.handle = handle;