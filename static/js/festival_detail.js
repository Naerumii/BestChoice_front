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

    // 현재 사용자가 누구인지
    let now_user_id = parseJwt('access').user_id

    // 현재 축제게시글에 대한 북마크 정보
    let bookmarks = article.bookmarks

    if (bookmarks.length > 0) {
        for(let i=0; i <bookmarks.length; i++) {
            if(now_user_id == bookmarks[i].bookmark_user) {
                $(`.bookmark${festival_article_id}`).css("color", "#FA5882");
                $(`.bookmark${festival_article_id}`).addClass("fa-bookmark");
                $(`.bookmark${festival_article_id}`).removeClass("fa-bookmark-o");
                break;
            }
        }
    }
}


loadDetailArticles(festival_article_id);