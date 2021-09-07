
class GameLoop{
    constructor(){
        this.PLAYERS = {};
        this.ZOMBIES = [];
        this.map = {}
        this.hordeNum = 0;
    }

    addPlayer(){
        player = new Player(this.map, this.ZOMBIES);
        this.PLAYERS[player] = player;
        return player;
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

class Wall{
    constructor(x, y, width, height){
        this.collider2d = [x, y, width, height]
        this.collider2dMovement = [x, y/4, width, height/4]
    }
}

module.exports = GameLoop