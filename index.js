// const MongoClient = require('mongodb').MongoClient
const MongoDb = require('mongoose');
const config = require('./config');
const app = require('./app');
const Server = require('socket.io');
const io = new Server();

MongoDb.connect(config.db.url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    MongoDb.pluralize(null);
    if (err) return console.log(err)
    app.listen((config.server.port), (error,server) => {
        if (error) return console.log(error)
        
        console.log('Database started on Mongo Atlas')
        console.log(`Server started on port ${config.server.port}`);
    });
})