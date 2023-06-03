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
let randomNumber;
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

  if (!randomNumber) {
    randomNumber = generateRandomNumber(minRange, maxRange);
  }

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
    randomNumber = undefined;
  } else {
    alert(`Your guess is ${result}. Try again!`);
  }

  document.getElementById("guessInput").value = ""; // Clear the input field after each guess
}

// Function to display the leaderboard
function showLeaderboard() {
  const leaderboardContainer = document.getElementById("leaderboard");
  leaderboardContainer.innerHTML = "<h2>Leaderboard</h2>";

  if (leaderboard.length > 0) {
    const olElement = document.createElement("ol");

    leaderboard.forEach((entry, index) => {
      const liElement = document.createElement("li");
      liElement.textContent = `${index + 1}. ${entry.attempts} attempts`;
      olElement.appendChild(liElement);
    });

    leaderboardContainer.appendChild(olElement);
  } else {
    leaderboardContainer.innerHTML += "<p>No entries yet.</p>";
  }
}
