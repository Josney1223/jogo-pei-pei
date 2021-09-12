const Zombie = require('Zombie.js');
const Wall = require('Wall.js');

class GameLoop{
    constructor(canvasSize){
        this.rectUp = {x:0, y:0, width: 800, height: 1};
        this.rectDown = {x:0, y:500, width: 800, height: 1};
        this.rectLeft = {x:0, y:0, width:1, height: 500};
        this.rectRight = {x: 800, y: 500, width: 1, height: 500};
        this.canvasSize = canvasSize;
        this.PLAYERS = {};
        this.ZOMBIES = [];
        this.map = {}
        this.hordeNum = 0;
    }

    addPlayer(id){
        player = new Player(id, canvasSize[0], canvasSize[1], this.map, this.ZOMBIES);
        this.PLAYERS[player] = player;
        return player;
    }

    removePlayer(id){
        for(var i =0; i < this.PLAYERS.lenght; i++){
            if(this.PLAYERS[i].getId() == id){
                delete this.PLAYERS[i];
                break;
            }
        }
    }

    spawnZombies(){
        for(var i=0; i < this.hordeNum*2; i++){
            zombie = new Zombie(this.map, this.PLAYERS);
            this.ZOMBIES.push(zombie);
        }
	return null;
    }

    update(){
        if(this.ZOMBIES.lenght <= 0){
            this.hordeNum++;
            this.spawnZombies();
        }
        for(var zombie in this.ZOMBIES){
            zombie.update();
        }
        for(var player in this.PLAYERS){
            player.update();
        }
    }
}

module.exports = GameLoop