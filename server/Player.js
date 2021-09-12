const AliveBehavior = require('./AliveBehavior.js');

class Player extends AliveBehavior{
    constructor(id, spawn_x, spawn_y, map, zombies){
        super(5, 10, 'anim',spawn_x, spawn_y, map)
        this.id = id;
        this.moveX = 0;
        this.moveY = 0;
        this.zombies = zombies;        
    }

    getId(){
        return this.id;
    }

    setMoveX(direction) {
        this.moveX = this.moveX + direction;
    }

    setMoveY(direction){
        this.moveY = direction;
    }

    shoot(direction){
        
    }

    update(){        
        this.posX = this.posX + (this.moveX * this.spd);        
        this.posY = this.posY + (this.moveY * this.spd);
    }
}

module.exports = Player