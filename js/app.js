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
        console.log(newsCategory.category_id)
       const list = document.createElement('div');
       list.classList.add('mx-4');
       list.innerHTML =`
       <p>${newsCategory.category_id} </p>
       ${newsCategory.category_name}`;
       categoriesContainer.appendChild(list);
    });
}

newsDataLoad()

document.getElementById('show-all-categories').addEventListener('click',function(even){
    console.log(even.target.innerText)
})




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