import {hideElement} from './index.js'

const watchlistContainer = document.getElementById('watchlist-container')
const watchlistDeafultTxt = document.getElementById('watchlist-deafult-txt')

const moviesFromLS = JSON.parse(localStorage.getItem('fav-movies'))

// console.log(moviesFromLS[1])

const renderWatchList = () => {

    if (moviesFromLS) {
        hideElement(watchlistDeafultTxt)
        watchlistContainer.innerHTML = `
        <p class="genre">TEWSTO DI PROVA</p>
        `
        console.log('ok movies')
    } else {
        console.log('no movies')
    }
  
}

renderWatchList()



