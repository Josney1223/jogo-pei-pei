const Zombie = require('./Zombie.js');
const Wall = require('./Wall.js');
const Player = require('./Player');

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
        this.p = new Player(id, this.canvasSize[0], this.canvasSize[1], this.map, this.ZOMBIES);
        this.PLAYERS[id] = this.p;
        return this.p;
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
            this.zombie = new Zombie(this.map, this.PLAYERS);
            this.ZOMBIES.push(this.zombie);
        }
	return null;
    }

    update(){
        if(this.ZOMBIES.lenght <= 0){
            this.hordeNum++;
            this.spawnZombies();
        }        
        for(var z of this.ZOMBIES){
            z.update();
        }
        if (Object.keys(this.PLAYERS).length > 0){
            for(let id in this.PLAYERS){
                this.PLAYERS[id].update();
            }
        }        
    }
}

module.exports = GameLoop