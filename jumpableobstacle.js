// jumpableObstacle.js

class JumpableObstacle extends Obstacle {
  constructor(lane, x, size, img) {
    super(lane, x, size, img);
    this.size = size / 3;
    this.width = this.size;
    this.height = this.size;
    this.y = 150;
  }

  display() {
    image(this.starshipImg, this.x - this.width / 2, this.y, this.width, this.height);
  }

  move() {
    this.y += this.baseSpeed;
    this.x += this.horizontalDrift;
    this.width += 1.5;
    this.height += 1.5;
  }
}
