(function(){
'use strict';

const socketIO = require('socket.io'),
      messagesQueue = require('./messageQueue');

const onlineUsers = new Set();

module.exports.init = function (httpsServer) {

    var io = socketIO(httpsServer);
    io.on('connection', function (socket) {
        onlineUsers.forEach(function (user) {
            socket.emit('user online', user);
        });

        socket.on('user online', onUserOnline);
        socket.on('disconnect', onDisconnect);
        socket.on('new message', onNewMessage);
    });

    function onUserOnline(userId) {
        const socket = this;

        console.log('User Online: ' + userId);
        onlineUsers.add(userId);
        socket.userId = userId;
        io.emit('user online', userId);
    }

    function onDisconnect() {
        const socket = this;

        if (socket.userId) {
            console.log('User Offline: ' + socket.userId);
            onlineUsers.delete(socket.userId);
            io.emit('user offline', socket.userId);
            socket.userId = undefined;
        }
    }

    function onNewMessage(msg) {
        messagesQueue.messages.push(msg);
        io.emit('new message', msg);
    }

};
}());
