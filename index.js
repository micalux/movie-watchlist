 


const apiKey = '37e37f1f'
const searchBtn = document.getElementById('search-btn')
const form = document.querySelector('form')

moviePoster = document.getElementById('movie-poster')
movieTitle = document.getElementById('movie-title')
movieRating = document.getElementById('movie-rating')
movieDuration = document.getElementById('movie-duration')
movieGenre = document.getElementById('movie-genre')
movieDescription = document.getElementById('movie-description')

watchlistBtn = document.getElementById('watchlist-btn')



form.addEventListener('submit', function(e){
    e.preventDefault()
    const searchInput = document.getElementById('search-input').value

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchInput}`)
        .then (res => res.json())
        .then (data => {
            console.log(data)
            renderSearch()
        })
    
    form.reset()
})

const renderSearch = () => {
    console.log('click')
}