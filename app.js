const BASE_URL = "http://www.omdbapi.com/?type=movie";
const apiKey = "apikey=d8e6d5b3";
const searchButton = document.getElementById("search-btn");
const moviesArea = document.querySelector("#movie-result");

const showMovie = (movies) => {
  moviesArea.innerHTML = "";
  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.id = "movie";
    movieDiv.innerHTML = `
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year}</p>
        <img src="${movie.Poster}" alt="${movie.Title}" width="100">
    `;
    moviesArea.appendChild(movieDiv);
  });
};

const searchMovie = (movieName) => {
  const url = `${BASE_URL}&s=${movieName}&${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        showMovie(data.Search);
      } else {
        moviesArea.innerHTML = "<p>No movies found!</p>";
      }
    })
    .catch((err) => console.log("Error fetching data: ", err));
};

searchButton.addEventListener("click", () => {
  const searchPrompt = document.querySelector("#search-box").value;
  if (searchPrompt) {
    searchMovie(searchPrompt);
  }
});
