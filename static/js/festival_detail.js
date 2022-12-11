const urlParams = new URLSearchParams(window.location.search);
const festival_article_id = urlParams.get("festival_article_id");

// 특정 게시물 back에서 받아오는 함수
async function getArticleDetail(festival_article_id) {
    const response = await fetch(`${backend_base_url}/articles/festival/${festival_article_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
    });
    response_json = await response.json();
    console.log(response_json);
    // 받아온 값을 json화 시키고 콘솔로그 확인
    // getArticleDetail() 안에 article_id 써주고, article_detail.js에도 getArticleDetail(article_id);실행
  
    return response_json;
}

// back에서 받아온 json 데이터 front에 내용 붙이는 함수
async function loadDetailArticles(festival_article_id) {
    article = await getArticleDetail(festival_article_id);

    //프론트엔드에서 태그 id 확인하기
    const title = document.getElementById("festival_title");
    const desc = document.getElementById("festival_desc");
    const period = document.getElementById("festival_period");
    const address = document.getElementById("festival_address");
    const price = document.getElementById("festival_price");
  
    title.innerText = article.festival_title;
    desc.innerText = article.festival_desc;
    period.innerText = article.festival_start+" ~ "+article.festival_end
    address.innerText = article.festival_region+" || "+article.festival_address
    price.innerText = article.festival_cost;
  
  }

  loadDetailArticles(festival_article_id);