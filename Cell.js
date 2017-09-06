/**
 * "Classe" représentant une cellule du labyrinthe
 */
this.Cell = function(x, y){
  this.x = x;
  this.y = y;
  this.realX = x * cell_width;
  this.realY = y * cell_height;
  this.walls = [true, true, true, true]; //TOP-RIGHT-BOTTOM-LEFT
  this.visited = false;
  this.unvisitedNeighbors = [];
  
  /**
   * Affiche une cellule du labyrinthe
   */
  this.show = function(){
    stroke(255);
    if(this.walls[0]){
      line(this.realX, this.realY, this.realX + cell_width, this.realY);
    }
    if(this.walls[1]){
      line(this.realX + cell_width, this.realY, this.realX + cell_width, this.realY+cell_height);
    }
    if(this.walls[2]){
      line(this.realX, this.realY + cell_height, this.realX + cell_width, this.realY+cell_height);
    }
    if(this.walls[3]){
      line(this.realX, this.realY, this.realX, this.realY + cell_height);
    }
    if(this.visited){
      noStroke();
      fill(100, 100, 50, 100);
      rect(this.realX, this.realY, cell_width, cell_height);
    }
    
  }
  
  /**
   * Récupère les voisins non visités pour l'algorithme de génération
   */
  this.setUnvisitedNeighbors = function(){
    this.unvisitedNeighbors = [];
    if(this.x > 0){ //Check left neighbor
      if(!grid[this.x-1][this.y].visited){
        this.unvisitedNeighbors.push(grid[this.x-1][this.y]);
      }
    }
    if(this.x < cols - 1){ //Check right neighbor
      if(!grid[this.x+1][this.y].visited){
        this.unvisitedNeighbors.push(grid[this.x+1][this.y]);
      }
    }
    if(this.y < rows - 1){ //Check bottom neighbor
      if(!grid[this.x][this.y + 1].visited){
        this.unvisitedNeighbors.push(grid[this.x][this.y + 1]);
      }
    }
    if(this.y > 0){ //Check top neighbor
      if(!grid[this.x][this.y - 1].visited){
        this.unvisitedNeighbors.push(grid[this.x][this.y - 1]);
      }
    }
  }
  
  /**
   * Affiche la cellule courante du joueur
   */
  this.hightlight = function(){
    image(img, this.realX, this.realY, cell_width, cell_height);
  }

  /**
   * Affiche la case de sortie du labyrinthe
   */
  this.showLootCase = function(){
    noStroke();
    fill(255, 0, 0, 100);
    rect(this.realX, this.realY, cell_width, cell_height);
  }
}