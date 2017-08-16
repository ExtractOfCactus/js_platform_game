var Level = function(plan) {
  this.plan = plan;
  this.width = plan[0].length;
  this.height = plan.length;
  this.cubeSize = 40;

  this.map = [];
  this.walls = [];
  this.grass = [];
  this.bricks = [];
  this.coins= [];
  this.wood= [];

  this.key = null;
  this.door = null;
  this.doorCenter = null;

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
var imgWood = document.createElement('img');
imgWood.src = "wood.png"
var imgKey = document.createElement('img');
imgKey.src = "key.png";
var imgDoor = document.createElement('img');
imgDoor.src = "door.png";


Level.prototype.setUpMap = function() {
  var yArray = [];
  var xArray = [];

  for (var y = 0; y < this.height; y++) {
    var yCoord = y * this.cubeSize;
    yArray.push(yCoord);
  }
  for (var x = 0; x < this.width; x++) {
    var xCoord =  x * this.cubeSize;
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

Level.prototype.deleteMap = function() {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, 1280, 720);
  this.emptyArrays();
};

Level.prototype.emptyArrays = function() {
  this.map = [];
  this.walls = [];
  this.grass = [];
  this.bricks = [];
  this.coins = [];
  this.wood = [];
};

Level.prototype.deleteCoin = function(coords){
 var canvas = document.getElementById("game-canvas");
 var context = canvas.getContext("2d"); 
 context.clearRect(coords[0], coords[1], 40, 40);
 console.log("deleteCoin"+coords)
}

Level.prototype.removeKey = function(coords) {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");
  context.clearRect(coords[0], coords[1], 40, 40);
  this.key = [2000, 1000];
  console.log("Key removed "+ coords)
};
  
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

  this.wood.forEach(function(coords) {  
  context.drawImage(imgWood, coords[0], coords[1], 40, 40); 
  });

  this.coins.forEach(function(coords) {  
  context.drawImage(imgCoins, coords[0], coords[1], 40, 40); 
  });
  context.drawImage(imgKey, this.key[0], this.key[1], 40, 40);
  context.drawImage(imgDoor, this.door[0], this.door[1], 80, 80);

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
      else if (this.plan[y][x] === 'w') {
        var w = (y * 32) + x;
        this.wood.push(this.map[w]);
        this.walls.push(this.map[w]);
      }
      else if (this.plan[y][x] === 'c') {
        var c = (y * 32) + x;
        this.coins.push(this.map[c]);
      }
      else if (this.plan[y][x] === 'P') {
        var p = (y * 32) + x;
        this.playerStart = this.map[p];
      }
      else if (this.plan[y][x] === "K") {
        var k = (y * 32) + x;
        this.key = this.map[k];
      }
      else if (this.plan[y][x] === "D") {
        var d = (y *32) + x;
        this.door = this.map[d];
        this.doorCenter = [this.door[0]+40, this.door[1]+40];
      }
    }
  }
  this.drawMap();
}

module.exports = Level;