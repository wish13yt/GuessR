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
    alert(`Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`);

    // Add the result to the leaderboard
    leaderboard.push({ attempts });

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

// Function to display the leaderboard
function showLeaderboard() {
  const leaderboardTable = document.getElementById("leaderboard");
  leaderboardTable.innerHTML = "<tr><th>Rank</th><th>Attempts</th></tr>";

  if (leaderboard.length > 0) {
    leaderboard.forEach((entry, index) => {
      const row = leaderboardTable.insertRow();
      const rankCell = row.insertCell();
      const attemptsCell = row.insertCell();
      rankCell.textContent = index + 1;
      attemptsCell.textContent = entry.attempts;
    });
  } else {
    const row = leaderboardTable.insertRow();
    const noEntriesCell = row.insertCell();
    noEntriesCell.colSpan = 2;
    noEntriesCell.textContent = "No entries yet.";
  }
}
