const imageUrl =  `https://image.tmdb.org/t/p/w220_and_h330_face`;

const movieContainer =  document.getElementById(`movie-items-container`)
const next = document.getElementById("next")
const prev = document.getElementById('prev')
const fetchPopularMovies = async ( page = 1) =>{
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
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

    data.results.forEach( (result , index)=>{
        cardHtml += generateMovieCard(result)
    } )
    
    movieContainer.innerHTML = cardHtml

} 

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

const fetchInitData =  () =>{
    const currentUrl = new URL(window.location.href)
    
    let page =  currentUrl.searchParams.get("page") ?? 1
    if(page > 1)   prev.style="display:block";
    fetchPopularMovies(page)
    
} 
fetchInitData()




// 1. get data form api
// 2. generate dynamic html 

next.addEventListener("click", (event)=>{

    const currentUrl = new URL(window.location.href)
    
   let page =  currentUrl.searchParams.get("page")

   if(page === null){
    currentUrl.searchParams.set("page", 2)
    fetchPopularMovies(2)
  
    prev.style="display:block";

   }else{

    page ++;
    prev.style="display:block";
    currentUrl.searchParams.set("page", page)
    fetchPopularMovies(page)

   }

   window.scrollTo({ top: 0, behavior: 'smooth' })
   history.pushState({}, "", currentUrl);

})

prev.addEventListener("click" ,()=>{
    const currentUrl = new URL(window.location.href)
    let page =  currentUrl.searchParams.get("page")
    if(page === null){
        currentUrl.searchParams.set("page", 2)
        fetchPopularMovies(2)
      
        if(page > 1)   prev.style="display:block"
    
       }else{
    
        page --;
        prev.style="display:block";
        currentUrl.searchParams.set("page", page)
        fetchPopularMovies(page)
    
       }

       window.scrollTo({ top: 0, behavior: 'smooth' })
       history.pushState({}, "", currentUrl);
       
})