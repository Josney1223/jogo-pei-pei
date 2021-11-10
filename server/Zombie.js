const AliveBehavior = require('./AliveBehavior.js')

/**
 * Jogador vai receber zombies e mapa como parametros do construtor
 */

class Zombie extends AliveBehavior {
    constructor(players, map) {
        super(3, 50, 'new Animator("Zombie")', Math.random()*700, 250, map)
        this.players = players
        this.timer = 10*this.spd;
    }    

    /**
     * Procura o jogador mais próximo para bater nele.
     */
    update(){
       if (this.timer <= 0){
            this.hit();
            this.alive = false;
       } else {
            this.timer--;
       }

       for (var p in this.players){
           for (var b in this.players[p].playerGun.bullet_list){
               this.checkAllCollider2d(this.players[p].playerGun.bullet_list[b].collider);
           }
       }
    }

    /**
     * Ataca um jogador batendo nele.
     */
    hit(){
        for (var p in this.players){
            this.players[p].takeDmg(1);
        }
    }
}

module.exports = Zombie
