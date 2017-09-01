var cols = 10; //Nombre de colonnes
var rows = 10; //Nombre de lignes
var w = 600; //Largeur du canvas
var h = 640; //Hauteur du canvas avec le bouton reset y compris
var cell_width = Math.floor(w / cols); //Largeur d'une case
var cell_height = Math.floor((h - 40) / rows); //Hauteur d'une case
var grid; //Grille initiale du jeu
var stack = []; //Pile des cases explorées pour l'algorithme de generation des levels
var current; //Case courante du joueur
var img; //Skin de la case du joueur
var loot; //Case de fin du labyrinthe
var level; //Niveau du jeu

function setup(){
  frameRate(60);
  level = 1;
  createCanvas(w+1, h+1);
  resetGame();
  current = grid[0][0];
  var button = createButton("reset");
  button.mousePressed(resetGame);
  loot = grid[cols - 1][rows - 1];
  img = loadImage("assets/image.jpg");
}

function draw(){
  drawGrid();
  current.hightlight();
  loot.showLootCase();
  if(current == loot){
    level++;
    resetGame(level);
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

function resetGame(){
  initGrid(level);
  generateMaze();
}

function initGrid(level){
  //init arrays
  switch(level){
    case 1:
      cols = 10;
      rows = 10;
    break;
    case 2:
      cols = 15;
      rows = 15;
    break;
    case 3:
      cols = 20;
      rows = 20;
    break;
  }

  cell_width = Math.floor(w / cols); //Largeur d'une case
  cell_height = Math.floor((h - 40) / rows);

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

function generateMaze(){
  current = grid[0][0];
  loot = grid[cols - 1][rows - 1];
  current.visited = true;
  do {
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
  } while(stack.length > 0);
}

function debug(text){
  console.log(text);
}

function keyPressed(){
  switch(keyCode){
    case UP_ARROW:
      if(!current.walls[0]){
        current = grid[current.x][current.y - 1];
      }
    break;
    case DOWN_ARROW:
      if(!current.walls[2]){
        current = grid[current.x][current.y + 1];
      }
    break;
    case LEFT_ARROW:
      if(!current.walls[3]){
        current = grid[current.x - 1][current.y];
      }
    break;
    case RIGHT_ARROW:
    if(!current.walls[1]){
      current = grid[current.x + 1][current.y];
    }
    break;
  }
}