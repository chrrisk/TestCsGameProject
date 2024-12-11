// jumpableObstacle.js

class powerup extends Obstacle {
    constructor(lane, x, size, img) {
        super(lane, x, size, img);
        this.size = size * 2;
        this.width = this.size;
        this.height = this.size;
        this.y = 150;
    }

    display() {
        image(this.starshipImg, this.x - this.width / 2, this.y, this.width, this.height);
    }

    move() {
        this.y += this.baseSpeed * 1.25;
        this.x += this.horizontalDrift;
    }
}
