var Level = function(plan) {
  this.plan = plan;
  this.width = plan[0].length;
  this.height = plan.length;
  this.map = [];
  this.walls = [];
  this.grass = [];
  this.bricks = [];
  this.coins= [];
  this.playerStart = null;
}

var imgRock = document.createElement('img');
imgRock.src = "rock.png"
var imgGrass = document.createElement('img');
imgGrass.src = "grass.png"
var imgBricks = document.createElement('img');
imgBricks.src = "bricks.png"
var imgCoins = document.createElement('img');
imgCoins.src = "coins.png"

Level.prototype.setUpMap = function() {
  var yArray = [];
  var xArray = [];

  for (var y = 0; y < this.height; y++) {
    var yCoord = y * 40;
    yArray.push(yCoord);
  }
  for (var x = 0; x < this.width; x++) {
    var xCoord =  x * 40;
    xArray.push(xCoord);
  }
  for (var yElement of yArray) {
    for (var xElement of xArray) {
      var coord = [xElement, yElement]
      this.map.push(coord);
    }
  }
  this.objectFinder();
  return this.map
};

Level.prototype.deleteCoin = function(coords){
 var canvas = document.getElementById("game-canvas");
 var context = canvas.getContext("2d"); 
 context.clearRect(coords[0], coords[1], 40, 40);
 console.log("deleteCoin"+coords)
}

Level.prototype.drawMap = function() {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");

  this.walls.forEach(function(coords) {  
  context.drawImage(imgRock, coords[0], coords[1], 40, 40); 
  });

  this.grass.forEach(function(coords) {  
  context.drawImage(imgGrass, coords[0], coords[1], 40, 40); 
  });

  this.bricks.forEach(function(coords) {  
  context.drawImage(imgBricks, coords[0], coords[1], 40, 40); 
  });

  this.coins.forEach(function(coords) {  
  context.drawImage(imgCoins, coords[0], coords[1], 40, 40); 
  });

};


Level.prototype.objectFinder = function() {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      if (this.plan[y][x] === 'x') {
        var i = (y * 32) + x;
        this.walls.push(this.map[i]);
      }
      else if (this.plan[y][x] === 'g') {
        var g = (y * 32) + x;
        this.grass.push(this.map[g]);
        this.walls.push(this.map[g]);
      }
      else if (this.plan[y][x] === 'b') {
        var b = (y * 32) + x;
        this.bricks.push(this.map[b]);
        this.walls.push(this.map[b]);
      }
      else if (this.plan[y][x] === 'c') {
        var c = (y * 32) + x;
        this.coins.push(this.map[c]);
        //this.walls.push(this.map[b]);
      }
      else if (this.plan[y][x] === 'P') {
        var p = (y * 32) + x;
        this.playerStart = this.map[p];
      }
    }
  }
  this.drawMap();
}

module.exports = Level;

