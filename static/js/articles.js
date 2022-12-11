// 자동 함수 실행
// 게시물 로드하기
$(document).ready(async function loadArticles() {
    articles = await getArticles();
    console.log(articles);
    const article_list = document.getElementById("article_container");
  
    articles.forEach((article) => {
        console.log(article);
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");

        const newArticle = document.createElement("div");
        newArticle.classList.add("post");
        console.log(article.pk);
        
        const innerArticle = document.createElement("div");
        innerArticle.classList.add("post-child", "post-left");

        const articleImage = document.createElement("img");
        articleImage.setAttribute("src", `${article.festival_image}`);
        articleImage.setAttribute("title", `${article.festival_title}`);

        const articleInfo = document.createElement("div");
        articleInfo.classList.add("post-child", "post-right");

        const bodyTitle = document.createElement("h3");
        bodyTitle.innerText = article.festival_title;
        const bodyLine = document.createElement("hr");
        const bodyDesc = document.createElement("p");
        bodyDesc.innerText = article.festival_desc;
        const bodyBtn = document.createElement("button");
        bodyBtn.innerHTML = "&#x21e2";
        bodyBtn.setAttribute("onclick", `location.href='/templates/festival_detail.html?festival_article_id=${article.pk}'`)


        // articleBtn.setAttribute("id", article.pk);
        // articleBtn.setAttribute("onclick", "articleDetail(this.id)");
        articleInfo.appendChild(bodyTitle);
        articleInfo.appendChild(bodyLine);
        articleInfo.appendChild(bodyDesc);
        articleInfo.appendChild(bodyBtn);
        innerArticle.appendChild(articleImage);
        newArticle.appendChild(innerArticle);
        newArticle.appendChild(articleInfo);
        listItem.appendChild(newArticle);
        article_list.appendChild(listItem);
    });

    var items = $(".list-wrapper .list-item");
    var numItems = items.length;
    var perPage = 5;
    console.log("festival.js")

    items.slice(perPage).hide();

    $('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
});

//게시물 가져오기(전부)
async function getArticles() {
    const response = await fetch(`${backend_base_url}/articles/festival/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}