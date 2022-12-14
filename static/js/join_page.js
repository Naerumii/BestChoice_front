async function loadArticles() {
    // $("#article_container").empty();  //초기화 버튼을 위해 기존에 있던 card 모두 제거
    // $("#text1").val(''); //검색창 기존 입력 지우기

    articles = await getArticles();  //Join Article들의 객체

    if (articles.length > 0) {
    for (let i=0; i < articles.length; i++) {
        get_join_html(
            articles[i].id,
            articles[i].join_festival.festival_title,
            articles[i].join_author,
            articles[i].join_period,
            articles[i].join_count,
            )
        }
    }

    // article_pagination();  //페이징 함수 실행
};

function get_join_html(id, festival, author, peroid, count) {
    let temp_html =   `<li class="list_item" type="button" onclick="location.href='/templates/join_detail.html?join_article_id=${id}'">
                    <ul>
                        <li>${id}</li>
                        <li class="left">${festival}</li>
                        <li>${author}</li>
                        <li>${peroid}</li>
                        <li>${count}</li>
                        <li>999</li>
                    </ul>
                    </li>`
    // console.log(temp_html);
    // $('ulTable').append(temp_html);
//     $(newWindow).on('load', function() {
    $('#ulTable', document).append(temp_html);
//   // $(newWindow).prop("location", location.href);
//     });
  // $("#ulTable").append(temp_html);  //아주아주 중요하다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}




//게시물 가져오기 api (전부)
async function getArticles() {
const response = await fetch(`${backend_base_url}/articles/festival/join/`, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}




//이어붙인 Festival_Article에 대한 페이징
function article_pagination() {
    //card가 새로워졌기 때문에 paging 다시 실행
    var items = $(".list-wrapper .list-item");
    var numItems = items.length;
    var perPage = 5;

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

loadArticles();