(function(){
'use strict';

const socketIO = require('socket.io'),
      messagesQueue = require('./messageQueue');

var onlineUsers = [];

module.exports.init = function (httpsServer) {

    var io = socketIO(httpsServer);
    io.on('connection', function (socket) {

        onlineUsers.forEach(function (user, index) {
            socket.emit('user online', user);
        });

        socket.on('user online', function (userId) {
            console.log('User Online: ' + userId);
            onlineUsers.push(userId);
            socket.userId = userId;
            io.emit('user online', userId);
        });

        socket.on('disconnect', function () {
            if (socket.userId) {
                console.log('User Offline: ' + socket.userId);
                for (var i = 0; i < onlineUsers.length; i++) {
                    if (onlineUsers[i] == socket.userId) {
                        onlineUsers.splice(i, 1);
                        break;
                    }
                }
                io.emit('user offline', socket.userId);
                socket.userId = undefined;
            }
        });

        socket.on('new message', function (msg) {
            messagesQueue.messages.push(msg);
            io.emit('new message', msg);
        });
    });
};
}());
