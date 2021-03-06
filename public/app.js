var gamePlaying;
var lastDice;
start();

document.querySelector(".btn-roll").addEventListener("click", function(){
  if(gamePlaying) {
    //1. Random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png"
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png"

    //3. Update round score IF the rolled number was NOT 1
    if (dice2 !== 1 && dice2 !== 1) {
      //add score
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore; //display
    } else {
      //next players turn
      nextPlayer();
    }
    /*
    if (dice === 6 && lastDice === 6) {
      //Player looses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1 ) {
      //add score
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore; //display
    } else {
      //next players turn
      nextPlayer();
    }

    lastDice = dice;
    */
  }

});

document.querySelector(".btn-hold").addEventListener("click", function(){
  if (gamePlaying) {
    //Add current score to global scores
    scores[activePlayer] += roundScore;

    //Updated User Interface (UI)
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    input = document.querySelector(".final-score").value; //give content user put into field
    var winningScore;

    //Undefined, 0, null or "" are COERCED to false
    //Anything else is true
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //Check if player won game
    if (scores[activePlayer] >= winningScore){
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
      hideDice();
    } else {
      //Next Players Turn
      nextPlayer();
    }
  }
})

function nextPlayer() {
  //Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector(".player-1-panel").classList.add("active");

  hideDice();
}

document.querySelector(".btn-new").addEventListener("click", start);

function start() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  hideDice();

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function hideDice() {
  document.getElementById("dice-1").style.display = "none"
  document.getElementById("dice-2").style.display = "none"
}
