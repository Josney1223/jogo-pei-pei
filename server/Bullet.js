
class Bullet{
    constructor(angle, posX, posY){
        this.angle = angle;
        this.posX = posX;
        this.posY = posY;
        this.spdX = Math.cos(angle/180);
        this.spdY = Math.sin(angle/180);
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    update(){
        this.posX = this.posX + this.spdX;
        this.posY = this.posY + this.spdY;
    }

}


module.exports = Bullet