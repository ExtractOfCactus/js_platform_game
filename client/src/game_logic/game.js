var levelsPack = require('./levels');
var Level = require('./level_constructor');
var Player = require('./player');
var Collision = require('./collision');
var score = 0;
var myCoinSound;
var myMusic;
var myTadaSound;
var levelCounter = 0;
var currentPlan = levelsPack[0];
var currentLevel;
var player;

var leftKeyPressed = false;
var rightKeyPressed = false;
var isJumping = false;


//music handler
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}



var setHalfJump = false;

var selectLevel = function() {
  levelCounter++;
  player.delete();
  if (levelCounter === levelsPack.length - 1){
    gameOver();
    return;
  }
  else {
    var newLevel = levelsPack[levelCounter];
    currentPlan = newLevel;
    gameApp();
  }
}

var gameOver = function() {
  currentLevel.deleteMap();
  var endPlan = levelsPack[4];
  var endLevel = new Level(endPlan);
  endLevel.setUpMap();
  endLevel.drawMap();
  var restartButton = document.getElementById("restart-button");
  restartButton.style.display = "inline-block";
}

var drawScore = function() {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");
  context.clearRect(10, 30, 100, -30); 
  context.beginPath();
  context.font = "24px Arial";
  context.fillStyle = "#eee";
  context.fillText("Score: "+score, 10, 30);
  context.closePath();
}

var keyDownHandler = function(evt) {
  if (evt.keyCode === 39) {
    rightKeyPressed = true;
  }
  if (evt.keyCode === 37) {
    leftKeyPressed = true;
  }
  if (evt.keyCode === 32){
    isJumping = true;
  }
} 

var keyUpHandler = function(evt) {
  if (evt.keyCode === 39) {
    rightKeyPressed = false;
  }
  if (evt.keyCode === 37) {
    leftKeyPressed = false;
  }
  if (evt.keyCode === 32) {
    isJumping = false;
  }
}


