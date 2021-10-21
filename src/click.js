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