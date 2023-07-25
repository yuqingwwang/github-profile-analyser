import { populateDropdown } from './users.js';
import { getGitHubData, displayResults } from './github.js';

let USERNAME = "";

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", getUserSelection);

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
}

async function main() {
  const username = USERNAME;

  const data = await getGitHubData(username);

  if (data) {
    displayResults(data);
  }
}

main();
