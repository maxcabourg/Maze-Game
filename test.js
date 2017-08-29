var cols = 20;
var rows = 20;
var w = 400;
var h = 400;
var cell_width = Math.floor(w / cols);
var cell_height = Math.floor(h / rows);
var grid;
var stack = [];
var current;

function setup(){
  createCanvas(w+1, h+1);
  initGrid();
  current = grid[0][0];
  current.visited = true;
}

function draw(){
  drawGrid();
  current.hightlight();
  current.setUnvisitedNeighbors();
  if(current.unvisitedNeighbors.length > 0){
    //Choose random neighbors then
    var randomIndex = Math.floor(Math.random() * (current.unvisitedNeighbors.length));
    var next = current.unvisitedNeighbors[randomIndex];
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if(stack.length > 0) {
    current = stack.pop();
  }
}

function removeWalls(a, b){
  var distX = a.x - b.x;
  if(distX === 1){ //a est a droite
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (distX === -1){//a est a gauche
    a.walls[1] = false;
    b.walls[3] = false;
  } else { //a et b sont sur la meme colonne
    var distY = a.y - b.y;
    if(distY === 1){ //a est en bas
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (distY === -1) { //a est en haut
      a.walls[2] = false;
      b.walls[0] = false;
    }
  }
}

function initGrid(){
  //init arrays
  grid = new Array(cols);
  for(var i = 0; i < cols; i++){
    grid[i] = new Array(grid);
  }
  
  //init cells
  for(var x = 0; x < cols; x++){
    for(var y = 0; y < rows; y++){
      grid[x][y] = new Cell(x, y);
    }
  }
}

function drawGrid(){
  for(var x = 0; x < cols; x++){
    for(var y = 0; y < rows; y++){
      grid[x][y].show();
    }
  }
}

function debug(text){
  console.log(text);
}