
let gameEnd = false;

function startGame() {
  gameStarted = true;
}

function checkForCollisions(player, obstacle) {
  if (!gameStarted) return;

  const playerInfo = player.getPlayerPosition();
  const obsArray = obstacle.trackObstacles();
  
  for (const obs of obsArray) {
    const hitbox = {
      player: {
        left: playerInfo.x + 25,
        right: playerInfo.x + playerInfo.width - 25,
        top: playerInfo.y + 25,
        bottom: playerInfo.y + playerInfo.height / 2
      },
      obstacle: {
        left: obs instanceof powerup ? obs.x - obs.width : obs.x - obs.width / 5,
        right: obs instanceof powerup ? obs.x + obs.width : obs.x + obs.width / 5,
        top: obs.y,
        bottom: obs.y + obs.height - 25
      }
    };

    if (hitbox.player.left < hitbox.obstacle.right &&
        hitbox.player.right > hitbox.obstacle.left &&
        hitbox.player.top < hitbox.obstacle.bottom &&
        hitbox.player.bottom > hitbox.obstacle.top) {
      
      if (obs instanceof powerup) {
        gainedLife();
        break;
      } else if (obs instanceof JumpableObstacle) {
        if (player.isJumping) {
          console.log("player successfully jumped over jumpable obstacle");
        } else {
          player.lives--;
          console.log("Player hit jumpable obstacle");
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
            lostLife();
          }
        }
        break;
      } else {
        player.lives--;
        console.log("player hit non jumpable obstacle");
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
          lostLife();
        }
        break;
      }
    }
  }
  
  document.getElementById('livesCount').innerText = player.letterGrade();
}