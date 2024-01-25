const apiKey = '37e37f1f'
const searchBtn = document.getElementById('search-btn')
const form = document.querySelector('form')
const movie = document.getElementById('movie')


form.addEventListener('submit', function(e){
    e.preventDefault()
    const searchInput = document.getElementById('search-input').value

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchInput}`)
        .then (res => res.json())
        .then (data => {
            console.log(data)
            renderSearch(data)
        })
    form.reset()
})

const renderSearch = (data) => {
    movie.innerHTML = `
        <div class="flex-container">
            <img src="${data.Poster}" alt="img-title">   
            <div class="movie-info">
                <div class="row-1">
                    <h3>${data.Title}</h3>
                    <i class="fa-solid fa-star"></i>
                    <p class="rating">${data.imdbRating}</p>
                </div>
                <div class="row-2">
                    <p class="duration">${data.Runtime}</p>
                    <p class="genre">${data.Genre}</p>
                    <div id="watchlist-btn">
                        <i class="fa-solid fa-circle-plus"></i>
                        <p class="watchlist">Watchlist</p>
                    </div>
                </div>              
                <p class="description">${data.Plot}</p>
            </div>
         </div> 
         <div class="separator"></div> 
    `
    const watchlistBtn = document.getElementById('watchlist-btn')
    addToWhatchlist(watchlistBtn)

}

function addToWhatchlist(e) {
    e.addEventListener('click', () => {
        console.log('click')
    })
}

