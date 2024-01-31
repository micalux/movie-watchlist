export {hideElement, showElement, moviesFromLS}

const apiKey = '37e37f1f'
const form = document.querySelector('form')
const movieContainer = document.getElementById('movie-container')
const indexDefaultTxt = document.getElementById('index-default-txt')
const searchForm = document.getElementById('search-form')
const moviesFromLS = JSON.parse(localStorage.getItem('fav-movies'))

let myWatchlist = []
let searchedMovies = []


if (moviesFromLS) {
    myWatchlist = moviesFromLS
}


if (searchForm) {
    searchForm.addEventListener('submit', function(e){
        e.preventDefault()
        const searchInput = document.getElementById('search-input').value
    
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchInput}`)
            .then (res => res.json())
            .then (data => {
                hideElement(indexDefaultTxt)
                if (data.Title) {
                    searchedMovies.push(data)
                    renderSearch(data)
                } else {
                    displaySearchError()
                }
            })
        form.reset()
    })
}

const renderSearch = (movie) => {
    movieContainer.innerHTML = `
        <div class="flex-container">
            <img src="${movie.Poster}" alt="img-title">   
            <div class="movie-info">
                <div class="row-1">
                    <h3>${movie.Title}</h3>
                    <i class="fa-solid fa-star"></i>
                    <p class="rating">${movie.imdbRating}</p>
                </div>
                <div class="row-2">
                    <p class="duration">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <div class="watchlist-btn">
                        <i class="fa-solid fa-circle-plus data-addid="${movie.imdbID}""></i>
                        <p class="watchlist" data-addid="${movie.imdbID}">Watchlist</p>
                    </div>
                </div>              
                <p class="description">${movie.Plot}</p>
            </div>
         </div> 
         <div class="separator"></div> 
    `
}

// add to watchlist function
document.addEventListener('click', (e) => {
    const movieId = e.target.dataset.addid

        if (movieId) {
            if (!myWatchlist.some((obj) => obj.imdbID === movieId)) { 
                myWatchlist.unshift(searchedMovies.find(movie => movie.imdbID === movieId))
                updateLocalStorage()
                console.log('Movie added to watchlist')
            } else {
                console.log('Movie already exists on watchlist')
                console.log(myWatchlist)
            }
        }
    }
)

function displaySearchError() {
    movieContainer.innerHTML = `
        <div class="search-error">
            <h3>Unable to find what you’re looking for. 
                Please try another search.</h3>
        </div>
    `
}

function updateLocalStorage() {
    localStorage.setItem('fav-movies', JSON.stringify(myWatchlist))
}

function hideElement(e) {
    e.classList.add('hidden')
}

function showElement(e) {
    e.classList.remove('hidden')
}