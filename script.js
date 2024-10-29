let scene, camera, renderer;
let player, envelopes = [];
let letterMessages = [
  "You make my heart feel at home. 🏠",
  "Your kindness is a gift I cherish. 🎁",
  "With every step, I love you more. ❤️"
];
let collectedCount = 0;

// Initialize the scene
function init() {
  scene = new THREE.Scene();

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 10);

  // Renderer setup
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('game-container').appendChild(renderer.domElement);

  // Add light to the scene
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  // Add the player (a simple cube for now, replace with model if needed)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00aaff });
  player = new THREE.Mesh(geometry, material);
  player.position.y = 0.5;
  scene.add(player);

  // Add envelopes to collect
  for (let i = 0; i < 3; i++) {
    const envelope = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.3, 0.1),
      new THREE.MeshBasicMaterial({ color: 0xffcc00 })
    );
    envelope.position.set(Math.random() * 10 - 5, 0.5, Math.random() * -10);
    envelopes.push(envelope);
    scene.add(envelope);
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Start the game loop
  animate();
}

// Game loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Handle player movement with arrow keys or WASD
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      player.position.z -= 0.2;
      break;
    case 'ArrowDown':
    case 's':
      player.position.z += 0.2;
      break;
    case 'ArrowLeft':
    case 'a':
      player.position.x -= 0.2;
      break;
    case 'ArrowRight':
    case 'd':
      player.position.x += 0.2;
      break;
  }
  checkCollision();
});

// Check for collisions between player and envelopes
function checkCollision() {
  envelopes.forEach((envelope, index) => {
    if (player.position.distanceTo(envelope.position) < 0.5) {
      scene.remove(envelope);
      envelopes.splice(index, 1);
      showLetter(letterMessages[collectedCount++]);

      if (collectedCount === letterMessages.length) {
        showLetter("You’ve collected all my love! ❤️");
      }
    }
  });
}

// Show letter on screen
function showLetter(message) {
  document.getElementById('letter-text').innerText = message;
  document.getElementById('letter-screen').classList.remove('hidden');
}

// Close letter screen
function closeLetter() {
  document.getElementById('letter-screen').classList.add('hidden');
}

// Initialize the game
init();
