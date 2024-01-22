require("colors");

function diceGame(playerName = "guest_player", secondPlayer = "bot") {
  let player1 = Math.floor(1 + Math.random() * 6);
  let player2 = Math.floor(1 + Math.random() * 6);

  if (player1 > player2) {
    console.log(
      `${player1}-${player2}: ${playerName} wins ${secondPlayer}.`.green
    );
  } else if (player2 > player1) {
    console.log(
      `${player1}-${player2}: ${playerName} loses ${secondPlayer}.`.red
    );
  } else {
    console.log(
      `${player1}-${player2}: Draw! I suggest playing again to determine the winner.`
        .yellow
    );
  }
}

module.exports = { diceGame };
