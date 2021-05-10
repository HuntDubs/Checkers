
let canvas;
let context;
let teamOne = new Array(12);
let teamTwo = new Array(12);
let currentPieceSelected;
let teamOneTurn = true;
let firstSelection = true;
//let checkForDoubleJump = false;
//let doubleJumpTarget = [0,0];

//A function for drawing one of the checker pieces
function drawCircle(pos,fillColor){
  let radius = 40
  let startingAngle = 0;
  let endingAngle = 2*Math.PI;
  let xPos = pos[0];
  let yPos = pos[1];
  context.beginPath();
  context.arc(xPos, yPos, radius, startingAngle, endingAngle, false);
  context.fillStyle = fillColor;
  context.lineWidth = 3;
  context.fill();
  context.fillStyle = "black";
}

function draw(){
  context.clearRect(0,0,canvas.width, canvas.height);

  //Drawing the table
  for(let x=1; x<8;x=x+2){
    for(let y=0;y<8;y++){
      if(y%2 == 0){
        context.fillRect(87.5*x,y*87.5,87.5,87.5);
      } else {
        context.fillRect(87.5*(x-1), 87.5*y, 87.5, 87.5);
      }
    }
  }

  //drawing the checker pieces
    let teamOneMember=0;
    let teamTwoMember=0;
    let xVal;
    let yVal;
    for(let y=0; y<8; y++){
      for(let x=1;x<8;x=x+2){
        if(y<3){
          if(y%2==0){
            xVal =43.75+(87.5*x)
            yVal = 43.75+(87.5*y)
            drawCircle([xVal, yVal],"red");
          } else {
            xVal = 43.75+(87.5*(x-1))
            yVal = 43.75+(87.5*y)
            drawCircle([xVal, yVal], "red");
          }
          teamTwo[teamTwoMember] = [xVal,yVal];
          teamTwoMember++;
        } else if (y>4){
          if(y%2==0){
            xVal = 43.75+(87.5*x)
            yVal = 43.75+(87.5*y)
            drawCircle([xVal,yVal],"grey");
          } else {
            xVal = 43.75+(87.5*(x-1))
            yVal = 43.75+(87.5*y)
            drawCircle([xVal, yVal] , "grey");
          }
          teamOne[teamOneMember] = [xVal,yVal];
          teamOneMember++;
        }
      }
    }
}

function reDraw(){
  context.clearRect(0,0,canvas.width, canvas.height);

  //drawing the table
  for(let x=1; x<8;x=x+2){
    for(let y=0;y<8;y++){
      if(y%2 == 0){
        context.fillRect(87.5*x,y*87.5,87.5,87.5);
      } else {
        context.fillRect(87.5*(x-1), 87.5*y, 87.5, 87.5);
      }
    }
  }


  for(let y=0; y<12; y++){
    drawCircle(teamOne[y], "grey");
    drawCircle(teamTwo[y], "red");
  }
}

//rounds a click on the checkers board to the center of that specific square
function roundMe(x) {
  let decider = x/87.5;
  decider = Math.trunc(decider);
  return(decider*87.5 + 43.75);
}

//returns true if the two arrays are equal
function equals(array1, array2){
  for(let x=0; x<array1.length; x++){
    if(array1[x] != array2[x]){
      return false;
    }
  }
  return true;
}

//returns true if a given posistion is taken by playing piece for Team One, and that posistion is on the playing field
function posBelongsTeamOne(pos){
  for(let k=0;k<teamOne.length;k++){
    if(equals([pos[0],pos[1]], teamOne[k]) && pos[0] < 700 && pos[1] < 700){
      return true;
    }
  }
  return false;
}

//returns true if a given posistion is taken by playing piece for Team Two, and that posistion is on the playing field
function posBelongsTeamTwo(pos){
  for(let k=0;k<teamTwo.length;k++){
    if(equals([pos[0],pos[1]], teamTwo[k]) && pos[0] < 700 && pos[1] < 700){
      return true;
    }
  }
  return false;
}

//returns the team who is in turn right now
function teamSelected(){
  for(let k=0;k<12;k++){
    if(equals(currentPieceSelected, teamOne[k])){
      return teamOne;
    } else if (equals(currentPieceSelected, teamTwo[k])){
      return teamTwo;
    }
  }
}

//returns the team whose turn is not up
function enemyTeam(){
  for(let k=0;k<12;k++){
    if(equals(currentPieceSelected, teamOne[k])){
      return teamTwo;
    } else if (equals(currentPieceSelected, teamTwo[k])){
      return teamOne;
    }
  }
}

function selection(x,y){
  //highlight options later
  firstSelection = false;
  currentPieceSelected = [x,y];
}

function secondSelection(x,y){
  let currentTeam = teamSelected();
  for(let k=0;k<12;k++){
    if(equals(currentPieceSelected, currentTeam[k])){
      currentTeam[k] = [x,y];
    }
  }
  reDraw();
  firstSelection = true;
  teamOneTurn = !teamOneTurn;
}

