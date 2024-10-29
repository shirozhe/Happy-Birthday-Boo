/* Body Styling */
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #ffecb3; /* Light yellow background */
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

/* Game Container Styling */
.game-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('https://i.imgur.com/3YLdJzk.jpg'); /* Sunflower field */
  background-size: cover;
  background-position: center;
  text-align: center;
}

/* Title & Subtitle */
.title {
  color: #ff8c00;
  margin-top: 20px;
  text-shadow: 2px 2px #ffffff;
}

.subtitle {
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
}

/* Player Styling */
#player {
  width: 50px;
  height: 50px;
  background-color: #ff6699;
  border-radius: 50%;
  position: absolute;
  top: 50px;
  left: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: top 0.2s, left 0.2s;
}

/* Heart Styling */
.heart {
  width: 30px;
  height: 30px;
  background: url('https://cdn-icons-png.flaticon.com/512/833/833472.png') no-repeat center;
  background-size: contain;
  position: absolute;
  animation: float 2s ease-in-out infinite;
}

/* Sunflower Styling */
.sunflower {
  width: 70px;
  height: 70px;
  position: absolute;
  animation: rotate 5s linear infinite;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Message Box Styling */
#message-box {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  display: none;
  font-size: 18px;
  width: 60%;
}
