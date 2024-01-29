export {hideElement}

const apiKey = '37e37f1f'
const searchBtn = document.getElementById('search-btn')
const form = document.querySelector('form')
const movieContainer = document.getElementById('movie-container')
const indexDefaultTxt = document.getElementById('index-default-txt')
const searchForm = document.getElementById('search-form')
const watchlistContainer = document.getElementById('watchlist-container')

let myWatchlistObj = []




if (searchForm) {
    searchForm.addEventListener('submit', function(e){
        e.preventDefault()
        const searchInput = document.getElementById('search-input').value
    
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchInput}`)
            .then (res => res.json())
            .then (data => {
                console.log(data)
                hideElement(indexDefaultTxt)
                if (data.Title) {
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
                    <div id="add-to-watchlist-btn">
                        <i class="fa-solid fa-circle-plus"></i>
                        <p class="watchlist">Watchlist</p>
                    </div>
                </div>              
                <p class="description">${movie.Plot}</p>
            </div>
         </div> 
         <div class="separator"></div> 
    `
    const addToWatchlistBtn = document.getElementById('add-to-watchlist-btn')
    addToWhatchlist(addToWatchlistBtn, movie)
}

function addToWhatchlist(e, movie) {
    e.addEventListener('click', () => {
        myWatchlistObj.push(movie)
        // verificare se già presente
        localStorage.setItem('fav-movies', JSON.stringify(myWatchlistObj))
        console.log(myWatchlistObj)
    })
}

function displaySearchError() {
    movieContainer.innerHTML = `
        <div class="search-error">
            <h3>Unable to find what you’re looking for. 
                Please try another search.</h3>
        </div>
    `
}

function hideElement(e) {
    e.classList.add('hidden')
}
