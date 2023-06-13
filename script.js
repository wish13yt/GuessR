function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkGuess(randomNumber, guess) {
  if (guess === randomNumber) {
    return "equal";
  } else if (guess < randomNumber) {
    return "lower";
  } else {
    return "higher";
  }
}

const minRange = 1;
const maxRange = 100;
let randomNumber = generateRandomNumber(minRange, maxRange);
let attempts = 0;
let username = ""; 
let password = ""; 

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

    // Reset the game
    attempts = 0;
    randomNumber = generateRandomNumber(minRange, maxRange);
    document.getElementById("guessInput").value = "";
  } else {
    alert(`Your guess is ${result}. Try again!`);
  }
}

function handleUsernameInput() {
  username = document.getElementById("usernameInput").value;
}

function handlePasswordInput() {
  password = document.getElementById("passwordInput").value;
}

function handleLogin() {
  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  alert(`Logged in as ${username}`);
  clearInputs();
}

function handleSignup() {
  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  alert(`Signed up with username ${username}`);
  clearInputs();
}

function clearInputs() {
  document.getElementById("usernameInput").value = "";
  document.getElementById("passwordInput").value = "";
}

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
