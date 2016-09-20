var io = require('socket.io')()
io.on('connection', function(socket){
  socket.on('chat message', function (message){
    io.emit('sent message',message)
  })
})
module.exports=io;
