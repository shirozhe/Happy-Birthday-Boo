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
  camera.position.set(0, 5, 10);

  // Renderer setup
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('game-container').appendChild(renderer.domElement);

  // Add light
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  // Add player (a simple cube character)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00aaff });
  player = new THREE.Mesh(geometry, material);
  player.position.y = 0.5;
  scene.add(player);

  // Create floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({ color: 0x8B4513 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Create walls
  const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const walls = [
    new THREE.Mesh(new THREE.BoxGeometry(20, 5, 0.2), wallMaterial), // Back wall
    new THREE.Mesh(new THREE.BoxGeometry(20, 5, 0.2), wallMaterial), // Front wall
    new THREE.Mesh(new THREE.BoxGeometry(0.2, 5, 20), wallMaterial), // Left wall
    new THREE.Mesh(new THREE.BoxGeometry(0.2, 5, 20), wallMaterial)  // Right wall
  ];
  walls[0].position.z = -10;
  walls[1].position.z = 10;
  walls[2].position.x = -10;
  walls[3].position.x = 10;
  walls.forEach(wall => scene.add(wall));

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

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

// Game loop
function animate() {
  requestAnimationFrame(animate);

  // Camera follows the player smoothly
  camera.position.lerp(
    new THREE.Vector3(player.position.x, player.position.y + 5, player.position.z + 10),
    0.05
  );
  camera.lookAt(player.position);

  renderer.render(scene, camera);
}

// Handle player movement
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

// Check for collisions
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

// Show letter message
function showLetter(message) {
  const letterScreen = document.getElementById('letter-screen');
  const letterText = document.getElementById('letter-text');

  letterText.innerText = message;
  letterScreen.classList.add('show');

  setTimeout(() => {
    letterScreen.classList.remove('show');
    letterScreen.classList.add('hide');
    setTimeout(() => letterScreen.classList.remove('hide'), 1000);
  }, 3000);
}

// Initialize the game
init();
