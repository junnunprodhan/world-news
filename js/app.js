const newsDataLoad=()=>{
    const url =`https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res => res.json())
    .then(data =>displayData(data.data.news_category))
    .catch(error => console.log(error));
}

const displayData=(newsCategories)=>{
    // console.log(newsCategories)
    const categoriesContainer = document.getElementById('show-all-categories');
    newsCategories.forEach(newsCategory => {
       const list = document.createElement('div');
       list.classList.add('bg');
       list.innerHTML =`
      <a onclick="loadNews('${newsCategory.category_id}')" class="nav-link" href"a"> ${newsCategory.category_name}</a>`;
      // spinner start 
      toggleSpinner(true)
       categoriesContainer.appendChild(list);
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
  const newsFound = document.getElementById('news-found')
  itemCount.innerText = news.length;
    console.log(news.length)
  const cardContainer =document.getElementById('card-container');
  cardContainer.textContent='';
  news.forEach(news => {
    const {image_url,title,total_view,details} = news;
    const cardInfo = document.createElement('div');
    cardInfo.classList.add('row', 'g-0');
    cardInfo.innerHTML=`
    <div class="col-md-4 mt-4">
                    <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${details.slice(0,450)}</p>
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
                            <h5>views : ${total_view? total_view :'No view'}</5>
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
  // console.log(news_id)
  const url=`https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`
  console.log(url)
  fetch(url)
  .then(res=>res.json())
  .then(data=>console.log(data))
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
