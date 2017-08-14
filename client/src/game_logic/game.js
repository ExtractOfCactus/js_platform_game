var levelTest = require('./levels');
var Level = require('./level_constructor');
var Player = require('./player');
var Collision = require('./collision');
var score = 0;

var leftKeyPressed = false;
var rightKeyPressed = false;

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
  if (evt.keyCode === 77) {
    rightKeyPressed = true;
  }
  else if (evt.keyCode === 78) {
    leftKeyPressed = true;
  }
} 

var keyUpHandler = function(evt) {
  if (evt.keyCode === 77) {
    rightKeyPressed = false;
  }
  else if (evt.keyCode === 78) {
    leftKeyPressed = false;
  }
}


var gameApp = function() {
  var levelOne = new Level(levelTest);
  levelOne.setUpMap();
  var player = new Player(levelOne.playerStart);
  player.draw([levelOne.playerStart[0], levelOne.playerStart[1]]);

  var collisions = new Collision(levelOne.walls);
  var coins = levelOne.coins;
  console.log(coins)
  
  drawScore();

  // var collisionsArray = collision(levelOne.walls);

  setInterval(function() {
    var oldCoords = player.position;
    var newCoords = oldCoords;

    var playerBottom = [player.position[0] + 10, player.position[1] + 40];
    var playerRightSide = [player.position[0] + 40, player.position[1]];
    var playerLeftSide = [player.position[0], player.position[1]];

    for(var ground of collisions.ground){
      if(playerBottom[0] === ground[0] && playerBottom[1] === ground[1]){
        player.falling = false;
        break;
      }
      else
      {
        player.falling = true;
      }
    }
    // console.log(playerRightSide);
    for(var wall of collisions.walls){
      if(playerRightSide[0] === wall[0] && playerRightSide[1] === wall[1]){
        player.walkRight = false;
        console.log("contact with wall Right")
        break;
      }
      else
      {
        player.walkRight = true;
      }
    }

    for(var wall of collisions.walls){
      if(playerLeftSide[0] === wall[0] && playerLeftSide[1] === wall[1]){
        player.walkLeft = false;
        console.log("contact with wall left")
        break;
      }
      else
      {
        player.walkLeft = true;
      }
    }

    if (player.falling === true) {
      newCoords = [oldCoords[0], oldCoords[1] + 10];
      player.draw(newCoords);
      oldCoords = newCoords;
    }
    // collision with coins
    // need to delete coins from array to work
    for(var coin of coins){
      if(playerLeftSide[0] === coin[0] && playerLeftSide[1] === coin[1]){
        levelOne.deleteCoin(coin);
        score += 10;
        var index = coins.indexOf(coin);
        coins.splice(index, 1);
        drawScore();
        console.log(score)
        break;
      }
      else if(playerRightSide[0] === coin[0] && playerRightSide[1] === coin[1]){
        levelOne.deleteCoin(coin);
        score += 10;
        var index = coins.indexOf(coin);
        coins.splice(index, 1);
        drawScore();
        console.log(score)
        break;
      
    }    
    }

    document.addEventListener('keydown', keyDownHandler, false)
    document.addEventListener('keyup', keyUpHandler, false)

    if (rightKeyPressed && player.walkRight === true) {
      newCoords = [oldCoords[0] + 10, oldCoords[1]];
      player.drawRight(newCoords);
      oldCoords = newCoords;

    }
    if (leftKeyPressed && player.walkLeft === true) {
      newCoords = [oldCoords[0] - 10, oldCoords[1]];
      player.drawLeft(newCoords);
      oldCoords = newCoords;
    }
  }, 50)




}

window.addEventListener('load', gameApp);