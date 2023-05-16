
const app = require('./app');
const PORT = 9090;
const http = require('http');

const server = http.createServer(app);
server.listen(PORT, (console.log(`Listening on PORT ${PORT}`)))