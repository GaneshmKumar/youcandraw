var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('./sockets/socketHandle').listen(http);
var route = require('./routes/route');


app.use('/public', express.static(__dirname + '/public'));
app.use('/', route);

const PORT = process.env.PORT || 1234;

http.listen(PORT, function(){
  console.log(`Listening to port ${PORT}...`);
});
    

