$(()=>{
var socket = io()



$("#target").submit(function(event){
 event.preventDefault();
 var message = $('#m').val();
 socket.emit('chat message', message);
 $('#m').val('');
})

socket.on('sent message', function(message){
 $("#messages").append('<li>' + message + '</li>');
})
})
