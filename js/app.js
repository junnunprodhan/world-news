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
    console.log(news)
  const cardContainer =document.getElementById('card-container');
  cardContainer.textContent='';
  news.forEach(news => {
    const {image_url,thumbnail_url,title,total_view} = news;
    console.log(news.author.img)
    const cardInfo = document.createElement('div');
    cardInfo.classList.add('row', 'g-0');
    cardInfo.innerHTML=`
    <div class="col-md-4 mt-4">
                    <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <div class="d-flex justify-content-around">
                        <div class="d-flex">
                            <div>
                                <img style="width:50px; height:50px" src="${news.author.img}" alt="">
                            </div>
                            <div class="ms-2">
                                <h5>${news.author.name ? news.author.name :'Not Found'}</h5>
                                <p>22-09-23</p>
                            </div>
                        </div>
                        <div>
                            <h4>1.M</h4>
                        </div>
                        <div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">Show Details
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
    `
    cardContainer.appendChild(cardInfo);
  });

}


newsDataLoad()
// document.getElementById('show-all-categories').addEventListener('click',function(even){
//     console.log(even.target.innerText)
// })




// const newsDataLoad=()=>{
// fetch('https://openapi.programming-hero.com/api/news/categories')
//     .then(res => res.json())
//     .then(data => displayNews(data.data.news_category))
//     .catch(error => console.log(error));
// }
// const displayNews = News => {
//     const showAll = document.getElementById('show-categories');
//     News.forEach(news => {
//         console.log(news.category_name)
//         const list = document.createElement('li');
//         list.classList.add('list-group-item');
//         list.innerText = ${news.category_name};
//         showAll.appendChild(list);
//     })

// }