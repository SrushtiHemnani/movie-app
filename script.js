const imageUrl =  `https://image.tmdb.org/t/p/w220_and_h330_face`;

const movieContainer =  document.getElementById(`movie-items-container`)

const fetchPopularMovies = async () =>{
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmE3ZTcwZjU5NWU2YjVjNzJjOWY2MDkyZWQ5OTAyYSIsInN1YiI6IjY1OTk2ZDEzODliNTYxMDA5NDhiNmYzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GD3CvwqOKDrTWnSmHHK3cLXZfsn-aALseuxpOJCmXwI'
    }
    };

    const response = await fetch( url, options)

    const data = await response.json()

    let cardHtml = ''

    data.results.forEach((result)=>{
        cardHtml+= generateMovieCard(result)
    })
    
    movieContainer.innerHTML = cardHtml

} 

fetchPopularMovies()


const generateMovieCard =(data) => {

    let html  = `<div class="column is-3-tablet is-12-mobile">
    <div class="card">
      <div class="card-image">
        <figure class="image is-3by4">
          <img src="${imageUrl}${data.backdrop_path}" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h2 class="has-text-centered">${data.title}</h2>
          <p>${data.overview}</p>
          <p >Ratings-${data.vote_average}</p>
        </div>
      </div>
    </div>
  </div>`;
  return html
} 


//   