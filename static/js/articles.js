// 자동 함수 실행
// 게시물 로드하기
async function loadArticles() {
    $("#article_container").empty();  //초기화 버튼을 위해 기존에 있던 card 모두 제거
    $("input:checkbox[name='region']").prop("checked", false);  //초기화 버튼을 위해 모든 체크 해제
    articles = await getArticles();

    if (articles.length > 0) {
        for (let i=0; i < articles.length; i++) {
            get_festivals_html(
                articles[i].pk,
                articles[i].festival_title,
                articles[i].festival_image,
                articles[i].festival_desc
            )
        }
    }

    article_pagination();
};

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

//검색한 옵션에 대한 게시물 가져오기(조건)
async function searchArticle() {
    $("#article_container").empty(); //기존 내용 다 지우기

    //옵션 체크되어있는 것 확인
    let obj_length = document.getElementsByName("region").length;
    let search_list = [];

    for (let i=0; i<obj_length; i++) {
        if(document.getElementsByName("region")[i].checked == true) {
            search_list.push(parseInt(document.getElementsByName("region")[i].value));
        }
    }
    console.log(search_list);

    //옵션 url로 변환
    let option_param = ""
    for (let i=0; i<search_list.length; i++) {
        if (search_list[i] != undefined) {
            option_param += "param=" + search_list[i] + "&"
        }
    }
    console.log(option_param)

    //back에 해당 url로 request
    const response = await fetch(`${backend_base_url}/articles/festival/filter/`+ "?" +option_param, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "GET",
    });
    response_json = await response.json();
    console.log(response_json)

    //검색 결과 각 요소에 대해 함수 실행
    if (response_json.length > 0) {
        for (let i=0; i < response_json.length; i++) {
            get_festivals_html(
                response_json[i].pk,
                response_json[i].festival_title,
                response_json[i].festival_image,
                response_json[i].festival_desc
            )
        }
    }

    article_pagination();
}

// 축제 검색 결과 html로 이어붙이기 (옵션 버튼 사용)
function get_festivals_html(pk, title, image, desc) {
    temp_html = `<div class="list-item">
                    <div class="post">
                        <div class="post-child post-left">
                            <img src="${image}" title="${title}" width="200" height="400"">
                        </div>
                        <div class="post-child post-right">
                            <h1>${title}</h1>
                            <hr>
                            <div class="desc-ellipsis">${desc}</div>
                            <button onclick="location.href='/templates/festival_detail.html?festival_article_id=${pk}'">&#x21e2;</button>
                        </div>
                    </div>
                </div>`
    $("#article_container").append(temp_html);
}

//이어붙인 Festival_Article에 대한 페이징
function article_pagination() {
    //card가 새로워졌기 때문에 paging 다시 실행
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
};

// 함수 실행
loadArticles();