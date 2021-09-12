const AliveBehavior = require('./AliveBehavior.js')

/**
 * Jogador vai receber zombies e mapa como parametros do construtor
 */

class Zombie extends AliveBehavior {
    constructor(players, map) {
        super(3, 1, 'new Animator("Zombie")', 0, 0, map)
        this.players = players
    }    

    /**
     * Procura o jogador mais próximo para bater nele.
     */
    update(){
        // Verifica se tem um player no range do ataque,
        // se tem, então o zumbi irá atacá-lo,
        // senão, move em direção de um jogador.

        this.posX
        this.posY

        //this.playerPos[0]
        //this.playerPos[1]

        //let inRange = 1 + 1 === 2 ? true : false    // mock pro calculo do range

        if (inRange) {
            this.hit()
        }else{
            this.pathfind();
            this.move()
        }
    }

    /**
     * Ataca um jogador batendo nele.
     */
    hit(){
        // Mandar a posição do player pra algum lugar e o player toma dano?
    }

    /**
     * Procura o jogador mais próximo e o caminho mais rápido até ele.
     */
    pathfind(){
        // procurar o algoritmo (A*)
    }

}

module.exports = Zombie
