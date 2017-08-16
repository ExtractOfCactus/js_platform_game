var Player = function(position) {
  this.startingPosition = position;
  this.position = position;
  this.falling = true;
  this.walkRight = true;
  this.walkLeft = true;
  this.canJump = true;
  this.hasKey = false;
  this.lives = 3;
}

var imgRight = document.createElement('img');
imgRight.src = "playerRight.png"
var imgLeft = document.createElement('img');
imgLeft.src = "playerLeft.png"

Player.prototype.draw = function(coords) {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");
  console.log(this.position);
  context.clearRect(this.position[0], this.position[1], 34, 40);
  context.drawImage(imgRight, coords[0], coords[1], 34, 40);
  this.position = coords;
};

Player.prototype.delete = function() {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");
  context.clearRect(this.position[0], this.position[1], 34, 40);
};

Player.prototype.drawRight = function(coords) {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");

  context.clearRect(this.position[0], this.position[1], 34, 40);
  context.drawImage(imgRight, coords[0], coords[1], 34, 40);
  this.position = coords;
};

Player.prototype.drawLeft = function(coords) {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");

  context.clearRect(this.position[0], this.position[1], 34, 40);
  context.drawImage(imgLeft, coords[0], coords[1], 34, 40);
  this.position = coords;
};

Player.prototype.fallDeath = function(coords) {
  if (this.position[1] > 720) {
    this.falling = false;
    this.lives--;
    this.draw(coords);
  }
};

module.exports = Player;