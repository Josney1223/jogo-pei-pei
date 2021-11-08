const Bullet = require('./Bullet.js');

class Gun{
    constructor(firerate){
        this.firerate = firerate*60;
        this.last_shoot = firerate;
        this.shoot = False;
        this.bullet_list = []
    }

    update(mousepress, angle, posX, posY){
        this.last_shoot--;

        if (this.last_shoot <= 0 && mousepress){
            this.last_shoot = this.firerate;
            this.shoot = true;
            this.bullet_list.push(new Bullet(angle, posX, posY))
        }

        for (b in this.bullet_list){
            b.update();
        }
    }
}

module.exports = Gun