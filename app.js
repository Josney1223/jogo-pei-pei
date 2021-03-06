const GameLoop = require('./server/gameLoop.js');
const Player = require('./server/Player.js');
const app = require('express')();
const httpServer = require("http").createServer(app);
const path = require("path")
const express = require('express')

// Rotas
app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/about', function(req, res){
	res.sendFile(__dirname + '/client/about.html');
});

app.get('/game', function(req, res){
	res.sendFile(__dirname + '/client/game.html');
});

app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/scripts", express.static(path.join(__dirname, "client/scripts.js")));
app.use('/static', express.static('public'));

//httpServer.listen(2000, '172.29.159.207');
httpServer.listen(2000, '172.29.55.251');
console.log('server initialized')

// Backend
var canvas_size = [800, 500];
var SOCKET_LIST = {};
var GL = new GameLoop(canvas_size);

//Socket.io
const io = require("socket.io")(httpServer, {});

io.on("connection", (socket) => {
	console.log("socket "+socket.id+" connected");
	SOCKET_LIST[socket.id] = socket; 
	
	GL.addPlayer(socket.id);

	socket.on('disconnect', function(){
		console.log("socket "+socket.id+" disconnected");		
		GL.removePlayer(socket.id);
		delete SOCKET_LIST[socket.id];
	});
	
	socket.on('keyPress', function(data){
		switch(data.inputId) {			
			/*case('up'): 
				GL.PLAYERS[socket.id].move(0, -1);
				break;
			case('down'):
				GL.PLAYERS[socket.id].move(0, 1);
				break;*/
			case('left'):
				GL.PLAYERS[socket.id].move(-1, 0);
				break;
			case('right'):
				GL.PLAYERS[socket.id].move(1, 0);					
				break;	
			case('aim_up'):
				GL.PLAYERS[socket.id].moveAim(0,-1);
				break;	
			case('aim_down'):
				GL.PLAYERS[socket.id].moveAim(0,1);
				break;
			case('aim_left'):
				GL.PLAYERS[socket.id].moveAim(-1,0);
				break;
			case('aim_right'):
				GL.PLAYERS[socket.id].moveAim(1,0);
				break;		
			case 'shootBullet':
				GL.PLAYERS[socket.id].playerShoot();
				break;
			case 'mouseAngle':
				GL.PLAYERS[socket.id].setAngle(data.state);				
				break;			
		}
	});
});

var sendAllUsers = function(messageType, data){
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit(messageType, data);
	}
}

setInterval(function(){
	var pack = {zombies : [], players: {}};
	GL.update();	
	for(var z in GL.ZOMBIES){
		pack.zombies.push([GL.ZOMBIES[z].getPosX, GL.ZOMBIES[z].getPosY]);
	}
	for(var id in GL.PLAYERS){
		pack['players'][id] = {}
		pack['players'][id]['pos'] = [GL.PLAYERS[id].getPosX, GL.PLAYERS[id].getPosY] 
		pack['players'][id]['bullets'] = GL.PLAYERS[id].getGun().getGunPack();
		pack['players'][id]['angle'] = GL.PLAYERS[id].getAngle();
		pack['players'][id]['aim'] = GL.PLAYERS[id].getAim();
	}
	sendAllUsers('update', pack);
}, 20);

