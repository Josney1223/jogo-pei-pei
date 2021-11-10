const Collider2D = require('./Collider2D.js')
const Sprite = require('./Sprite.js')

// Talvez isso seja coisa do Player pro lock
const NORTH = 0
const SOUTH = 1
const WEST = 2
const EAST = 3

class AliveBehavior {

    constructor(hp, spd, animator, spawn_x, spawn_y, map) {
        this.alive = true
        this.hp = hp
        this.spd = spd
        this.movX = 0
        this.movY = 0
        
        //this.anim = animator;       // nao implementado ainda
        this.spr = new Sprite([128, 128], '')   // nao implementado ainda

        this.posX = spawn_x
        this.posY = spawn_y

        this.collider2d = new Collider2D(spawn_x, spawn_y, this.spr.width, this.spr.height)
        this.collider2dMovement = new Collider2D(spawn_x + this.spr.width * 3/4, spawn_y + this.spr.width * 3/4, this.spr.width , this.spr.height)
        
        // Verificar depois só pra garantir
        this.map = map
    }

    get hitboxBorder(){
        return this.spd + 5
    }

    get movementHitboxHeight(){
        return 0.75 * this.spr.height
    }

    get getPosX(){
        return this.posX;
    }

    get getPosY(){
        return this.posY;
    }
    /**
     * Verifica se o ser vivo está colidindo com algo/alguém encima.
     * @returns um booleano indicando se haverá colisão. 
     */
    checkCollider2dNorth(collider){
        // x0 = this.collider2d.x + this.hitboxBorder
        // y0 = this.collider2d.y + this.movementHitboxHeight
        // x1 = this.collider2d.x + this.collider2d.width - this.hitboxBorder
        // y1 = this.collider2d.y + this.movementHitboxHeight + this.hitboxBorder

        if (this.collider2d.x + this.hitboxBorder < collider.x + collider.width &&
            this.collider2d.x + this.collider2d.width - this.hitboxBorder > collider.x &&
            this.collider2d.y + this.movementHitboxHeight < collider.y + collider.height &&
            this.collider2d.y + this.movementHitboxHeight + this.hitboxBorder > collider.y + this.movementHitboxHeight){
            return true
        };

        return false
    }

    /**
     * Verifica se o ser vivo está colidindo com algo/alguém embaixo.
     * @returns um booleano indicando se haverá colisão. 
     */
    checkCollider2dSouth(collider){
        // x0 = this.collider2d.x + this.hitboxBorder
        // y0 = this.collider2d.y + this.collider2d.height - this.hitboxBorder
        // x1 = this.collider2d.x + this.collider2d.width - this.hitboxBorder
        // y1 = this.collider2d.y + this.collider2d.height

        if (this.collider2d.x + this.hitboxBorder < collider.x + collider.width - this.hitboxBorder &&
            this.collider2d.x + this.collider2d.width - this.hitboxBorder > collider.x + this.hitboxBorder &&
            this.collider2d.y + this.collider2d.height - this.hitboxBorder < collider.y + collider.height - this.hitboxBorder &&
            this.collider2d.y + this.collider2d.height > collider.y + collider.height - this.hitboxBorder){
            return true
        };

        return false
    }

    /**
     * Verifica se o ser vivo está colidindo com algo/alguém na direita.
     * @returns um booleano indicando se haverá colisão. 
     */
    checkCollider2dEast(collider){
        // x0 = this.collider2d.x + this.collider2d.width - this.hitboxBorder
        // y0 = this.collider2d.y + this.movementHitboxHeight + this.hitboxBorder
        // x1 = this.collider2d.x + this.collider2d.width
        // y1 = this.collider2d.y + this.collider2d.height - this.hitboxBorder
        
        if (this.collider2d.x + this.collider2d.width - this.hitboxBorder < collider.x + collider.width &&
            this.collider2d.x + this.collider2d.width > collider.x + collider.width - this.hitboxBorder &&
            this.collider2d.y + this.movementHitboxHeight + this.hitboxBorder < collider.y + collider.height - this.hitboxBorder &&
            this.collider2d.y + this.collider2d.height - this.hitboxBorder > collider.y + this.hitboxBorder){
            return true
        };

        return false
    }

    /**
     * Verifica se o ser vivo está colidindo com algo/alguém na esquerda.
     * @returns um booleano indicando se haverá colisão. 
     */
    checkCollider2dWest(collider){
        // x0 = this.collider2d.x
        // y0 = this.collider2d.y + this.movementHitboxHeight + this.hitboxBorder
        // x1 = this.collider2d.x + this.hitboxBorder
        // y1 = this.collider2d.y + this.collider2d.height - this.hitboxBorder

        if (this.collider2d.x < collider.x + this.hitboxBorder &&
            this.collider2d.x + this.hitboxBorder > collider.x &&
            this.collider2d.y + this.movementHitboxHeight + this.hitboxBorder < collider.y + collider.height - this.hitboxBorder &&
            this.collider2d.y + this.collider2d.height - this.hitboxBorder > collider.y + this.hitboxBorder){
            return true
        };

        return false
    }

    checkAllCollider2d(collider){
        if(this.checkCollider2dEast(collider) || this.checkCollider2dNorth(collider) || this.checkCollider2dSouth(collider) || this.checkCollider2dWest(collider)){
            return true
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
     * @param {number} xAxis indica se deve mover no eixo X, valor negativo indica oeste, valor positivo indica leste.
     * @param {number} yAxis indica se deve mover no eixo Y, valor negativo indica norte, valor positivo indica sul.
     */
    move(xAxis, yAxis){
        let moveX = 0
        let moveY = 0
        let i
        let collided = false
        let mapSize = this.map.length-1        

        if (xAxis > 0){
            i = 0
            
            do{
                collided = this.checkCollider2dEast(this.map[i])
                i++
            }while(!collided && i < mapSize)
            
            if (!collided){
                moveX = xAxis * this.spd
            }

        }else if(xAxis < 0){
             i = 0
            
            do{
                collided = this.checkCollider2dWest(this.map[i])
                i++
            }while(!collided && i < mapSize)
            
            if (!collided){
                moveX = xAxis * this.spd
            }
        }

        if (yAxis > 0){
            i = 0
            
            do{
                collided = this.checkCollider2dSouth(this.map[i])
                i++
            }while(!collided && i < mapSize)
            
            if (!collided){
                moveY = yAxis * this.spd
            }
        }else if(yAxis < 0){
            i = 0
            
            do{
                collided = this.checkCollider2dNorth(this.map[i])
                i++
            }while(!collided && i < mapSize)
            
            if (!collided){
                moveY = yAxis * this.spd
            }
        }

        // Se não colidir, então anda
        this.posX = this.posX + moveX
        this.posY = this.posY + moveY

        this.collider2d.x = this.posX
        this.collider2d.y = this.posY
    }
}

module.exports = AliveBehavior
