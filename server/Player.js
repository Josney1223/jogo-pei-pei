const AliveBehavior = require('./AliveBehavior.js');
const Gun = require('./Gun.js');

class Player extends AliveBehavior{
    constructor(id, spawn_x, spawn_y, map, zombies){
        super(5, 10, 'anim',spawn_x, spawn_y, map)
        this.id = id;
        this.moveX = 0;
        this.moveY = 0;
        this.angle = 0;
        this.zombies = zombies; 
        this.playerGun = new Gun(1); 
        this.moveGhost = 10;              
    }

    getGun(){
        return this.playerGun;
    }

    getId(){
        return this.id;
    }

    getAngle(){
        return this.angle;
    }

    setAngle(angle){
        this.angle = angle;
    }

    setMoveX(direction) {
        this.moveGhost = 10; 
        this.moveX = direction;
    }

    setMoveY(direction){
        this.moveGhost = 10; 
        this.moveY = direction;
    }

    playerShoot(angle){
        this.playerGun.fire(angle, this.posX, this.posY);
    }

    update(){        
        this.playerGun.update();
        this.moveGhost--;
        
        if(this.moveGhost > 0){ 
            this.posX = this.posX + (this.moveX * this.spd);        
            this.posY = this.posY + (this.moveY * this.spd);
        }
    }
}

module.exports = Player