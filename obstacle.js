// obstacle.js

class Obstacle {
  constructor(lane, x, size, img) {
    this.lane = lane;
    this.size = size / 10;
    this.width = this.size;
    this.height = this.size;
    this.starshipImg = img; // Store the image passed in
    this.x = x;
    this.y = 125; // Initial y position at the top of the stairs

    // Define base speed and horizontal drift
    this.baseSpeed = 4.15;
    this.horizontalDrift = this.lane === 0 ? -3 : this.lane === 2 ? 3 : 0;
  }

  move() {
    this.y += this.baseSpeed;
    this.x += this.horizontalDrift;
    this.width += 3.5;
    this.height += 3.5;
  }

  display() {
    image(this.starshipImg, this.x - this.width / 2, this.y, this.width, this.height);
  }

  offscreen() {
    return this.y > height;
  }

  getObstacleX() {
    return this.x;
  }

  getObstacleY() {
    return this.y;
  }
}
