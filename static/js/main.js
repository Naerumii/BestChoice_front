// 자동 함수 실행
// 게시물 로드하기
$(document).ready(async function loadArticles() {
    articles = await getArticles();
    console.log(articles);
    const article_list = document.getElementById("article_container");
  
    articles.forEach((article) => {
        console.log(article);
        const newArticle = document.createElement("div");
        newArticle.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3");
        console.log(article.pk);
        
        const articleLink = document.createElement("a");
        articleLink.classList.add("course");
        articleLink.setAttribute("href", "#")

        const articleImage = document.createElement("img");
        articleImage.classList.add("course-img")
        articleImage.setAttribute("src", `${article.festival_image}`);
        articleImage.setAttribute("width", "100%");
        articleImage.setAttribute("height", "200");


        const articleBody = document.createElement("div");
        articleBody.classList.add("info")

        const bodyTitle = document.createElement("h4");
        bodyTitle.innerHTML = article.festival_title;
        const bodyAddress = document.createElement("div");
        bodyAddress.classList.add("lecturer");
        const bodyFooter = document.createElement("img");
        bodyFooter.setAttribute("src", "https://i.postimg.cc/FKKK3PpN/image.png");
        bodyFooter.setAttribute("width", "15");
        bodyFooter.setAttribute("height", "15");

        const FooterStr = document.createElement("span");
        FooterStr.classList.add("name");
        FooterStr.innerText = article.festival_region


        // articleBtn.setAttribute("id", article.pk);
        // articleBtn.setAttribute("onclick", "articleDetail(this.id)");

        bodyAddress.appendChild(bodyFooter);
        bodyAddress.appendChild(FooterStr);
        articleBody.appendChild(bodyTitle);
        articleBody.appendChild(bodyAddress);
        articleLink.appendChild(articleImage);
        articleLink.appendChild(articleBody);
        newArticle.appendChild(articleLink);
        article_list.appendChild(newArticle);
    });
});

//게시물 가져오기(전부)
async function getArticles() {
    const response = await fetch(`${backend_base_url}/articles/recommend/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}