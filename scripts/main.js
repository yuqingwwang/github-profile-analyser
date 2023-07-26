import { populateDropdown } from './users.js';
import { getGitHubData, displayResults } from './github.js';

let USERNAME = "";

const submitButton = document.getElementById("submit");
const recentActivitiesHeader = document.getElementById("recentActivitiesHeader");

// Add event listener to the submit button
submitButton.addEventListener("click", () => {
  recentActivitiesHeader.style.display = "block";
  getUserSelection();
});

populateDropdown();

function getUserSelection() {
  const dropdown = document.getElementById("userDropdown");
  const selectedUser = dropdown.value;

  if (selectedUser === "") {
      alert("Please select a user.");
  } else {
      USERNAME = selectedUser;
      clearResults();
      main();
  }
}

function clearResults() {
  const resultsDiv = document.getElementById("results");
  while (resultsDiv.firstChild) {
      resultsDiv.removeChild(resultsDiv.firstChild);
  }
  // Clear the content of the canvas
  const canvas = document.getElementById("myChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Destroy the Chart.js instance associated with the canvas
  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }
}

async function main() {
  const username = USERNAME;

  const data = await getGitHubData(username);

  if (data) {
    displayResults(data);
  }
}

main();
