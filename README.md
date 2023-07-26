# GitHub Profile Analyser

Interested to learn more about your fellow FAC28 members?

Search for their GitHub username to see information about their profile.

## Features

- Showing a user's starred projects.
- Showing a user's recent activity.
- Listing a user's most popular repositories.

## Run Locally

### Clone the project

#### Option 1: if you have [GitHub CLI installed](https://github.com/cli/cli/tree/trunk)

```bash
  gh repo clone yuqingwwang/github-profile-analyser
```

#### Option 2:

```bash
  git clone git@github.com:yuqingwwang/github-profile-analyser.git
```

### Go to the project directory

```bash
  cd github-profile-analyser
```

and open the folder in vscode

### Open the index.html file with Live Server in Visual Studio Code (VSCode)

#### Install the Live Server extension in VSCode.

If you haven't already installed it, you can do so by following these steps:

- Launch VSCode.
- Go to the Extensions view.
- Search for "Live Server" in the Extensions search bar and click the "Install" button.

#### In VSCode

- Locate your index.html file. It should be visible in the sidebar on the left-hand side.
- Right-click on the index.html file and select "Open with Live Server" from the context menu.

Live Server will open a new browser tab or window and load your index.html file.

You can now see the webpage in action.

## Deployment

View the page on [GitHub Pages](https://yuqingwwang.github.io/github-profile-analyser/)

## Tools used

HTML, CSS, JavaScript

[Chart.js](https://www.chartjs.org/docs/latest/)

Fast API, Docker, Uvicorn, Google Cloud Platform

- These tools are used to build a proxy to protect the GitHub API token. You can view my
proxy's documentation [here](https://ghproxy-naxabue7rq-ew.a.run.app/docs)

## Acknowledgements

Colour palletes for the bar chart is from [Coolors](https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500)
