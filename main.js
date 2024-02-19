document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const platforms = document.querySelectorAll('.platform');
  
    let isJumping = false;
    let jumpCount = 0;
    let isFalling = false;
  
    function jump() {
      if (!isJumping) {
        isJumping = true;
        jumpCount = 0;
        const jumpInterval = setInterval(function() {
          const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
          if (jumpCount >= 20) {
            clearInterval(jumpInterval);
            isJumping = false;
            isFalling = true;
          } else {
            player.style.bottom = playerBottom + 10 + 'px';
            jumpCount++;
          }
        }, 20);
      }
    }
  
    function fall() {
      const fallInterval = setInterval(function() {
        const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
        if (playerBottom > 0 && !isJumping) {
          player.style.bottom = playerBottom - 5 + 'px';
        } else {
          clearInterval(fallInterval);
          isFalling = false;
        }
      }, 20);
    }
  
    function checkCollision() {
      const playerRect = player.getBoundingClientRect();
      platforms.forEach(platform => {
        const platformRect = platform.getBoundingClientRect();
        if (
          playerRect.bottom >= platformRect.top &&
          playerRect.top <= platformRect.bottom &&
          playerRect.right >= platformRect.left &&
          playerRect.left <= platformRect.right
        ) {
          isJumping = false;
          player.style.bottom = platformRect.bottom + 'px';
        }
      });
    }
  
    function gameLoop() {
      if (!isJumping && !isFalling) {
        fall();
      }
      checkCollision();
      requestAnimationFrame(gameLoop);
    }
  
    document.addEventListener('keydown', function(event) {
      if (event.code === 'Space') {
        jump();
      }
    });
  
    gameLoop();
  });
  