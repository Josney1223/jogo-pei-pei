const Zombie = require('./Zombie.js');
const Wall = require('./Wall.js');
const Player = require('./Player.js');
const Collider2D = require('./Collider2D.js');

class GameLoop{
    constructor(canvasSize){
        this.rectUp = new Collider2D(0, 0, 800, 1);
        this.rectDown = new Collider2D(0, 500, 800, 1);
        this.rectLeft = new Collider2D(0, 0, 1, 500);
        this.rectRight = new Collider2D(800, 500, 1, 500);
        this.canvasSize = canvasSize;
        this.PLAYERS = {};
        this.ZOMBIES = [];
        this.map = [this.rectUp, this.rectDown, this.rectLeft, this.rectRight];
        this.hordeNum = 0;
    }

    addPlayer(id){        
        this.p = new Player(id, 0, 400, this.map, this.ZOMBIES);
        this.PLAYERS[id] = this.p;
        return this.p;
    }

    removePlayer(id){
        delete this.PLAYERS[id];
    }

    spawnZombies(){
        for(var i=0; i < this.hordeNum*2; i++){
            z = new Zombie(this.map, this.PLAYERS);
            this.ZOMBIES.push(z);
        }	
    }

    update(){
        this.spawnZombies();
        /*
        if(this.ZOMBIES.lenght <= 0){
            this.hordeNum++;
            this.spawnZombies();
        } */       
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