const input = document.querySelector('.movie__input');
const productsList = document.querySelector('.movie__list');
const searchButton = document.querySelector('.movie__search');
const movieList = document.querySelector('.movie__list')
const searchResults = document.querySelector('.movie__search__results');
const movie = document.querySelector('.movie');
const noresultwrapper = document.querySelector('.noResultsWrapper')
let movies = []; 
let searchTimeout;

async function fetchData() {
 
  const inputValue = input.value.toLowerCase();
  const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=a6dcc2c2&s=${inputValue}`);
  const data = await response.json();
  movies = data.Search; 
  
  renderData();
}



async function renderData() {
 
if(!movies){
  noresultwrapper.style.display ='block';
  movieList.style.display ='none';
  searchResults.innerHTML='';
  input.value =''

}

  movieList.innerHTML = ` <i class="fa-solid fa-spinner spinner spinner--show"></i>`;
  movieListTimeout = setTimeout(() => {
   
    
    const filteredMovies =  movies.filter(movie => movie.Title.toLowerCase().includes(input.value.toLowerCase()));
    const moviesHTML = filteredMovies.map((movie)=>{
      return `<div class="movie">
        <figure class="movie__image__wrapper">
          <img src="${movie.Poster}" alt="" class="movie__img">
          <h3 class="movie__info__title">${movie.Title}</h3>
          <div class="movie__info__list">
            <div class="movie__info ">
              <i class="fa-solid fa-clock movie__info__icon"></i>
              <p class="movie__info__text">136m</p>
            </div>
            <div class="movie__info">
              <i class="fa-solid fa-star movie__info__icon"></i>
              <p class="movie__info__text">4.5</p>
            </div>
            <div class="movie__info">
              <i class="fa-solid fa-earth-americas movie__info__icon"></i>
              <p class="movie__info__text">English</p>
            </div>
          </div>
        </figure>
        <h4 class="movie__title">${movie.Title}</h4>
      </div>
      `
    }).slice(0,6).join('')
    
    movieList.innerHTML = moviesHTML;
    searchResults.innerHTML=input.value;
    input.value=''
  }, 2000); 
  
}
document.addEventListener('keydown', async function(event) {
  clearTimeout(searchTimeout);
  if (event.key === 'Enter') {
    if (input.value.trim() === '') {
      return;
    }
    searchTimeout = setTimeout(() => {
      fetchData();
    }, 500);
  }

});


searchButton.addEventListener('click', fetchData);