function validMove(x,y){
  let validTeamOneMoves = [[currentPieceSelected[0]-87.5, currentPieceSelected[1]-87.5], [currentPieceSelected[0]+87.5, currentPieceSelected[1]-87.5]];
  let validTeamTwoMoves = [[currentPieceSelected[0]+87.5, currentPieceSelected[1]+87.5], [currentPieceSelected[0]-87.5, currentPieceSelected[1]+87.5]];

  if (teamOneTurn == true){
    //Checking to see if the opponents piece is directly in a diagonal spot, possibly able to get jumped
    if(posBelongsTeamTwo(validTeamOneMoves[0])){
      validTeamOneMoves[0] = [currentPieceSelected[0]-175,currentPieceSelected[1]-175];
    } if (posBelongsTeamTwo(validTeamOneMoves[1])){
      validTeamOneMoves[1] = [currentPieceSelected[0]+175, currentPieceSelected[1]-175];
    }
    //Checking to see if the posistion chosen by the user is a valid move
    if(equals([x,y],validTeamOneMoves[0]) || equals([x,y],validTeamOneMoves[1]) ){
      return true;
    } else {
      return false;
    }
  } else {
    if(posBelongsTeamOne(validTeamTwoMoves[0])){
      validTeamTwoMoves[0] = [currentPieceSelected[0]+175,currentPieceSelected[1]+175];
    } if (posBelongsTeamOne(validTeamTwoMoves[1])){
      validTeamTwoMoves[1] = [currentPieceSelected[0]-175, currentPieceSelected[1]+175];
    }
    if( equals([x,y],validTeamTwoMoves[0]) || equals([x,y],validTeamTwoMoves[1]) ){
      return true;
    } else {
      return false;
    }
  }
}

function deletePieceFinder(x,y){
  let validTeamOneMoves = [[currentPieceSelected[0]-175,currentPieceSelected[1]-175], [currentPieceSelected[0]+175, currentPieceSelected[1]-175]];
  let validTeamTwoMoves = [[currentPieceSelected[0]+175, currentPieceSelected[1]+175], [currentPieceSelected[0]-175, currentPieceSelected[1]+175]];
  let enemyPos = [[currentPieceSelected[0]-87.5, currentPieceSelected[1]-87.5], [currentPieceSelected[0]+87.5, currentPieceSelected[1]-87.5],
                  [currentPieceSelected[0]+87.5, currentPieceSelected[1]+87.5], [currentPieceSelected[0]-87.5, currentPieceSelected[1]+87.5]];

  if (equals([x,y], validTeamOneMoves[0])){
    deletePiece(enemyPos[0]);
    //checkForDoubleJump = true;
  } else if (equals([x,y], validTeamOneMoves[1])){
    deletePiece(enemyPos[1]);
    //checkForDoubleJump = true;
  } else if (equals([x,y], validTeamTwoMoves[0])){
    deletePiece(enemyPos[2]);
    //checkForDoubleJump = true;
  } else if (equals([x,y], validTeamTwoMoves[1])){
    deletePiece(enemyPos[3]);
    //checkForDoubleJump = true;
  } else {
    return;
  }
}

function deletePiece(pos){
  let currentTeam;
  if (teamOneTurn == true){
    currentTeam = teamOne;
  } else {
    currentTeam = teamTwo;
  }

  for(let k=0; k<12;k++){
    if(equals(pos, currentTeam[k])){
      if(currentTeam == teamOne){ currentTeam[k] = [750,200]; }
      else { currentTeam[k] = [750, 400]; }
    }
  }
  reDraw();
}

// function doubleJump(x,y){
//   currentPieceSelected = [x,y];
//   //teamOneTurn is not true here because in the click function it has already switched teams
//   if (teamOneTurn == true){
//     if(validMove(x-175,y-175)){
//       return([x-175,y-175]);
//     } else if (validMove(x+175,y-175)){
//       return([x+175,y-175]);
//     }
//   } else {
//     if (validMove(x+175,y+175)){
//       return([x+175,y+175]);
//     } else if (validMove(x-175,y+175)){
//       return([x-175,y+175]);
//     }
//   }
//   return null;
// }

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.querySelector("#myCanvas");
  context = canvas.getContext("2d");
  draw();
})

document.addEventListener("click", e => {
  const [i,j] = [e.x,e.y].map(roundMe);
  console.log([i,j]);
  if (firstSelection == true){
    if((posBelongsTeamOne([i,j]) && teamOneTurn == true) || (posBelongsTeamTwo([i,j]) && teamOneTurn == false)){
      selection(i,j);
    }
  } else if (firstSelection == false){
      console.log(validMove(i,j));
      if(equals([i,j], currentPieceSelected)){
        firstSelection = true;
      } else if(posBelongsTeamOne([i,j]) == false && posBelongsTeamTwo([i,j]) == false && validMove(i,j) == true){
        secondSelection(i,j);
        deletePieceFinder(i,j);
        // if(checkForDoubleJump == true && doubleJump(i,j) != null){
        //   console.log("In djump");
        //   firstSelection = false;
        //   teamOneTurn = !teamOneTurn;
        //   doubleJumpTarget = doubleJump(i,j);
        //   checkForDoubleJump = false;
        // }
      }
    }
  // } else if (equals(doubleJumpTarget,[0,0]) == false ){
  //   if (equals(doubleJumpTarget, [i,j])){
  //     secondSelection(i,j);
  //     deletePieceFinder(i,j);
  //     doubleJumpTarget = [0,0];
  //   }
  // }
})
