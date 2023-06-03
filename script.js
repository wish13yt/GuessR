// GuessR Number Game

// Global variables
let secretNumber;
let attempts;
let leaderboard = [];
let loggedInUser = null;

// Generate a random number between 1 and 100
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Start a new game
function startNewGame() {
  secretNumber = generateRandomNumber();
  attempts = 0;
  leaderboard = [];
  loggedInUser = null;
  clearInput();
  updateMessage("Guess a number between 1 and 100");
  updateAttempts();
  showLeaderboard();
}

// Handle guess input
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

  updateAttempts();
  clearInput();
}

// Update the message displayed to the player
function updateMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

// Update the number of attempts displayed to the player
function updateAttempts() {
  const attemptsElement = document.getElementById("attempts");
  attemptsElement.textContent = `Attempts: ${attempts}`;
}

// Clear the guess input field
function clearInput() {
  const guessInput = document.getElementById("guessInput");
  guessInput.value = "";
}

// Add a new entry to the leaderboard
function addLeaderboardEntry() {
  if (loggedInUser) {
    const leaderboardEntry = {
      username: loggedInUser.username,
      attempts: attempts
    };

    leaderboard.push(leaderboardEntry);
    leaderboard.sort((a, b) => a.attempts - b.attempts);

    if (leaderboard.length > 10) {
      leaderboard.pop();
    }

    showLeaderboard();
  }
}

// Display the leaderboard
function showLeaderboard() {
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
  } else {
    leaderboardContainer.textContent = "No entries yet.";
  }
}

// Handle login
function handleLogin() {
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username && password) {
    loggedInUser = {
      username: username,
      password: password
    };

    updateMessage(`Welcome, ${username}!`);
    clearInput();
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    showLeaderboard();
  } else {
    updateMessage("Please enter both username and password.");
  }
}

// Handle signup
function handleSignup() {
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username && password) {
    loggedInUser = {
      username: username,
      password: password
    };

    updateMessage(`Welcome, ${username}!`);
    clearInput();
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    showLeaderboard();
  } else {
    updateMessage("Please enter both username and password.");
  }
}

// Reset the game and clear user login
function resetGame() {
  startNewGame();
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  usernameInput.value = "";
  passwordInput.value = "";
  usernameInput.disabled = false;
  passwordInput.disabled = false;
}

// Start a new game when the page loads
window.onload = function() {
  startNewGame();
};
