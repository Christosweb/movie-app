const IMAGE_PATH = "https://image.tmdb.org/t/p/original/"
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c26ec56a143280977c169b7488ef5ea2&PAGE=1"

let input = document.querySelector("#search");
let result = document.querySelector(".result");
let faSearch = document.querySelector('.fa-magnifying-glass')
let htmlRsesult = document.querySelector('.search-result')
let discover = document.querySelector('.discover-container')

result.style.display = "none"
//function to search movie 
async function searchMovieData() {
    
  try{ const url = `https://api.themoviedb.org/3/search/movie?query=${input.value}&api_key=c26ec56a143280977c169b7488ef5ea2 `
        const response = await fetch(url)
        if (response.status === 200) {
            console.log("succes")
        }  
       const  data = await response.json()  
       return data
  } catch(error){
    console.error('An error occurred:' + " " + error.message)
  }  
}
// function to 
function renderData(data) {
  htmlRsesult.innerHTML = ''
   // console.log(data.results)
    
    let datas = data.results
    
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        const poster = element.poster_path;
        const title = element.title;
        const overview = element.overview;
        const vote_average = element.vote_average;
          let createEL = document.createElement('div');
          createEL.classList.add('movie-result');
          
          createEL.innerHTML = `
          <img src=${IMAGE_PATH}${poster} alt =${title} />
          <div class="movie-info">
          <h3>${title}</h3>
          <p class="rating">${vote_average}</p>
          <div class="overview">
                    <h3>OVERVIEW</h3>
                    <p>${overview}</p>
                </div>
          `
          htmlRsesult.appendChild(createEL)


    }
}
//function to fetch and render data
 async function fetchAndRenderData() {
    input.value
    const data = await searchMovieData()
   // renderData(data)
   if (input.value !== '') {
    renderData(data)
    discover.style.display = "none"
    result.style.display = "block"
   }else{
    result.style.display = "none"
    htmlRsesult.innerHTML = "RESULT NOT FOUND"
   }
    
}//fetchAndRenderData()

faSearch.addEventListener('click', fetchAndRenderData)

//discover function of the api
async function getDiscovery(url) {
 try {const res = await fetch(url)
  const data = await res.json()
  return data.results
 }
 catch(error){
  console.error('An error occurred:' + " " + error.message)
 }

}

async function renderDiscover() {
  const data = await getDiscovery(API_URL)
  discover.innerHTML = ''
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie
    let createEL = document.createElement('div');
          createEL.classList.add('movie-result');
          
          createEL.innerHTML = `
          <img src=${IMAGE_PATH}${poster_path} alt =${title} />
          <div class="movie-info">
          <h3>${title}</h3>
          <p class="rating">${vote_average}</p>
          <div class="overview">
                    <h3>OVERVIEW</h3>
                    <p>${overview}</p>
                </div>
          `
          discover.appendChild(createEL)
  })}
  renderDiscover()