var gameApp = function() {
  currentLevel = new Level(currentPlan); 
  currentLevel.deleteMap(); 
  currentLevel.setUpMap();
  player = new Player(currentLevel.playerStart);
  player.draw([currentLevel.playerStart[0], currentLevel.playerStart[1]]);
  var collisions = new Collision(currentLevel.walls);


  var coins = currentLevel.coins;


  // calling music;
  myMusic = new sound("gametheme.mp3");
  myMusic.play();

  drawScore();

  var interval = setInterval(function() {
    var oldCoords = player.position;
    var newCoords = oldCoords;
    currentLevel.drawMap();

    collisionDetection();
    halfJump();
    player.fallDeath([currentLevel.playerStart[0], currentLevel.playerStart[1]]);
    
      // >>>>>>> check if this block of code is needed by pedro <<<<<<<<<

      var playerBottom = [player.position[0] + 10, player.position[1] + 40];
      var playerRightSide = [player.position[0] + 30, player.position[1]];
      var playerLeftSide = [player.position[0] - 30, player.position[1]];


      if (player.falling === true) {
        newCoords = [oldCoords[0], oldCoords[1] + 10];
        
        player.draw(newCoords);
        oldCoords = newCoords;
      }

      if(player.falling == true && rightKeyPressed === true || leftKeyPressed === true) {
       collisionDetection();
     }


     document.addEventListener('keydown', keyDownHandler, false)
     document.addEventListener('keyup', keyUpHandler, false)

    // collision with coins
    // need to delete coins from array to work
    for(var coin of coins){
      if(playerLeftSide[0] === coin[0] && playerLeftSide[1] === coin[1]){
        myCoinSound = new sound("coinsound.mp3");
        myCoinSound.play();
        currentLevel.deleteCoin(coin);
        score += 10;
        var index = coins.indexOf(coin);
        coins.splice(index, 1);
        drawScore();
        console.log(score)
        break;
      }
      else if(playerRightSide[0] === coin[0] && playerRightSide[1] === coin[1]){
        myCoinSound = new sound("coinsound.mp3");
        myCoinSound.play();
        currentLevel.deleteCoin(coin);
        score += 10;
        var index = coins.indexOf(coin);
        coins.splice(index, 1);
        drawScore();
        console.log(score)
        break;

      }
      else if(playerBottom[0] === coin[0] && playerBottom[1] === coin[1]){
        myCoinSound = new sound("coinsound.mp3");
        myCoinSound.play();
        currentLevel.deleteCoin(coin);
        score += 10;
        var index = coins.indexOf(coin);
        coins.splice(index, 1);
        drawScore();
        console.log(score)
        break;

      }     
    }


    if (playerLeftSide[0] === currentLevel.key[0] && playerLeftSide[1] === currentLevel.key[1]) {
      currentLevel.removeKey(currentLevel.key);
      player.hasKey = true;
      console.log(player.hasKey);
    }
    else if (playerRightSide[0] === currentLevel.key[0] && playerRightSide[1] === currentLevel.key[1]) {
      currentLevel.removeKey(currentLevel.key);
      player.hasKey = true;
    }

    if (playerRightSide[0] === currentLevel.doorCenter[0] && playerRightSide[1] === currentLevel.doorCenter[1]) {
      if (player.hasKey) {
        myMusic.stop();
        myTadaSound = new sound("tada.mp3");
        myTadaSound.play();
        clearInterval(interval);
        collisions.emptyArrays();
        selectLevel()
      }
      else if (playerLeftSide[0] === currentLevel.doorCenter[0] && playerLeftSide[1] === currentLevel.doorCenter[1]) {
        if (player.hasKey) {
          myMusic.stop();
          myTadaSound = new sound("tada.mp3");
          myTadaSound.play();
          clearInterval(interval);
          player.delete();
          collisions.clearArrays();
          selectLevel();
          
        }
      }
    }

    
    if(isJumping === true && player.falling === false && player.canJump == true){  
      if(setHalfJump === false){
        newCoords = [oldCoords[0], oldCoords[1] - 100];
        player.draw(newCoords);
        oldCoords = newCoords;
        isjumping = false;  
      }
      else if(setHalfJump === true){
        {
          newCoords = [oldCoords[0], oldCoords[1] - 60];
          player.draw(newCoords);
          oldCoords = newCoords;
          isjumping = false; 
        }
      }  

    }
    playerCanWalk();

    if (player.lives === 0) {
      clearInterval(interval);
      gameOver();
    }
  }, 50)



  var playerCanWalk = function(){
    var oldCoords = player.position;
    var newCoords = oldCoords;

    if (rightKeyPressed && player.walkRight === true) {
      if(oldCoords[0] + 10 >= 1280){
        newCoords = [oldCoords[0], oldCoords[1]];
        player.draw(newCoords);
        oldCoords = newCoords;
      }else{
        newCoords = [oldCoords[0] + 10, oldCoords[1]];
        player.drawRight(newCoords);
        oldCoords = newCoords;
      }

    }
    if (leftKeyPressed && player.walkLeft === true) {
      if(oldCoords[0] <= 0){
        newCoords = [oldCoords[0], oldCoords[1]];
        player.draw(newCoords);
        oldCoords = newCoords;
      }else{
        newCoords = [oldCoords[0] - 10, oldCoords[1]];
        player.drawLeft(newCoords);
        oldCoords = newCoords;
      }

    }
  }



  var collisionDetection = function(){



    for(var number of numbers){
      for(var ground of collisions.ground){ 
        if(player.position[0] + number === ground[0] && player.position[1] + 40 === ground[1]){
          player.falling = false;
          break;
        }
        else{
          player.falling = true;
        }
      }
    }

    for(var number of numbers){
      for(var underside of collisions.underSides){
        if(player.position[0] + number === underside[0] && player.position[1] === underside[1]){
          console.log("detection")
          player.canJump = false;
          break;
        }
        else{
          player.canJump = true;
        }
      }
    }


    for(var number of heightnumbers){
      for(var wall of collisions.rightWalls){ 
        if(player.position[0] + 40 === wall[0] && player.position[1] + number === wall[1]){
          player.walkRight = false;
          console.log("touch wall")
          break;
        }
        else{
          player.walkRight = true;
        }
      }
    }
    for(number of heightnumbers){
      for(var wall of collisions.leftWalls){
        if(player.position[0] === wall[0] && player.position[1] + number === wall[1]){
          player.walkLeft = false;
          break;
        }
        else
        {
          player.walkLeft = true;
        }
      }
    }
  }

  var halfJump = function(){
    for(var number of numbers){
      for(var underside of collisions.underSides){
        if(player.position[0] + number === underside[0] && player.position[1] - 40 === underside[1]){

          setHalfJump = true;
          break;
        }
        else
        {
          setHalfJump = false;
        }
      }
    }

  }
}

var numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var heightnumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];


window.addEventListener('load', gameApp);