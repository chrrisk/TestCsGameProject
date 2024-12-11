class UI {
  constructor() {
    this.score = 0;
    this.scoreIncrement = 1;
    this.frameInterval = 60; // Increase score every 60 frames (1 second at 60fps)
  }

  update() {
    if (frameCount % this.frameInterval === 0) {
      this.score += this.scoreIncrement;
    }
  }

  display() {
    textSize(32);
    fill(255);
    textAlign(RIGHT, TOP);
    text(`Score: ${this.score}`, width - 20, 20);
  }
}
