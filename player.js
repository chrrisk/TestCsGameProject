class Player {
  constructor(y, width, height, img, auraImg) {
    this.img = img;
    this.auraImg = auraImg;
    this.frameCount = 0;
    this.animationSpeed = 0.12;
    this.lanes = [180, 475, 790];
    this.currentLane = 1;
    this.x = this.lanes[this.currentLane];
    this.targetX = this.x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.gravity = 0.8;
    this.velocityY = 0;
    this.jumpStrength = 17;
    this.isJumping = false;
    this.isGrounded = false;
    this.canMove = true;
    this.isTransitioning = false;
    this.transitionSpeed = 0.1;
    this.lives = 4;
    this.lifeGain = false;
  }

  letterGrade() {
    const letterLives = { 4: 'A', 3: 'B', 2: 'C', 1: 'D', 0: 'F' };
    return letterLives[this.lives];
  }

  move() {
    if (this.isTransitioning) {
      this.transitionSpeed += 0.02;
      this.x = lerp(this.x, this.targetX, this.transitionSpeed);

      if (abs(this.x - this.targetX) < 1) {
        this.x = this.targetX;
        this.isTransitioning = false;
        this.transitionSpeed = 0.1;
        this.canMove = true;
      }
    } else {
      if (this.canMove && (keyIsDown(LEFT_ARROW) || keyIsDown(65))) {
        if (this.currentLane > 0) {
          this.currentLane--;
          this.targetX = this.lanes[this.currentLane];
          this.isTransitioning = true;
          this.canMove = false;
        }
      }

      if (this.canMove && (keyIsDown(RIGHT_ARROW) || keyIsDown(68))) {
        if (this.currentLane < this.lanes.length - 1) {
          this.currentLane++;
          this.targetX = this.lanes[this.currentLane];
          this.isTransitioning = true;
          this.canMove = false;
        }
      }

      if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(65) && !keyIsDown(68)) {
        this.canMove = true;
      }
    }

    if ((keyIsDown(32) || keyIsDown(UP_ARROW)) && !this.isJumping && this.isGrounded) {
      this.isJumping = true;
      this.isGrounded = false;
      this.velocityY = -this.jumpStrength;

    }

    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y + this.height > height) {
      this.y = height - this.height;
      this.isGrounded = true;
      this.isJumping = false;
    }
  }

  display() {
    const spriteWidth = 32;
    const spriteHeight = 32;

    const sx = 8;
    const sy = 160;

    // powerup animation
    if (this.lifeGain) {
      const auraOffsetX = 74;
      const auraOffsetY = 50;

      image(this.auraImg, this.x - auraOffsetX, this.y - auraOffsetY, this.width + 100, this.height + 100);

      this.lifeGainFrames = (this.lifeGainFrames || 0) + 1;
      if (!this.isJumping && this.lifeGainFrames > 34) {
        this.lifeGain = false;
        this.lifeGainFrames = 0;
      }
    }

    else if (this.isJumping) {
      if (gameEnd) {
        image(this.img, this.x, this.y, this.width, this.height, sx + 28, sy + 200, spriteWidth, spriteHeight - 5);
      }
      else {
        image(this.img, this.x, this.y, this.width, this.height, sx + 32, sy + 90, spriteWidth, spriteHeight);
      }
    }
    else if (gameEnd) {
      // death animation
      image(this.img, this.x, this.y, this.width, this.height, sx + 28, sy + 200, spriteWidth, spriteHeight - 5);
    }
    else {
      const frames = [0, 1, 2, 1];
      const frameXCoordinates = [8, 40, 72, 40];
      const totalFrames = frames.length;

      this.frameCount += this.animationSpeed;
      const currentFrameIndex = Math.floor(this.frameCount) % totalFrames;
      const currentX = frameXCoordinates[currentFrameIndex];

      image(this.img, this.x, this.y, this.width, this.height, currentX, sy, spriteWidth, spriteHeight);
    }
  }

  resetPlayerToStartingPosition() { // CHECK THIS FUNCTION
    this.currentLane = 1;
    this.x = this.lanes[this.currentLane];
    this.targetX = this.x;
    this.y = height - 50;
    this.velocityY = 0;
    this.isJumping = false;
    this.isGrounded = false;
    this.canMove = true;
    this.isTransitioning = false;
    this.transitionSpeed = 0.1;
  }

  getPlayerPosition() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}
