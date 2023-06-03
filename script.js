// Generate a random number within a specified range
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
const randomNumber = generateRandomNumber(minRange, maxRange);
let attempts = 0;

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
    // You can add additional logic here, such as updating the score or displaying a leaderboard.
  } else {
    alert(`Your guess is ${result}. Try again!`);
  }

  document.getElementById("guessInput").value = ""; // Clear the input field after each guess
}
