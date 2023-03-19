const searchInput = document.querySelector("#search_input");
const searchButton = document.querySelector("#search_button");
const searchResults = document.querySelector("#search_results");

searchButton.addEventListener("click", searchRepositories);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchRepositories();
  }
});

function searchRepositories() {
  const query = searchInput.value.trim();
  if (query.length < 3) {
    alert("Search query must be at least 3 characters long.");
    return;
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    query
  )}&per_page=10`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length === 0) {
        searchResults.innerHTML = "<p>Ничего не найдено</p>";
        return;
      }

      searchResults.innerHTML = "";
      data.items.forEach((repository) => {
        const repositoryLink = document.createElement("a");
        repositoryLink.classList.add("repository_name");
        repositoryLink.href = repository.html_url;
        repositoryLink.target = "_blank";
        repositoryLink.textContent = repository.name;

        const repositoryDescription = document.createElement("p");
        repositoryDescription.classList.add("repository_description");
        repositoryDescription.textContent = "Description: " + repository.description;

        const repositoryLanguage = document.createElement("p");
        repositoryLanguage.classList.add("repository_language");
        repositoryLanguage.textContent = "Language: " + repository.language;

        const repositoryItem = document.createElement("div");
        repositoryItem.classList.add("repository_item");
        
        repositoryItem.appendChild(repositoryLink);
        repositoryItem.appendChild(repositoryDescription);
        repositoryItem.appendChild(repositoryLanguage);
        searchResults.appendChild(repositoryItem);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while searching for repositories.");
    });
}
