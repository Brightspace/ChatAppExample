(function(){
'use strict';

const socketIO = require('socket.io');

module.exports.init = function (httpsServer) {

    var messages = [];

    var io = socketIO(httpsServer);
    io.on('connection', function (socket) {

        socket.on('new message', function (msg) {
            console.log('<inbound Message> ' + msg);
            messages.push(msg);
            io.emit('new message', msg + ' <transmitted from socket>');
        });
    });
};
}());
