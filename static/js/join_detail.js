const urlParams = new URLSearchParams(window.location.search);
const join_article_id = urlParams.get("join_article_id");

// 특정 게시물 back에서 받아오는 함수
async function getArticleDetail(join_article_id) {
    console.log(12)
    console.log(12)
    console.log(join_article_id)
    const response = await fetch(`http://127.0.0.1:8000/articles/festival/join/${join_article_id}/`, {
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
async function loadDetailArticles(join_article_id) {
    article = await getArticleDetail(join_article_id);
console.log(12)
    //프론트엔드에서 태그 id 확인하기
    const festival = document.getElementById("join_detail_festival");
    const title = document.getElementById("join_detail_title");
    const desc = document.getElementById("join_detail_desc");
    const period = document.getElementById("join_detail_period");
    const count = document.getElementById("join_detail_count");
    // const recruit = document.getElementById("join_detail");
    console.log(1333)
    festival.innerText = article.join_festival;
    title.innerText = article.join_title;
    desc.innerText = article.join_desc;
    period.innerText = article.join_period;
    count.innerText = article.join_count;

    // recruit.setAttribute("onclick", `location.href='/templates/create_content.html?festival_article_id=${festival_article_id}'`);
}

loadDetailArticles(join_article_id);