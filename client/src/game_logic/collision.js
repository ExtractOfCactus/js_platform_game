var Collision = function(wallArray){
  this.ground = collision(wallArray);
  this.underSides = underSide(wallArray);
  this.rightWalls = rightWallCollision(wallArray);
  this.leftWalls = leftWallCollision(wallArray);
}

var groundCollisionArray = [];
var underSides = [];
var rightWalls = [];
var leftWalls = [];

Collision.prototype.emptyArrays = function() {
  groundCollisionArray = [];
  underSides = [];
  rightWalls = [];
  leftWalls = [];
};


var collision = function(wallArray) {
  wallArray.forEach(function(wall) {
    var y = wall[1];
    var counter = 0;
    while(counter < 41){
      var tempCoords = [];
      tempCoords.push(wall[0] + counter)
      tempCoords.push(y);
      groundCollisionArray.push(tempCoords);
      counter += 2;
    }
  });
  return groundCollisionArray;
}

var underSide = function (wallArray){
  wallArray.forEach(function(wall){
    var y = wall[1];
    var counter = 0;
    while(counter < 41){
      var tempCoords = [];
      tempCoords.push(wall[0] + counter)
      tempCoords.push(y + 40);
      underSides.push(tempCoords)
      counter += 2;
    }
  });
  return underSides;
}

var rightWallCollision = function(wallArray){
  wallArray.forEach(function(wall){
    var x = wall[0];
    var counter = 0;
    while(counter < 41){
      var tempCoords = [];
      tempCoords.push(x);
      tempCoords.push(wall[1] + counter);
      rightWalls.push(tempCoords);
      counter += 2;
    }
  })
  return rightWalls;
}


var leftWallCollision = function(wallArray){
  wallArray.forEach(function(wall){
    var x = wall[0];
    var counter = 0;
    while(counter < 41){
      var tempholding =[];
      tempholding.push(x + 40);
      tempholding.push(wall[1] + counter);
      leftWalls.push(tempholding);
      counter += 2;
    }
  })

 return leftWalls;

}


module.exports = Collision;