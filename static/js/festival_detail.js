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
    const recruit = document.getElementById("festival_join");
    const image = document.getElementById("festival_image");
  
    title.innerText = article.festival_title;
    desc.innerText = article.festival_desc;
    period.innerText = article.festival_start+" ~ "+article.festival_end
    address.innerText = article.festival_region+" || "+article.festival_address
    price.innerText = article.festival_cost;

    image.setAttribute("src", `${article.festival_image}`)

    recruit.setAttribute("onclick", `location.href='/templates/create_content.html?festival_article_id=${festival_article_id}'`);

    temp_html = `<i class="fa fa-bookmark-o bookmark${festival_article_id}" style="font-size:32px " onclick="article_bookmark(${festival_article_id})"></i>`
   
    $('#abc').append(temp_html)

    let bookmarks = article.bookmarks
    console.log(bookmarks)
    // 북마크
    let now_user_id = parseJwt('access').user_id
    console.log(now_user_id)

    let bookmark_user_id = `${bookmarks[0].bookmark_user}`
    bookmark_user_id = parseInt(bookmark_user_id.slice(0, 3))
    console.log(bookmark_user_id)

    let article_id = `${festival_article_id}`
    article_id = parseInt(article_id.slice(0, 3))
    console.log(article_id)

    let bookmark_article_id = `${bookmarks[0].bookmark_festival}`
    bookmark_article_id = parseInt(bookmark_article_id.slice(0, 3))
    console.log(bookmark_article_id)

    if (now_user_id == bookmark_user_id && article_id == bookmark_article_id) {
        // $(".클래스 이름").attr("class","변경 할 클래스명");
        console.log("dfdfskhfkshfkshfk")
        $(`.bookmark${festival_article_id}`).css("color", "#FA5882");
        $(`.bookmark${festival_article_id}`).addClass("fa-bookmark");
        $(`.bookmark${festival_article_id}`).removeClass("fa-bookmark-o");
    }
}

// 로그인한 user.id 찾는 함수 //
function parseJwt(token) {
    var base64Url = localStorage.getItem("access").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(
        function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

    return JSON.parse(jsonPayload);
};

// 북마크
async function article_bookmark(festival_article_id) {
    const bookmarkData = {
        "bookmark_festival": festival_article_id,
    }
    const response = await fetch(`${backend_base_url}/articles/festival/${festival_article_id}/bookmark/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify(bookmarkData)
    })

    // response_json = await response.json()

    if (response.status == 200) {
        alert("북마크가 되었습니다!")
        window.location.reload()
        return response
    } else if(response.status == 204) {
        alert("북마크가 취소되었습니다!")
        window.location.reload()
    }
}

loadDetailArticles(festival_article_id);