class Wall{
    constructor(x, y, width, height){
        this.collider2d = [x, y, width, height]
        this.collider2dMovement = [x, y/4, width, height/4]
    }
}

module.exports = Wall