const urlParams = new URLSearchParams(window.location.search);
const festival_article_id = urlParams.get("festival_article_id");


// back에서 받아온 json 데이터 front에 내용 붙이는 함수
async function loadDetailArticles(festival_article_id) {
    article = await getFestivalDetail(festival_article_id);


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
    articleBtn.setAttribute("onclick", `postJoin(${article.pk})`);

    //모집하기, 삭제하기 버튼 숨기기
    $("#modify_btn").hide();
    $("#delete_btn").hide();

}


loadDetailArticles(festival_article_id)