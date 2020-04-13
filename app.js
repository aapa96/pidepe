const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const router = express.Router();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./routes/index');

app.set('view engine', 'html');
app.use(express.static(__dirname + '/web', { index: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT , DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});
app.use('/api', routes);
// app.use('*', router.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/web/index.html'));
//     res.status(200).send("Hola Mundo")
// }));

module.exports = app;