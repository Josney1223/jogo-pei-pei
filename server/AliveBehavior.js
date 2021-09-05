// Talvez isso seja coisa do Player pro lock
const NORTH = 0
const SOUTH = 1
const WEST = 2
const EAST = 3

const X0 = 0
const Y0 = 1
const X1 = 2
const Y1 = 3


class AliveBehavior {

    constructor(hp, spd, animator, spawn_x, spawn_y, map) {
        this.alive = true
        this.hp = hp
        this.spd = spd
        
        this.anim = animator;       // nao implementado ainda
        this.sprite = new Image()   // nao implementado ainda
        
        this.posX = spawn_x
        this.posY = spawn_y
        
        // Verificar depois só pra garantir
        this.map = map
    }

    get collider2d(){
        return [this.posX, this.posY, this.posX + this.sprite.width, this.posY + this.sprite.height]
    }

    get collider2dMovement(){
        return [this.posX + this.sprite.width * 3/4, this.posY + this.sprite.height * 3/4, this.posX + this.sprite.width, this.posY + this.sprite.height]
    }


    /**
     * Verifica se o ser vivo está colidindo com algo/alguém encima.
     * @returns um booleano indicando se haverá colisão. 
     */
    checkCollider2dNorth(collider){
        if(this.collider2d[Y0] >= collider[Y1]){
			return true;
		}	

        return false
    }

    /**
     * Verifica se o ser vivo está colidindo com algo/alguém embaixo.
     * @returns um booleano indicando se haverá colisão. 
     */
    checkCollider2dSouth(collider){
        if(this.collider2d[Y1] <= collider[Y0]){ 
			return true;
		}	

        return false
    }

    /**
     * Verifica se o ser vivo está colidindo com algo/alguém na direita.
     * @returns um booleano indicando se haverá colisão. 
     */
    checkCollider2dEast(collider){
        if(this.collider2d[X1] >= collider[X0]){
			return true;
		}	

        return false
    }

    /**
     * Verifica se o ser vivo está colidindo com algo/alguém na esquerda.
     * @returns um booleano indicando se haverá colisão. 
     */
    checkCollider2dWest(collider){
        if(this.collider2d[X0] <= collider[X1]){
			return true;
		}	

        return false
    }

    /**
     * Toma dano, reduzindo o hp.
     */
    takeDmg(damage){
        this.hp -= damage
    }

    /**
     * Move o ser vivo, se for possível.
     * @param {number} xAxis indica se deve mover no eixo X, valor negativo indica sul, valor positivo indica norte.
     * @param {number} yAxis indica se deve mover no eixo Y, valor negativo indica oeste, valor positivo indica leste.
     */
    move(xAxis, yAxis){
        let moveX = 0
        let moveY = 0

        if (xAxis > 0){
            if (!this.checkCollider2dEast()){
                moveX = xAxis * this.spd
            }
        }else if(xAxis < 0){
            if (!this.checkCollider2dWest()){
                moveX = xAxis * this.spd
            }
        }

        if (yAxis > 0){
            if (!this.checkCollider2dNorth()){
                moveY = yAxis * this.spd
            }
        }else if(yAxis < 0){
            if (!this.checkCollider2dSouth()){
                moveY = yAxis * this.spd
            }
        }

        // Se não colidir, então anda
        if (!this.checkCollider2d()){
            this.posX = this.posX + moveX
            this.posY = this.posY + moveY
        }
    }
}

module.exports = AliveBehavior
