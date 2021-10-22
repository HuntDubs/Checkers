
let canvas;
let context;
let player1 = new Player();
let player2 = new Player();

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

  drawGameBoard();
  drawGamePieces(player1);
  drawGamePieces(player2);

  // //Drawing the table
  // for(let x=1; x<8;x=x+2){
  //   for(let y=0;y<8;y++){
  //     if(y%2 == 0){
  //       context.fillRect(87.5*x,y*87.5,87.5,87.5);
  //     } else {
  //       context.fillRect(87.5*(x-1), 87.5*y, 87.5, 87.5);
  //     }
  //   }
  // }

  // //drawing the checker pieces
  //   let teamOneMember=0;
  //   let teamTwoMember=0;
  //   let xVal;
  //   let yVal;
  //   for(let y=0; y<8; y++){
  //     for(let x=1;x<8;x=x+2){
  //       if(y<3){
  //         if(y%2==0){
  //           xVal =43.75+(87.5*x)
  //           yVal = 43.75+(87.5*y)
  //           drawCircle([xVal, yVal],"red");
  //         } else {
  //           xVal = 43.75+(87.5*(x-1))
  //           yVal = 43.75+(87.5*y)
  //           drawCircle([xVal, yVal], "red");
  //         }
  //         teamTwo[teamTwoMember] = [xVal,yVal];
  //         teamTwoMember++;
  //       } else if (y>4){
  //         if(y%2==0){
  //           xVal = 43.75+(87.5*x)
  //           yVal = 43.75+(87.5*y)
  //           drawCircle([xVal,yVal],"grey");
  //         } else {
  //           xVal = 43.75+(87.5*(x-1))
  //           yVal = 43.75+(87.5*y)
  //           drawCircle([xVal, yVal] , "grey");
  //         }
  //         teamOne[teamOneMember] = [xVal,yVal];
  //         teamOneMember++;
  //       }
  //     }
  //   }
}

function drawGameBoard(){
  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = "black";
  context.rect(100,50,600,600);
  context.stroke();
}

function drawGamePieces(player){
  if (player == player1) {

  } else if (player == player2){

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


document.addEventListener("DOMContentLoaded", () => {
  canvas = document.querySelector("#myCanvas");
  context = canvas.getContext("2d");
  draw();
})
