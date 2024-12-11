// sketch.js

let gameStarted = false;
let player;
let obstacleManager;
let img;
let lastScoreUpdate;
let score = 0;
let hit = false;
let song;
let isLooping = false;
let scooter;
let incomingscooter = false;
let scooterbuf = 0;
let noobstaclemode = false;



function preload() {
  scooterRImg = loadImage('assets/scooterR.png');
  // soccerImg = loadImage('assets/soccer.png'); // Load the soccer ball image
  // idleImg = loadImage('assets/idle.png'); // Load the idle animation image
  img = loadImage('assets/stairs.jpg');
  logo = loadImage('assets/8bitlogo.png');
  starship = loadImage('assets/starship.png');
  bus = loadImage('assets/bus.png');
  playerImg = loadImage('assets/Prototype_Character/Prototype_Character.png');
  coin = loadImage('assets/CSduck.png');
  leftbus = loadImage('assets/leftlanebus.PNG');
  rightbus = loadImage('assets/rightlanebus.PNG');
  aura = loadImage('assets/powerupAura.png');
  song = loadSound('assets/from-the-sky-cinematic-action-loop-261293.mp3');
  song.setVolume(.04);
  greenStoplightImg = loadImage('assets/green_stoplight.png'); // Load the green stoplight image
  redStoplightImg = loadImage('assets/red_stoplight.png'); // Load the red stoplight image
}

function startGameClicked() {
  console.log('Start button clicked');
  removeButton('how-to-button')
  startGame();
  document.getElementById('start-button').style.display = 'none';
  if (!isLooping) {
    song.loop();
    isLooping = true;
  }
}

function startGame() {
  console.log('Game started');
  gameStarted = true;
  player = new Player(height - 50, 100, 100, playerImg, aura);
  obstacleManager = new ObstacleManager(3, 3000, 120, starship, bus, coin, leftbus, rightbus);
  lastScoreUpdate = millis();
  score = 0;
  obstacleManager.clearObstacles();
  scooter = new SoccerBall(-30, height - 25, 90, scooterRImg); // Initialize the soccer ball at the bottom
  // soccerPlayer = new SoccerPlayer(0, height - 50, idleImg, 35); // Initialize the soccer player at the bottom left
  // soccerPlayer2 = new SoccerPlayer(965, height - 50, idleImg, 35); // Initialize the soccer player at the bottom left
  stoplightshow = new Stoplight(0, 460, greenStoplightImg, redStoplightImg); // Initialize the stoplight at the top center
}

function setup() {
  let canvas = createCanvas(1000, 600);//
  canvas.id('gameCanvas');
}

