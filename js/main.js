const apiKey = "0f11911fde71c18ff4464f1480dee77b";
const baseUrl = "https://api.themoviedb.org/3/";
const imagesUrl = "https://image.tmdb.org/t/p/w500";
const movieList = document.querySelector(".movie__list");
const searchInput = document.querySelector(".searchInput");
const loader_container = document.querySelector(".loader__container");
const loader = document.createElement("div");
loader_container.append(loader);
loader.classList.add("loader");

async function fetchData() {
  if (!searchInput.value) {
    url = `${baseUrl}discover/movie?api_key=${apiKey}`;
  } else {
    url = `${baseUrl}search/movie?api_key=${apiKey}&query=${searchInput.value}`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    movieList.innerHTML = "";
    data.results.map((movie) => {
      const movieItem = document.createElement("li");
      movieList.append(movieItem);
      movieItem.classList.add("movie__item");
      const movieItemImgBlock = document.createElement("div");
      movieItem.append(movieItemImgBlock);
      movieItemImgBlock.classList.add("movie__item-img-block");
      const movieItemImg = document.createElement("img");
      movieItemImgBlock.append(movieItemImg);
      movieItemImg.classList.add("movie__item-img");
      movieItemImg.src = `${imagesUrl + movie.backdrop_path}`;
      movieItemImg.alt = movie.overview;
      const movieItemTitle = document.createElement("h1");
      movieItem.append(movieItemTitle);
      movieItemTitle.classList.add("movie__item-title");
      movieItemTitle.textContent = movie.title;
      const movieItemDate = document.createElement("h2");
      movieItem.append(movieItemDate);
      movieItemDate.classList.add("movie__item-date");
      movieItemDate.textContent = movie.release_date;
      const movieItemId = document.createElement("p");
      movieItem.append(movieItemId);
      movieItemId.classList.add("movie__item-id");
      movieItemId.textContent = `id: ${movie.id}`;
    });
  } catch (error) {
    console.error(error.message);
  }
}
setTimeout(() => {
  fetchData();
}, 777);
const searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchData();
  searchInput.value = "";
});
