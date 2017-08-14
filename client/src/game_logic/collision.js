
var Collision = function(wallArray){
  this.ground = collision(wallArray);
  this.walls = verticalCollision(wallArray);
}

var groundCollisionArray = [];
var wallCollisionArray = [];

var collision = function(wallArray) {
  wallArray.forEach(function(wall) {
    var y = wall[1];
    var counter = 0;

    while(counter < 41){
      var tempCoords = [];
      tempCoords.push(wall[0] + counter)
      tempCoords.push(y);
      groundCollisionArray.push(tempCoords);
      counter+=10;
    }
  });
  return groundCollisionArray;

}


var verticalCollision = function(wallArray){
  wallArray.forEach(function(wall){
    var x = wall[1];
    var counter = 0;

    while(counter < 41){
      var tempCoords = [];
      tempCoords.push(wall[0] + counter);
      tempCoords.push(x);
      wallCollisionArray.push(tempCoords);
      counter+=10;
    }
    counter = 0;

    while(counter < 41){
      tempCoords.push(wall[0] + counter);
      tempCoords.push(x + 40);
      counter+=10;
    }
  })
  return wallCollisionArray;
}

module.exports = Collision;