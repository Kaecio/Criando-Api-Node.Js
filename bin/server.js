'use strict'
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('litening',onListening);

// função para gerar uma port se a 3000 estiver em useColors
function normalizePort(val){
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0){
        return port;
    }
    return false;
}

//função para tratamento de erro do servidor
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// debug modo
function onListening() {
    const adress  = server.address();
    const bind = typeof adress === 'string' ? 'pipe' + adress :'port' + adress.port;
    debug('listening on' + bind);
}

console.log(`Api listening on port ${port}`);
