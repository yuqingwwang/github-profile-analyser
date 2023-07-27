document.getElementById("submit").addEventListener("click", function () {
  // Enable tabbing for elements
  document.getElementById("user-container").tabIndex = 3;
  document.getElementById("chartContainer").tabIndex = 4;
  document.getElementById("results").tabIndex = 5;

  document.getElementById("user-container").style.pointerEvents = "auto";
  document.getElementById("chartContainer").style.pointerEvents = "auto";
  document.getElementById("results").style.pointerEvents = "auto";
});
