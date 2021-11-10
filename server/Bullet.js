const Collider2D = require('./Collider2D.js');

class Bullet{
    constructor(angle, posX, posY){
        this.angle = angle;
        this.posX = posX;
        this.posY = posY;
        this.spdX = Math.cos(angle/180*Math.PI) * 10;
        this.spdY = Math.sin(angle/180*Math.PI) * 10;
        this.timer = 0;        
        this.collider = new Collider2D(posX, posY, 10, 10);
    }

    getBulletPack(){
        return {x: this.posX, y: this.posY}
    }    

    update(){
        this.posX = this.posX + this.spdX;
        this.posY = this.posY + this.spdY; 
        this.timer++;
        if(this.timer > 100){
            delete this;
        }
    }

}


module.exports = Bullet