
class GameLoop{
    constructor(){              
        this.addPlayer = function(player){
            this.PLAYERS[player] = player;
        }

        this.spawnZombies = function(){
            for(var i=0; i < this.hordeNum*2; i++){
                zombie = new Zombie();
                this.ZOMBIES.push(zombie);
            }
        }
    
        this.update = function(){
            if(this.ZOMBIES.lenght <= 0){
                this.hordeNum++;
                this.spawnZombies();
            }

            for(var zombie in this.ZOMBIES){
                zombie.update(this.map, this.PLAYERS);
            }
            for(var player in this.PLAYERS){
                player.update(this.map, this.ZOMBIES);
            }
        }

        this.PLAYERS = {};
        this.ZOMBIES = [];
        this.map = {}
        this.hordeNum = 0;
    }
}

class Wall{
    constructor(x, y, width, height){
        this.collider2d = [x, y, width, height]
        this.collider2dMovement = [x, y/4, width, height/4]
    }
}