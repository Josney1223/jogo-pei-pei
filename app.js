const GameLoop = require('./server/GameLoop.js');
const Player = require('./server/Player.js');
const app = require('express')();
const httpServer = require("http").createServer(app);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});

httpServer.listen(2000, '172.29.159.207');
console.log('server initialized')

// Backend
var canvas_size = [800, 500];
var SOCKET_LIST = {};
var GL = new GameLoop();

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Socket.io
const io = require("socket.io")(httpServer, {});

io.on("connection", (socket) => {
	console.log("socket "+socket.id+" connected");
	SOCKET_LIST[socket.id] = socket; 

	GL.addPlayer(socket.id);

	socket.on('disconnect', function(){
		console.log("socket "+socket.id+" disconnected");
		delete PLAYER_LIST[socket.id];
		delete SOCKET_LIST[socket.id];
	});
	
	socket.on('keyPress', function(data){
		if(data.inputId == 'up') player.setMoveY(-1);
		if(data.inputId == 'down') player.setMoveY(1);
		if(data.inputId == 'left') player.setMoveX(-1);
		if(data.inputId == 'right') player.setMoveX(1);
	});
});

var sendAllUsers = function(messageType, data){
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit(messageType, data);
	}
}

setInterval(function(){
	var pack = [];
	GL.update();
	for(var zombie in GL.ZOMBIES){
		pack.push([zombie.posx, zombie.posy])
	}
	for(var player in GL.PLAYERS){
		
	}
	sendAllUsers('update', pack);
}, 20);

