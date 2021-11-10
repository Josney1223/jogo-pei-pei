const Bullet = require('./Bullet.js');

class Gun{
    constructor(firerate){
        this.firerate = firerate*60;
        this.last_shoot = firerate;        
        this.bullet_list = []
    }

    fire(angle, posX, posY){
        if (this.last_shoot <= 0){
            this.last_shoot = this.firerate;
            var b = new Bullet(angle, posX, posY);
            this.bullet_list.push(b);
        }
    }

    getGunPack(){
        var pack = [];
        for (var b in this.bullet_list){            
            pack.push(this.bullet_list[b].getBulletPack());
        }        
        return pack
    }

    update(){
        this.last_shoot--;
        for (var b in this.bullet_list){            
            this.bullet_list[b].update();
        }
    }
}

module.exports = Gun