const proxyURI = "https://ghproxy-naxabue7rq-ew.a.run.app/users/"

export async function getGitHubData(username) {

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

    return {
      user: userData,
      starred: starredData,
      activity: activityData,
      mostPopularRepos: mostPopularRepos
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

  // User Information
  const userInformation = document.createElement("div");
  userInformation.classList.add("user-info");
  userInformation.innerHTML = `<h2>User Information:</h2>
    <p>Username: ${data.user.login}</p>
    <p>Name: ${data.user.name}</p>
    <p>Location: ${data.user.location}</p>
    <p>Bio: ${data.user.bio}</p>`;
  resultsDiv.appendChild(userInformation);

  // Starred Projects Title
  const starredProjectsTitle = document.createElement("div");
  starredProjectsTitle.classList.add("section-title");
  starredProjectsTitle.textContent = "Starred Projects:";
  resultsDiv.appendChild(starredProjectsTitle);

  // Starred Projects as Cards
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

    const repoLink = document.createElement("a");
    repoLink.href = repo.html_url;
    repoLink.textContent = "View on GitHub";
    repoCard.appendChild(repoLink);

    starredCardContainer.appendChild(repoCard);
  });

  starredProjectsContainer.appendChild(starredCardContainer);
  resultsDiv.appendChild(starredProjectsContainer);

  // Recent Activity Title
  const recentActivityTitle = document.createElement("div");
  recentActivityTitle.classList.add("section-title");
  recentActivityTitle.textContent = "Recent Activities:";
  resultsDiv.appendChild(recentActivityTitle);

  // Recent Activities as List
  const recentActivityList = document.createElement("div");
  recentActivityList.classList.add("section-list");

  data.activity.slice(0, 3).forEach(event => {
    const eventText = document.createElement("p");
    const formattedDate = formatDateTime(event.created_at);
    eventText.textContent = `${formattedDate} ${event.type.replace("Event", "")}`;
    recentActivityList.appendChild(eventText);
  });

  resultsDiv.appendChild(recentActivityList);

  // Most Popular Repositories
  const popularRepos = document.createElement("div");
  popularRepos.classList.add("popular-repos");
  popularRepos.innerHTML = "<h2>Most Popular Repositories:</h2>";
  data.mostPopularRepos.slice(0, 3).forEach(repo => {
    const repoText = document.createElement("p");
    repoText.textContent = `${repo.name} - ${repo.stargazers_count} stars`;
    popularRepos.appendChild(repoText);
  });
  resultsDiv.appendChild(popularRepos);
}
