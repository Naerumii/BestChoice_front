const urlParams = new URLSearchParams(window.location.search);
const festival_article_id = urlParams.get("festival_article_id");


// back에서 받아온 json 데이터 front에 내용 붙이는 함수
async function loadDetailArticles(festival_article_id) {
    article = await getFestivalDetail(festival_article_id);

    //프론트엔드에서 태그 id 확인하기
    const title = document.getElementById("festival_title");
    const desc = document.getElementById("festival_desc");
    const period = document.getElementById("festival_period");
    const address = document.getElementById("festival_address");
    const price = document.getElementById("festival_price");
    const recruit = document.getElementById("festival_join");
    const image = document.getElementById("festival_image");
  
    title.innerText = article.festival_title;
    desc.innerText = article.festival_desc;
    period.innerText = article.festival_start+" ~ "+article.festival_end
    address.innerText = article.festival_region+" || "+article.festival_address
    price.innerText = article.festival_cost;

    image.setAttribute("src", `${article.festival_image}`)

    recruit.setAttribute("onclick", `location.href='/templates/join_create.html?festival_article_id=${festival_article_id}'`);

    temp_html = `<i class="fa fa-bookmark-o bookmark${festival_article_id}" style="font-size:32px " onclick="postFestivalBookmark(${festival_article_id})"></i>`
   
    $('#abc').append(temp_html)

    let bookmarks = article.bookmarks
    // 북마크
    let now_user_id = parseJwt('access').user_id

    let bookmark_user_id = `${bookmarks[0].bookmark_user}`
    bookmark_user_id = parseInt(bookmark_user_id.slice(0, 3))

    let article_id = `${festival_article_id}`
    article_id = parseInt(article_id.slice(0, 3))

    let bookmark_article_id = `${bookmarks[0].bookmark_festival}`
    bookmark_article_id = parseInt(bookmark_article_id.slice(0, 3))

    if (now_user_id == bookmark_user_id && article_id == bookmark_article_id) {
        // $(".클래스 이름").attr("class","변경 할 클래스명");
        $(`.bookmark${festival_article_id}`).css("color", "#FA5882");
        $(`.bookmark${festival_article_id}`).addClass("fa-bookmark");
        $(`.bookmark${festival_article_id}`).removeClass("fa-bookmark-o");
    }
}


loadDetailArticles(festival_article_id);