function draw() {
  background(img);
  if (gameStarted) {
    document.getElementById('livesCount').innerText = player.letterGrade();

    let currentTime = millis();
    if (hit) {
      currentTime = 0;
      if (frameCount % 150 == 1) {
        currentTime = millis();
        hit = false;
      }
    } else if (currentTime - lastScoreUpdate >= 100) {
      score++;
      document.getElementById('scoreCount').innerText = score;
      lastScoreUpdate = currentTime;
    }

    if (!noobstaclemode && obstacleManager && obstacleManager.display) {
      obstacleManager.update();
      obstacleManager.display();
    }

    if (player && player.display) {
      player.move();
      player.display();
    }

    // Move and display the soccer ball
    if (scooter) {
      scooter.move();
      scooter.display();
    }

    // check for a collision between player and soccer ball using player.getPlayerPosition() and scooterR.getBallPosition()
    let playerInfo = player.getPlayerPosition();
    let ballInfo = scooter.getBallPosition();
    if (playerInfo.x < ballInfo.x + ballInfo.size / 5 && // Reduce the right side hitbox by 10 pixels
      playerInfo.x + playerInfo.width > ballInfo.x + 5 && // Reduce the left side hitbox by 10 pixels
      playerInfo.y < ballInfo.y + ballInfo.size &&
      playerInfo.y + playerInfo.height > ballInfo.y) {
      if (player.isJumping) {
        console.log("Player Jump");
      } else {
        player.lives--;
        scooter.resetBall();
        incomingscooter = false;
        scooterbuf = 0;
        stoplightshow.redStoplight();
        // lostLife();
        // restartSketch();
        console.log("Player hit soccer ball");
        if (player.lives <= 0) {
          gameEnd = true;
          gameStarted = false;
          addButton('restart-button', 'Restart', () => {
            console.log('Restart button clicked');
            restartSketch();
            removeButton('restart-button');
          });
          addButton('how-to-button', 'How To Play', () => {
            window.location.href = 'howto.html';
          });
        } else {
          // scooter.resetBall();
          incomingscooter = false;
          scooterbuf = 0;
          stoplightshow.redStoplight();
          lostLife();
          // restartSketch();
        }
      }
    }

    let randomNumber = Math.floor(Math.random() * 600) + 1;
    // let randomNumber = Math.floor(Math.random() * 10) + 1;
    if (randomNumber === 8) {
      if (scooter.moving === false) {
        scooter.resetBall();
        incomingscooter = true;
      }
    }

    if (incomingscooter) {
      scooterbuf++;
      stoplightshow.greenStoplight();
      if (scooterbuf > 200) {
        scooter.kickToOtherSide();
        incomingscooter = false;
        scooterbuf = 0;
      }
    }
    else {
      incomingscooter = false;
      scooterbuf = 0;
      stoplightshow.redStoplight();
    }

    // stoplightshow.redStoplight();
    stoplightshow.display();

    document.getElementById('livesCount').innerText = player.letterGrade();

    // every other frame for performance
    if (frameCount % 2 == 1) {
      checkForCollisions(player, obstacleManager);
    }
  } else if (gameEnd) {
    player.display();
    document.getElementById('restart-button').style.display = 'block';
  }
}

function restartSketch() {
  removeButton('how-to-button');
  obstacleManager.clearObstacles();
  player.resetPlayerToStartingPosition();
  player.lives = 4;
  gameStarted = true;
  gameEnd = false;
  score = 0;
  document.getElementById('scoreCount').innerText = score;
  lastScoreUpdate = millis();
  document.getElementById('restart-button').style.display = 'none';
  scooter = new SoccerBall(-30, height - 25, 90, scooterRImg); // Initialize the soccer ball at the bottom
  incomingscooter = false;
  scooterbuf = 0;
  stoplightshow.redStoplight();
  // soccerPlayer = new SoccerPlayer(0, height - 50, idleImg, 35); // Initialize the soccer player at the bottom left
  // soccerPlayer2 = new SoccerPlayer(965, height - 50, idleImg, 35); // Initialize the soccer player at the bottom left
}

function lostLife() {
  obstacleManager.clearObstacles();
  flashRedScreen();
  scooter.resetBall();
  incomingscooter = false;
  scooterbuf = 0;
  stoplightshow.redStoplight();
  if (player.lives === 0) {
    if (isLooping) {
      isLooping = false;
      song.stop();
    }
    gameEnd = true;
    gameStarted = false;
    addButton('restart-button', 'Restart', () => {
      console.log('Restart button clicked');
      restartSketch();
      removeButton('restart-button');
    });
    addButton('how-to-button', 'How To Play', () => {
      window.location.href = 'howto.html';
    });
  }
  hit = true;
}

function flashRedScreen() {
  let originalBackground = document.body.style.backgroundColor;
  document.body.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
  setTimeout(() => {
    document.body.style.backgroundColor = originalBackground;
  }, 10);
}

function flashGreenScreen() {
  let originalBackground = document.body.style.backgroundColor;
  document.body.style.backgroundColor = 'rgba(0, 190, 0, 0.7)';
  setTimeout(() => {
    document.body.style.backgroundColor = originalBackground;
  }, 10);
}

function gainedLife() {
  obstacleManager.clearObstacles();
  flashGreenScreen();
  player.lives++;
  player.lifeGain = true;
  player.lifeGainFrames = 0;
  if (player.lives > 4) {
    player.lives = 4;
  }
  if (!player.isJumping && player.isGrounded) {
    player.isJumping = true;
    player.isGrounded = false;
    player.velocityY = -player.jumpStrength;
  }


}
