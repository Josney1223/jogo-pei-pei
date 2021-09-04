
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
var PLAYER_LIST = {};
var ball;

rectUp = {x:0, y:0, width: 800, height: 0}
rectDown = {x:0, y:500, width: 800, height: 0}

var checkCollision2d = function(rect1, rect2){
	if(rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y){ // Collisao 
			return true;
		}	
	return false;
}

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

	var player = new Player(socket.id, Object.keys(SOCKET_LIST).length);
	PLAYER_LIST[socket.id] = player;

	socket.on('disconnect', function(){
		console.log("socket "+socket.id+" disconnected");
		delete PLAYER_LIST[socket.id];
		delete SOCKET_LIST[socket.id];
	});
	
	socket.on('keyPress', function(data){
		if(data.inputId == 'up') player.pressingUp = data.state;
		if(data.inputId == 'down') player.pressingDown = data.state;
	});
});

var sendAllUsers = function(messageType, data){
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit(messageType, data);
	}
}

setInterval(function(){
	var pack = []
	if (Object.keys(SOCKET_LIST).length >= 2) {		
		if(ball != null){
			ball.update();
			pack.push({
				x: ball.x,
				y: ball.y,
				width: ball.width,
				height: ball.height,
				number: false
			});
		} else ball = new Ball();
	}		
	for(var i in PLAYER_LIST){
		var player = PLAYER_LIST[i];
		player.update();	
		pack.push({
			x: player.x,
			y: player.y,
			width: player.width,
			height: player.height,
			number: player.number
		});
	}
	sendAllUsers('update', pack);
}, 20);

