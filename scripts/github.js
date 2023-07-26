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

  // if there's no bio, display a message
  if (!data.user.bio) {
    data.user.bio = "No bio available.";
  }

  // User Information
  const userInformation = document.createElement("div");
  userInformation.classList.add("user-info");
  userInformation.innerHTML = `<h2>User Information:</h2>
    <p>Username: ${data.user.login}</p>
    <p>Name: ${data.user.name}</p>
    <p>Location: ${data.user.location}</p>
    <p>Bio: ${data.user.bio}</p>`;
  resultsDiv.appendChild(userInformation);

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

  // Recent Activity Title

  const recentActivityTitle = document.createElement("div");
  recentActivityTitle.classList.add("section-title");
  recentActivityTitle.textContent = "Recent Activities:";
  resultsDiv.appendChild(recentActivityTitle);

  // Recent Activities as List
  const recentActivityList = document.createElement("div");
  recentActivityList.classList.add("section-list");

  // Create an unordered list (ul) element
  const ulElement = document.createElement("ul");
  recentActivityList.appendChild(ulElement);


  data.activity.slice(0, 3).forEach(event => {
    const eventText = document.createElement("li");
    const formattedDate = formatDateTime(event.created_at);
    eventText.textContent = `${formattedDate} ${event.type.replace("Event", "")}`;
    ulElement.appendChild(eventText); // Append the list item to the unordered list (ul)
  });

  resultsDiv.appendChild(recentActivityList);

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