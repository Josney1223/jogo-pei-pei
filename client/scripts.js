var gameCanvas = document.getElementById("game_canvas").getContext("2d");
var socket = io();
var last_angle = 0;
var angulo = 0;
var img = new Image();
var bgImg = new Image();
var aim = {x: 0, y: 0}

socket.on('update', function(data) {
    gameCanvas.clearRect(0,0, 800, 500);
    draw(0,0,0,"/static/img/graveyard.png");

    //for(const [key, value])

    for(const [key,value] of Object.entries(data.players)) {
        draw(data.players[key]['pos'][0], data.players[key]['pos'][1],data.players[key]['angle'], "/static/img/pepe.png");
        drawAim(data.players[key]['aim']['x'], data.players[key]['aim']['y']);
        angulo = angle(data.players[key]['pos'][0], data.players[key]['pos'][1], data.players[key]['aim']['x'], data.players[key]['aim']['y']);

        for(var b in data.players[key]['bullets']) {           
            gameCanvas.fillRect(data.players[key]['bullets'][b]['x'], data.players[key]['bullets'][b]['y'],10,10);
        }
    }
});

function drawAim(x, y){
    gameCanvas.fillRect(x, y+10, 10, 10);
    gameCanvas.fillRect(x+10, y, 10, 10);
    gameCanvas.fillRect(x, y-10, 10, 10);
    gameCanvas.fillRect(x-10, y, 10, 10);
    
    aim.x = x;
    aim.y = y;
}

function draw(x,y,angle, src) {
    gameCanvas.save()
    gameCanvas.rotate(angle)
    img.onload = function() {
        gameCanvas.drawImage(img, x, y)
    }
    img.src = src
    gameCanvas.restore()
}

function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

//Evento do teclado
document.onkeydown = function(event){
    if(event.keyCode == 83) socket.emit('keyPress', {inputId: 'down', state: true});
    if(event.keyCode == 87) socket.emit('keyPress', {inputId: 'up', state: true});
    if(event.keyCode == 65) socket.emit('keyPress', {inputId: 'left', state: true});
    if(event.keyCode == 68) socket.emit('keyPress', {inputId: 'right', state: true});

    if(event.keyCode == 40) socket.emit('keyPress', {inputId: 'aim_down', state: true});
    if(event.keyCode == 38) socket.emit('keyPress', {inputId: 'aim_up', state: true});
    if(event.keyCode == 37) socket.emit('keyPress', {inputId: 'aim_left', state: true});
    if(event.keyCode == 39) socket.emit('keyPress', {inputId: 'aim_right', state: true});

    if(event.keyCode == 32) {
        if (angulo > last_angle + 1 || angulo < last_angle - 1){
            last_angle = angulo;
            socket.emit('keyPress', {inputId: 'mouseAngle', state: angulo});
        }
        socket.emit('keyPress', {inputId: 'shootBullet', state: true});
    }
}

document.onkeyup = function(event){
    if(event.keyCode == 83) socket.emit('keyPress', {inputId: 'down', state: false});
    if(event.keyCode == 87) socket.emit('keyPress', {inputId: 'up', state: false});
    if(event.keyCode == 65) socket.emit('keyPress', {inputId: 'left', state: false});
    if(event.keyCode == 68) socket.emit('keyPress', {inputId: 'right', state: false});

    if(event.keyCode == 40) socket.emit('keyPress', {inputId: 'aim_down', state: false});
    if(event.keyCode == 38) socket.emit('keyPress', {inputId: 'aim_up', state: false});
    if(event.keyCode == 37) socket.emit('keyPress', {inputId: 'aim_left', state: false});
    if(event.keyCode == 39) socket.emit('keyPress', {inputId: 'aim_right', state: false});

    if(event.keyCode == 32) {
        if (angulo > last_angle + 1 || angulo < last_angle - 1){
            last_angle = angulo;
            socket.emit('keyPress', {inputId: 'mouseAngle', state: angulo});
        }
        socket.emit('keyPress', {inputId: 'shootBullet', state: false});
    }
}

//Evento do Mouse
document.onmousedown = function(event) {
    if (angulo > last_angle + 1 || angulo < last_angle - 1){
        last_angle = angulo;
        socket.emit('keyPress', {inputId: 'mouseAngle', state: angulo});
    }
    socket.emit('keyPress', {inputId: 'shootBullet', state: true})
}
document.onmouseup = function() {
    if (angulo > last_angle + 1 || angulo < last_angle - 1){
        last_angle = angulo;
        socket.emit('keyPress', {inputId: 'mouseAngle', state: angulo});
    }
    socket.emit('keyPress', {inputId: 'shootBullet', state: false})
}
/*
document.onmousemove = function(event) {    
    var x = event.pageX - 900;
    var y = event.pageY - 800;    
    var angle = Math.atan2(x, y)* 180 / Math.PI;
    if (angle > last_angle + 1 || angle < last_angle - 1){
        last_angle = angle;
        socket.emit('keyPress', {inputId: 'mouseAngle', state: angle});
    }
}*/