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
        this.pressingUp = false;
        this.pressingDown = false;
        this.pressingLeft = false;                     
        this.pressingRight = false;
        this.aim = {x: this.posX, y: this.posY};      
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

    getAim(){
        return this.aim;
    }

    playerMove(xAxis, yAxis){
        this.move(xAxis, yAxis);
    }

    moveAim(xAxis, yAxis){
        this.aim.x = this.aim.x + (xAxis*10);
        this.aim.y = this.aim.y + (yAxis*10);
    }

    setAngle(angle){
        this.angle = angle;
    }

    playerShoot(){        
        this.playerGun.fire(this.angle, this.posX, this.posY);
    }

    update(){
        this.playerGun.update();                        
    }
}

module.exports = Player