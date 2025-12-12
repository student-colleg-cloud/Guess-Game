let computerGuess;
let gameActive = false;
let maxNumber = 0;
let attempts = 0;

function displayOutput(message) {
  const output = document.getElementById("output");
  output.innerHTML += message + "<br>";
  output.scrollTop = output.scrollHeight;
}

function updateGameInfo() {
  const gameInfo = document.getElementById("gameInfo");
  gameInfo.innerHTML = `<strong>Range:</strong> 1 - ${maxNumber} | <strong>Attempts:</strong> ${attempts}`;
}

function startGame() {
  const max = document.getElementById("max").value;

  if (!max || max <= 0) {
    alert("Please enter a valid max number greater than 0!");
    return;
  }

  maxNumber = parseInt(max);
  computerGuess = Math.floor(Math.random() * maxNumber) + 1;
  gameActive = true;
  attempts = 0;

  document.getElementById("maxInput").style.display = "none";
  document.getElementById("guessInput").style.display = "block";
  document.getElementById("gameInfo").style.display = "block";
  document.getElementById("output").innerHTML = "";

  displayOutput(`🎯 Game started! Guess a number between 1 and ${maxNumber}`);
  displayOutput(`💡 Hint: I'm thinking of a number...`);
  updateGameInfo();
  document.getElementById("guess").focus();
}

function makeGuess() {
  if (!gameActive) return;

  const userGuess = document.getElementById("guess").value.trim();
  document.getElementById("guess").value = "";

  if (userGuess === "quit") {
    displayOutput(
      `❌ Quitting the game. The number was ${computerGuess}. Goodbye!`
    );
    endGame();
    return;
  }

  let guessNumber = Number(userGuess);

  if (isNaN(guessNumber)) {
    displayOutput("⚠️ Please enter a valid number!");
    document.getElementById("guess").focus();
    return;
  }

  if (guessNumber < 1 || guessNumber > maxNumber) {
    displayOutput(`⚠️ Please enter a number between 1 and ${maxNumber}!`);
    document.getElementById("guess").focus();
    return;
  }

  attempts++;

  if (guessNumber === computerGuess) {
    displayOutput(
      `🎉 Correct! You guessed it in ${attempts} attempt${
        attempts > 1 ? "s" : ""
      }!`
    );
    displayOutput(`✨ The number was ${computerGuess}. Amazing!`);
    endGame();
  } else if (guessNumber < computerGuess) {
    displayOutput(`⬆️ Your guess (${guessNumber}) was too small, try again!`);
  } else if (guessNumber > computerGuess) {
    displayOutput(`⬇️ Your guess (${guessNumber}) was too large, try again!`);
  }

  updateGameInfo();
  document.getElementById("guess").focus();
}

function endGame() {
  gameActive = false;
  document.getElementById("guessInput").style.display = "none";
  document.getElementById("gameInfo").style.display = "none";
  document.getElementById("maxInput").style.display = "block";
  document.getElementById("max").value = "";
  setTimeout(() => {
    document.getElementById("max").focus();
  }, 100);
}

// Allow Enter key to submit guess
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && gameActive) {
    makeGuess();
  }
});
