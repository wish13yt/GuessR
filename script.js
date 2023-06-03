// Function to display the leaderboard
function showLeaderboard() {
  const leaderboardContainer = document.getElementById("leaderboard");
  leaderboardContainer.innerHTML = ""; // Clear the existing content

  if (leaderboard.length > 0) {
    const leaderboardTable = document.createElement("table");
    leaderboardTable.classList.add("leaderboard-table");

    // Create table header row
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

    // Create table rows for each leaderboard entry
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
