// toggleSpinner(false)
const newsDataLoad=()=>{
    const url =`https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res => res.json())
    .then(data =>displayData(data.data.news_category))
    .catch(error => console.log(error));
}

const displayData = (newsCategories)=>{
    // console.log(newsCategories)
    const categoriesContainer = document.getElementById('show-all-categories');
    newsCategories.forEach(newsCategory => {
       const listDiv = document.createElement('div');
       listDiv.classList.add('active')
       listDiv.innerHTML =`
      <a onclick="loadNews('${newsCategory.category_id}')" class="nav-link" href"a"> ${newsCategory.category_name}</a>`;
      // spinner start 
      toggleSpinner(true)
       categoriesContainer.appendChild(listDiv);
    });
}

const loadNews=(id)=>{
    const url =`https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
    .then (res=> res.json())
    .then (data=> displayNews(data.data))
}

const displayNews=(news)=>{
  const itemCount = document.getElementById('items-count')
  itemCount.innerText = news.length;
  // const allNews = news.sort((a,b)=>b-a);
  const cardContainer =document.getElementById('card-container');
  cardContainer.textContent='';
  const sort =news.sort(function (a, b) { return b.total_view - a.total_view });
 
  news.forEach(news => {
    const {image_url,title,total_view,details,thumbnail_url} = news;
    const cardInfo = document.createElement('div');
    cardInfo.classList.add('row', 'g-0');
    cardInfo.innerHTML=`
    <div class="col-md-4 bg-light">
      <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text details">${details.slice(0,450)}<span class="text-primary">...</span></p>
        <div class="d-flex justify-content-around">
          <div class="d-flex">
            <div>
              <img style="width:50px; height:50px" src="${news.author.img}" alt="">
            </div>
          <div class="ms-2">
            <h5>${news.author.name ? news.author.name :'Not Found'}</h5>
            <p>${news.author.published_date? news.author.published_date :'not found' }</p>
          </div>
        </div>
        <div>
          <h5>views : ${total_view? total_view  :'No view'}<span>M</span></5>
        </div>
        <div>
          <button onclick="loadNewsDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">Show Details
          </button>
         </div>
         </div>
       </div>
    </div>
    `
    cardContainer.appendChild(cardInfo);
    // spinner stop 
    toggleSpinner(false)
  });
}

const loadNewsDetails =(news_id)=>{
  const url=`https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showDetailsNews(data.data))
}

const showDetailsNews = (data)=>{
  console.log(data)
  const cardTitle = document.getElementById('detailsModalLabel')
  cardTitle.innerText= data[0].title;
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML=`
  <div class="card">
    <img src="${data[0].image_url}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${data[0].details}</p>
      <p class="card-text"> author name :${data[0].author.name? data[0].author.name:'not found'}</p>
      <p class="card-text">publish date : ${data[0].author.published_date? data[0].author.published_date:'not found'}</p>
      <p class="card-text">Rating: ${data[0].rating.number? data[0].rating.number:'no rating'}</p>
      <p class="card-text">news type: ${data[0].others_info.is_trending? 'trending news':'not trending news'}</p>
    </div>
  </div>
  `
}

const toggleSpinner = isLoading =>{
  const loader = document.getElementById('loader');
  if(isLoading){
      loader.classList.remove('d-none')
  }
  else{
      loader.classList.add('d-none')
  }
}


newsDataLoad()