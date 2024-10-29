const player = document.getElementById('player');
const hearts = document.querySelectorAll('.heart');
const messageBox = document.getElementById('message-box');

let playerPosition = { top: 50, left: 50 };
let collectedHearts = 0;

const messages = [
  "I love how you always support me. ❤️",
  "Your smile makes my day brighter. 😊",
  "You're my favorite person in the world. 🌍",
  "Thank you for being you. 💕"
];

// Move the player with arrow keys or WASD
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      playerPosition.top -= 10;
      break;
    case 'ArrowDown':
    case 's':
      playerPosition.top += 10;
      break;
    case 'ArrowLeft':
    case 'a':
      playerPosition.left -= 10;
      break;
    case 'ArrowRight':
    case 'd':
      playerPosition.left += 10;
      break;
  }

  // Keep the player within the game boundaries
  playerPosition.top = Math.max(0, Math.min(window.innerHeight - 40, playerPosition.top));
  playerPosition.left = Math.max(0, Math.min(window.innerWidth - 40, playerPosition.left));

  player.style.top = `${playerPosition.top}px`;
  player.style.left = `${playerPosition.left}px`;

  checkCollision();
});

function checkCollision() {
  hearts.forEach((heart, index) => {
    const heartRect = heart.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < heartRect.right &&
      playerRect.right > heartRect.left &&
      playerRect.top < heartRect.bottom &&
      playerRect.bottom > heartRect.top
    ) {
      heart.style.display = 'none'; // Hide the heart
      showMessage(messages[index]);
      collectedHearts++;

      if (collectedHearts === hearts.length) {
        showMessage("You've collected all hearts! I love you! ❤️");
      }
    }
  });
}

function showMessage(message) {
  messageBox.innerText = message;
  messageBox.style.display = 'block';

  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 3000);
}
