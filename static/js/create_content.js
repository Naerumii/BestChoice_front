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
    // 받아온 값을 json화 시키고 콘솔로그 확인
    // getArticleDetail() 안에 article_id 써주고, article_detail.js에도 getArticleDetail(article_id);실행
  
    return response_json;
}

// back에서 받아온 json 데이터 front에 내용 붙이는 함수
async function loadDetailArticles(festival_article_id) {
    article = await getArticleDetail(festival_article_id);


    //프론트엔드에서 태그 id 확인하기
    const title = document.getElementById("festival_title");
    let searchForm = $("#searchForm");
    const join_count = searchForm.find("option:selected").val();
    const join_title = document.getElementById("join_title").value;
    const join_content = document.getElementById("join_content").value;
    const join_donedate = document.getElementById("join_donedate").value;
    
    //축제타이틀 html에 넣어놓기
    title.innerText = article.festival_title;
    
    const articleBtn = document.getElementById("upload_btn");
    articleBtn.setAttribute("onclick", `createJoinArticle(${article.pk})`);

    //모집하기, 삭제하기 버튼 숨기기
    $("#modify_btn").hide();
    $("#delete_btn").hide();

}

async function createJoinArticle(festival_article_id) {
    article = await getArticleDetail(festival_article_id);


    //프론트엔드에서 태그 id 확인하기
    // const title = document.getElementById("festival_title").innerText;
    let searchForm = $("#searchForm");
    const join_count = searchForm.find("option:selected").val();
    const join_title = document.getElementById("join_title").value;
    const join_content = document.getElementById("join_content").value;
    const join_donedate = document.getElementById("join_donedate").value;

    const data = {
        join_title: join_title,
        join_count: join_count,
        join_desc: join_content,
        join_period: join_donedate,
    }


    const response = await fetch(`http://127.0.0.1:8000/articles/festival/${festival_article_id}/createjoin/`, {

        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: JSON.stringify(data),
    });

    if (response.status == 200) {
        alert("게시물 등록");
        window.location.replace("http://127.0.0.1:5500/templates/festival.html");
    } else {
        alert(response.status)
    }
}

loadDetailArticles(festival_article_id)