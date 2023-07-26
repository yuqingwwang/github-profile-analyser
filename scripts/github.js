import { makeChart } from "./canvas.js";
import { TYPES } from "./constants.js";

const recentActivitiesHeader = document.getElementById("recentActivitiesHeader");

const proxyURI = "https://ghproxy-naxabue7rq-ew.a.run.app/users/"

export async function getGitHubData(username) {
  if(!username) return;

  try {
    const userResponse = await fetch(`${proxyURI}${username}`);
    const userData = await userResponse.json();

    const starredResponse = await fetch(`${proxyURI}${username}/starred`);
    const starredData = await starredResponse.json();

    const activityResponse = await fetch(`${proxyURI}${username}/events`);
    const activityData = await activityResponse.json();

    const reposResponse = await fetch(`${proxyURI}${username}/repos`);
    const reposData = await reposResponse.json();

    const mostPopularRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);

    // retrieve user avatar
    const avatarResponse = await fetch(userData.avatar_url);
    const avatarBlob = await avatarResponse.blob();
    const avatarURL = URL.createObjectURL(avatarBlob);
    userData.avatar_url = avatarURL;

    return {
      user: userData,
      starred: starredData,
      activity: activityData,
      mostPopularRepos: mostPopularRepos,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export function formatDateTime(dateTimeStr) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/London'
  };
  return new Date(dateTimeStr).toLocaleString(undefined, options);
}

export function displayResults(data) {
  const resultsDiv = document.getElementById("results");

  // if there's no name/location/bio, display a message
  for (const key in data.user) {
    if (!data.user[key]) {
      data.user[key] = "No info";
    }
  }

  const userContainer = document.querySelector(".user-info");

  // User Information
  const userInformation = document.createElement("div");

  userInformation.innerHTML = `<h2>User Information</h2>
    <p>Username: ${data.user.login}</p>
    <p>Name: ${data.user.name}</p>
    <p>Location: ${data.user.location}</p>
    <p>Bio: ${data.user.bio}</p>`;
  userContainer.appendChild(userInformation);

  // display user avatar
  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = data.user.avatar_url;
  avatar.alt = `${data.user.login}'s avatar`;
  userInformation.appendChild(avatar);

  // Starred Projects Title
  const starredProjectsTitle = document.createElement("div");
  starredProjectsTitle.classList.add("section-title");
  starredProjectsTitle.textContent = "Starred Projects:";
  resultsDiv.appendChild(starredProjectsTitle);

  // Starred Projects as Cards

   // if there's no starred repos, display a message
   if (data.starred.length === 0) {
    data.starred.push({
      name: "No starred repos",
      description: ""
    });
  }

  const starredProjectsContainer = document.createElement("div");
  starredProjectsContainer.classList.add("starred-projects-container");

  const starredCardContainer = document.createElement("div");
  starredCardContainer.classList.add("starred-card-container");

  data.starred.slice(0, 3).forEach(repo => {
    const repoCard = document.createElement("div");
    repoCard.classList.add("starred-card");

    const repoName = document.createElement("h3");
    repoName.textContent = repo.name;
    repoCard.appendChild(repoName);

    const repoDescription = document.createElement("p");
    repoDescription.textContent = repo.description || "No description available.";
    repoCard.appendChild(repoDescription);

    if (repo.html_url) {
      const repoLink = document.createElement("a");
      repoLink.href = repo.html_url;
      repoLink.textContent = "View on GitHub";
      repoCard.appendChild(repoLink);
    }

    starredCardContainer.appendChild(repoCard);
  });

  starredProjectsContainer.appendChild(starredCardContainer);
  resultsDiv.appendChild(starredProjectsContainer);

  // Recent Activity
  const activityCounts = {};
  data.activity.slice(0, 10).forEach(event => {
    // map the values from types
    const activityType = TYPES[event.type];
    activityCounts[activityType] = (activityCounts[activityType] || 0) + 1;
  });

  // Extract activity types and their corresponding counts

  // sort activityCounts by count
  const activityTypes = Object.keys(activityCounts).sort((a, b) => activityCounts[b] - activityCounts[a]);
  const activityTypeCounts = Object.values(activityCounts).sort((a, b) => b - a);

  const recentActivityTitle = document.createElement("div");

  makeChart(activityTypes, activityTypeCounts);
  resultsDiv.appendChild(recentActivityTitle);
  recentActivitiesHeader.style.display = "block";

  // Most Popular Repositories

  const popularRepos = document.createElement("div");
  popularRepos.classList.add("popular-repos");
  popularRepos.innerHTML = "<h2>Most Popular Repositories:</h2>";

  // only display repo with more than 0 stars
  const starredRepos = data.mostPopularRepos.filter(repo => repo.stargazers_count > 0);

  if(starredRepos.length === 0){
    const repoText = document.createElement("p");
    repoText.textContent = "No starred repos";
    popularRepos.appendChild(repoText);
  } else {
    starredRepos.slice(0, 3).forEach(repo => {
      const repoText = document.createElement("p");
      repoText.textContent = `${repo.name} - ${repo.stargazers_count} stars`;
      popularRepos.appendChild(repoText);
    });
  }

  resultsDiv.appendChild(popularRepos);
}
