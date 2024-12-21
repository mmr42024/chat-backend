const express = require('express');
const path = require('path');
require('dotenv').config();


//DB Config
const {dbConnection} = require('./database/config').dbConnection();

//Express App
const app = express();

//Reading and parsing the body
app.use(express.json());


// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');


//Path pulic
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


//My routes
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));


server.listen(process.env.PORT, (err) => {
    if (err) throw Error(err);

    console.log('Servidor corriendo en puerto!!!',process.env.PORT);
});