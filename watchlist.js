import {hideElement, showElement, moviesFromLS} from './index.js'

const watchlistContainer = document.getElementById('watchlist-container')
const watchlistDefaultTxt = document.getElementById('watchlist-default-txt')

let myWatchlist = moviesFromLS


const renderWatchList = () => {
    
    if (myWatchlist.length > 0) {
        hideElement(watchlistDefaultTxt)
        let moviesToRender = ""
        for (let movie of myWatchlist) {
            moviesToRender += `
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
                                <i class="fa-solid fa-circle-minus" data-removeid="${movie.imdbID}"></i>
                                <p class="watchlist" data-removeid="${movie.imdbID}">Remove</p>
                            </div>
                        </div>              
                        <p class="description">${movie.Plot}</p>
                    </div>
                </div> 
                <div class="separator-watch"></div> 
            `
        }
        watchlistContainer.innerHTML = ''
        watchlistContainer.innerHTML = moviesToRender
    } else {
        showElement(watchlistDefaultTxt)
        watchlistContainer.innerHTML = ''
    }
}

renderWatchList()


// remove from watchlist
document.addEventListener('click', (e) => {
    const movieId = e.target.dataset.removeid
    if (movieId) {
        myWatchlist = myWatchlist.filter(movie => movie.imdbID !== movieId)      
        renderWatchList()
        updateLocalStorage()
        }
    }
)


function updateLocalStorage() {
    localStorage.setItem('fav-movies', JSON.stringify(myWatchlist))
}
