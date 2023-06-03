let secretNumber;
let attempts;
let leaderboard = [];

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function startNewGame() {
  secretNumber = generateRandomNumber();
  attempts = 0;
  leaderboard = [];
}

function handleGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = parseInt(guessInput.value);

  if (isNaN(guess)) {
    updateMessage("Please enter a valid number");
    return;
  }

  attempts++;

  if (guess === secretNumber) {
    updateMessage(`Congratulations! You guessed the number in ${attempts} attempts.`);
    addLeaderboardEntry();
    startNewGame();
  } else if (guess < secretNumber) {
    updateMessage("Too low! Guess higher.");
  } else {
    updateMessage("Too high! Guess lower.");
  }

  guessInput.value = "";
  guessInput.focus();
}

function addLeaderboardEntry() {
  const usernameInput = document.getElementById("usernameInput");
  const username = usernameInput.value.trim();

  if (username === "") {
    return;
  }

  const leaderboardEntry = {
    username: username,
    attempts: attempts
  };

  leaderboard.push(leaderboardEntry);
  leaderboard.sort((a, b) => a.attempts - b.attempts);

  if (leaderboard.length > 10) {
    leaderboard.pop();
  }

  updateLeaderboard();
}

function updateLeaderboard() {
  const leaderboardContainer = document.getElementById("leaderboard");
  leaderboardContainer.innerHTML = "";

  if (leaderboard.length > 0) {
    const leaderboardTable = document.createElement("table");
    leaderboardTable.classList.add("leaderboard-table");

    const headerRow = document.createElement("tr");
    const rankHeader = document.createElement("th");
    rankHeader.textContent = "Rank";
    const usernameHeader = document.createElement("th");
    usernameHeader.textContent = "Username";
    const attemptsHeader = document.createElement("th");
    attemptsHeader.textContent = "Attempts";
    headerRow.appendChild(rankHeader);
    headerRow.appendChild(usernameHeader);
    headerRow.appendChild(attemptsHeader);
    leaderboardTable.appendChild(headerRow);

    leaderboard.forEach((entry, index) => {
      const row = document.createElement("tr");
      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1;
      const usernameCell = document.createElement("td");
      usernameCell.textContent = entry.username;
      const attemptsCell = document.createElement("td");
      attemptsCell.textContent = entry.attempts;
      row.appendChild(rankCell);
      row.appendChild(usernameCell);
      row.appendChild(attemptsCell);
      leaderboardTable.appendChild(row);
    });

    leaderboardContainer.appendChild(leaderboardTable);
  }
}

function updateMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

function handleEnterKey(event) {
  if (event.keyCode === 13) {
    handleGuess();
  }
}

window.onload = function () {
  const guessInput = document.getElementById("guessInput");
  guessInput.addEventListener("keydown", handleEnterKey);
  startNewGame();
};
