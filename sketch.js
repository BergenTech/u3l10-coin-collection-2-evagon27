// Game variables 
let playerX, playerY;
let coinX, coinY;
let obstacleX, obstacleY;
let score = 0;
let gameOver = false;
let obstacleSpeed = 5;
let hits = 0;

function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width/2;
  playerY = height - 20;
  
  // Initialize coin position
  newCoin();
  
  // Initialize obstacle position
  obstacleX = random(20, height-20);
  obstacleY = 0;
}

function draw() {
  background(220);
  
  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();
    
    // Handle movement
    movePlayer();
    moveObstacle();
    
    // Check for collisions
    checkCoinCollection();
    checkCollisions();
    
    // Display game stats
    displayStats();
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 20);
}

function drawCoin() {
  fill(255, 255, 0);  // Yellow coin
  circle(coinX, coinY, 10);
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

// Basic left/right movement provided
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += 5;
  }
  
  //Up/down movement
  if(keyIsDown(UP_ARROW)){
    playerY -= 5
  }
  if(keyIsDown(DOWN_ARROW)){
    playerY += 5
  }
  
  
  // TODO: Add boundary checking
  // HINT: Keep player within canvas bounds
  // Check against 0, width, and height
  if(playerX < 0 || playerX > width || playerY > height || playerY < 0){
    playerX = width/2;
    playerY = height - 20;
  }
}

function moveObstacle() {
  //Move obstacle from top to bottom
  // HINT: Increase obstacleX by obstacleSpeed
  obstacleY += obstacleSpeed

  
  // TODO: Reset obstacle when it goes off screen
  // HINT: Check if obstacleX > width
  // Reset to left side and new random Y position
  if(obstacleY > width){
    obstacleX = random(20, height - 20)
    obstacleY = 0
    obstacleSpeed += 0.5
  }
}

function checkCoinCollection() {
  //Check if player touches coin
  if(dist(playerX, playerY, coinX, coinY) < 15){
    score++
    newCoin()
    obstacleSpeed += 0.5
  }
}

function checkCollisions() {
  //Check if player hits obstacle
  // HINT: Similar to coin collection
  if(dist(playerX, playerY, obstacleX, obstacleY) < 20){
    hits++
    if(hits >= 3){
      gameOver = true
      displayGameOver()
    }
    newCoin()
    drawObstacle()
    playerX = width/2;
    playerY = height - 20;
  }
}

function displayStats() {
  fill(0);
  textSize(16);
  text("Score: " + score, 10, 20);
  //Display for hits and speed
  text(`Hits: ${hits}`, 10, 40)
  text(`Speed: ${obstacleSpeed}`, 10, 60)
}

function displayGameOver() {
  //Show game over screen
  // HINT: Use textAlign(CENTER, CENTER
  textAlign(CENTER, CENTER)
  textSize(50)
  text("Game Over", width/2, height/2 - 40)
  textSize(20)
  text(`Final Score: ${score}`, width/2, height/2 + 40)
  text("Press R to Restart", width/2, height/2 + 80)
}

function newCoin() {
  // Generate random position for coin
  coinX = random(20, width-20);
  coinY = random(20, height-20);
}

function resetGame() {
  //Reset all game variables
  score = 0
  hits = 0
  speed = 0
  gameOver = false
  initializeGame()
  // HINT: Reset score, hits, speed
  // Set gameOver to false
  // Call initializeGame()
}

function keyPressed() {
  // TODO: Check for 'R' key to restart game
  if((key === "r" & gameOver == true) || (key === "R" & gameOver == true)){
    resetGame()
  }
}

// Helper function you might need
function distance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}