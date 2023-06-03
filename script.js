// Function to generate a random number within a specified range
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to check the user's guess against the random number
function checkGuess(randomNumber, guess) {
  if (guess === randomNumber) {
    return "equal";
  } else if (guess < randomNumber) {
    return "lower";
  } else {
    return "higher";
  }
}

// Example usage
const minRange = 1;
const maxRange = 100;
let randomNumber = generateRandomNumber(minRange, maxRange);
let attempts = 0;
let leaderboard = []; // Array to store leaderboard data
let username = ""; // Variable to store the username
let password = ""; // Variable to store the password

// Function to handle user input and check the guess
function handleGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);

  if (isNaN(guess)) {
    alert("Invalid input! Please enter a valid number.");
    return;
  }

  attempts++;

  const result = checkGuess(randomNumber, guess);

  if (result === "equal") {
    alert(`Congratulations, ${username}! You guessed the number ${randomNumber} in ${attempts} attempts.`);

    // Add the result to the leaderboard
    leaderboard.push({ username, attempts });

    // Sort the leaderboard based on the number of attempts (ascending order)
    leaderboard.sort((a, b) => a.attempts - b.attempts);

    // Display the leaderboard
    showLeaderboard();

    // Reset the game
    attempts = 0;
    randomNumber = generateRandomNumber(minRange, maxRange);
    document.getElementById("guessInput").value = "";
  } else {
    alert(`Your guess is ${result}. Try again!`);
  }
}

// Function to handle the username input
function handleUsernameInput() {
  username = document.getElementById("usernameInput").value;
}

// Function to handle the password input
function handlePasswordInput() {
  password = document.getElementById("passwordInput").value;
}

// Function to handle the login button click
function handleLogin() {
  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  alert(`Logged in as ${username}`);
  clearInputs();
}

// Function to handle the signup button click
function handleSignup() {
  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  alert(`Signed up with username ${username}`);
  clearInputs();
}

// Function to clear the input fields
function clearInputs() {
  document.getElementById("usernameInput").value = "";
  document.getElementById("passwordInput").value = "";
}

// Function to handle the Enter key press
function handleKeyPress(event) {
  if (event.key === "Enter") {
    if (document.activeElement === document.getElementById("guessInput")) {
      handleGuess();
    } else if (document.activeElement === document.getElementById("usernameInput")) {
      handleSignup();
    } else if (document.activeElement === document.getElementById("passwordInput")) {
      handleSignup();
    }
  }
}

// Function to display the leaderboard
function showLeaderboard() {
  const leaderboardContainer = document.getElementById("leaderboard");
  leaderboardContainer.innerHTML = ""; // Clear the existing content

  if (leaderboard.length > 0) {
    const table = document.createElement("table");
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
    table.appendChild(headerRow);

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
      table.appendChild(row);
    });

    leaderboardContainer.appendChild(table);
  } else {
    leaderboardContainer.textContent = "No entries yet.";
  }
}
