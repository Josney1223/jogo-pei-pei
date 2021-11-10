var gameCanvas = document.getElementById("game_canvas").getContext("2d");
var socket = io();
var last_angle = 0;
var img = new Image();

socket.on('update', async function(data) {
    gameCanvas.clearRect(0,0, 800, 500)
    for(const [key,value] of Object.entries(data.players)) {
        draw(data.players[key]['pos'][0], data.players[key]['pos'][1],data.players[key]['angle'])
        for(var b in data.players[key]['bullets']) {
            console.log(data)
            gameCanvas.fillRect(data.players[key]['bullets'][b][0],data.players[key]['bullets'][b][1],10,10)
        }
    }

});

function draw(x,y,angle) {
    gameCanvas.save()
    gameCanvas.rotate(angle)
    img.onload = function() {
        gameCanvas.drawImage(img, x, y)
    }
    img.src = "/static/img/pepe.png"
    gameCanvas.restore()
}

//Evento do teclado
document.onkeydown = function(event) {
    const key = event.key.toLowerCase();
    if(key === "d") {
        socket.emit('keyPress',{inputId: 'right', state: true});
    } else if (key === "s") {
        socket.emit('keyPress',{inputId: 'down', state: true});
    } else if (key === "a") {
        socket.emit('keyPress',{inputId: 'left', state: true});
    } else if (key === "w") {
        socket.emit('keyPress',{inputId: 'up', state: true});
    }
}

//Evento do Mouse
document.onmouseup = function() {
    socket.emit('keyPress', {inputId: 'shootBullet', state: false})
}
document.onmousemove = function(event) {
    //Isso é para essa caixinha
    //Tem que pegar o do player (talvez fazer um que vai ter o tamanho do player enquanto não há sprite pra ele)
    //Ver como fazer essa conexao entre img e angulo
    let box = document.querySelector(".box");
    let boxBoundingRect = box.getBoundingClientRect();
    let boxCenter= {
        x: boxBoundingRect.left + boxBoundingRect.width/2, 
        y: boxBoundingRect.top + boxBoundingRect.height/2
    };

    document.addEventListener("mousemove", e => {
        let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y) )*(180 / Math.PI);	
        box.style.transform = `rotate(${angle}deg)`;
        if (angle > last_angle + 1 || angle < last_angle - 1){
            last_angle = angle;
            socket.emit('keyPress', {inputId: 'mouseAngle', state: [event.clientX, event.clientY, angle]});
        }
    })
}