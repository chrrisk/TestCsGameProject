// obstacleManager.js

class ObstacleManager {
  constructor(lanes, laneWidth, obstacleInterval, starImg, busImg, coin, leftbus, rightbus) {
    this.lanes = lanes;
    this.laneWidth = laneWidth;
    this.obstacleInterval = obstacleInterval;
    this.obstacles = [];
    this.usedLanes = [];
    this.starshipObs = starImg; // Store the image for obstacles
    this.busObs = busImg; // Store the image for obstacles
    this.coinImg = coin;
    this.leftbusimg = leftbus;
    this.rightbusimg = rightbus;

    // Define x positions for each lane (customized to align with stairs)
    this.lanePositions = [
      420,        // Left lane
      width / 2,  // Center lane
      600         // Right lane
    ];
  }

  update() {
    if (frameCount % this.obstacleInterval === 0) {
      this.spawnObstacles();
    }
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      this.obstacles[i].move();
      if (this.obstacles[i].offscreen()) {
        this.obstacles.splice(i, 1);
      }
    }
  }

  clearObstacles() {
    this.obstacles = [];
  }

  display() {
    for (let obstacle of this.obstacles) {
      obstacle.display();
    }
  }

  spawnObstacles() {
    let obstacleSize = 444;
    let jumpableObstacleSize = 85;
    let powerupSize = 50;
    this.usedLanes = [];

    let randomNumber = Math.floor(Math.random() * 10) + 1;
    if (randomNumber > 7) {
      var newObstacle1 = this.spawnUniqueObstacle(jumpableObstacleSize, "JumpableObstacle");
      this.obstacles.push(newObstacle1);
    } else {
      var newObstacle1 = this.spawnUniqueObstacle(obstacleSize, "Obstacle");
      this.obstacles.push(newObstacle1);
    }

    if (random() < 0.8) {
      let newObstacle2 = this.spawnUniqueObstacle(obstacleSize, "Obstacle");
      this.obstacles.push(newObstacle2);
    }

    if (random() < 1 / 5) {
      let newJumpable = this.spawnUniqueObstacle(jumpableObstacleSize, "JumpableObstacle");
      this.obstacles.push(newJumpable);
    }

    // even less chance to get a powerup
    if (random() < 1 / 9 && player.lives < 4) {
      let newObstacle3 = this.spawnUniqueObstacle(powerupSize, "powerup");
      this.obstacles.push(newObstacle3);
    }
  }

  spawnUniqueObstacle(obstacleSize, type) {
    let availableLanes = [];
    for (let i = 0; i < this.lanes; i++) {
      if (!this.usedLanes.includes(i)) {
        availableLanes.push(i);
      }
    }

    let randomLane = random(availableLanes);
    this.usedLanes.push(randomLane);
    let customX = this.lanePositions[randomLane];
    if (type === "JumpableObstacle") {
      return new JumpableObstacle(randomLane, customX, obstacleSize, this.starshipObs);
    } else if (type === "powerup") {
      return new powerup(randomLane, customX, obstacleSize, this.coinImg);
    }
    else {
      if (randomLane == 0) {
        return new Obstacle(randomLane, customX, obstacleSize, this.leftbusimg);
      }
      else if (randomLane == 2) {
        return new Obstacle(randomLane, customX, obstacleSize, this.rightbusimg);
      }
      else {
        return new Obstacle(randomLane, customX, obstacleSize, this.busObs);
      }
    }
  }

  trackObstacles() {
    return this.obstacles;
  }

}
