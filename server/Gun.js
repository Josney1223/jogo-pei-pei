const Bullet = require('./Bullet.js');

class Gun{
    constructor(firerate){
        this.firerate = firerate*60;
        this.last_shoot = firerate;
        this.shoot = false;
        this.bullet_list = []
    }

    fire(angle, posX, posY){
        this.last_shoot--;

        if (this.last_shoot <= 0){
            this.last_shoot = this.firerate;
            this.shoot = true;
            this.bullet_list.push(new Bullet(angle, posX, posY))
        }

    }

    getBullets(){
        var lista = [];
        var pos = [];
        for (var b in this.bullet_list){
            pos[0] = this.bullet_list[b].getPosX();
            pos[1] = this.bullet_list[b].getPosY();
            lista[b] = pos;
        }        
        return lista
    }

    update(){
        for (var b in this.bullet_list){            
            this.bullet_list[b].update();
        }
    }
}

module.exports = Gun