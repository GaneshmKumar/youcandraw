var socketio = require('socket.io');

module.exports.listen = function(http)
{
	var io = socketio.listen(http);
	io.on('connection', function(socket) {
		socket.on('draw', function(obj) {
			socket.broadcast.emit('draw', obj);
		});
	});
}