/* Basic Styling */
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #f3f4f6;
  font-family: 'Arial', sans-serif;
}

/* Game Container */
#game-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

/* Letter Pop-up Styling */
#letter-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 10;
}

.letter-content {
  background-color: #fff;
  color: #000;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 60%;
  max-width: 400px;
  font-size: 18px;
  line-height: 1.5;
}

.hidden {
  display: none;
}
