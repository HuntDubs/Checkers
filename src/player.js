class Player {
    constructor() {
        this.gamePieces = [];
        this.isTurn;
    }

    fillGamePieces(player){
        if (player == "player1"){
            for (let x =0; x<12; x++){

            }
        } else if (player == "player2") {
            for (let x=0; x<12;x++){

            }
        } else {
            debug.log("invalid input in fillGamePieces");
        }
    }

}