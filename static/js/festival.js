

// const urlParams = new URLSearchParams(window.location.search);
// const festival_article_id = urlParams.get("festival_article_id");

// 페이지네이션
// 페이지네이션
// 페이지네이션

// jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/
// var items = $(".list-wrapper .list-item");
//     var numItems = items.length;
//     var perPage = 5;
//     console.log("festival.js")

//     items.slice(perPage).hide();

//     $('#pagination-container').pagination({
//         items: numItems,
//         itemsOnPage: perPage,
//         prevText: "&laquo;",
//         nextText: "&raquo;",
//         onPageClick: function (pageNumber) {
//             var showFrom = perPage * (pageNumber - 1);
//             var showTo = showFrom + perPage;
//             items.hide().slice(showFrom, showTo).show();
//         }
//     });

// 위로가기 버튼
const scrollButton = document.querySelector(".scroll-top");
scrollButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
});

// 팝업창
function openPopup2(){
  var newWindow = window.open("http://127.0.0.1:5500/templates/join_page.html", "new", "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=1200, height=750, left=600, top=100" );
  // newWindow.onload = function (newWindow) {
    loadArticles(newWindow);
    // newWindow.console.log("...something...");
  }
// }

// var newWindow = window.open("url");
// newWindow.onload = function (newWindow) {
//   newWindow.console.log("...something...");
// }

/////////////////////////////////////////////////////////////////////////////////////////////
  async function loadArticles(newWindow) {
    // $("#article_container").empty();  //초기화 버튼을 위해 기존에 있던 card 모두 제거
    // $("#text1").val(''); //검색창 기존 입력 지우기

    newWindow.console.log("1")
    newWindow.console.log("2")
    articles = await getArticles();  //Join Article들의 객체

    newWindow.console.log("3")
    newWindow.console.log("4")
    newWindow.console.log(articles)
    if (articles.length > 0) {
      newWindow.console.log("5")
        for (let i=0; i < articles.length; i++) {
          newWindow.console.log("6")
          newWindow.console.log(articles[i].id, articles[i].join_festival.festival_title, articles[i].join_author, articles[i].join_period, articles[i].join_count,)
          get_join_html(
              articles[i].id,
              articles[i].join_festival.festival_title,
              articles[i].join_author,
              articles[i].join_period,
              articles[i].join_count,
              newWindow
          )
        }
    }

    // article_pagination();  //페이징 함수 실행
};

function get_join_html(id, festival, author, peroid, count, newWindow) {
  temp_html =   `<li class="list_item" type="button" onclick="location.href='/templates/join_detail.html'">
                  <ul>
                      <li>${id}</li>
                      <li class="left">${festival}</li>
                      <li>${author}</li>
                      <li>${peroid}</li>
                      <li>${count}</li>
                      <li>999</li>
                  </ul>
                </li>`
  newWindow.console.log(temp_html);      
  $("#aaaaa").append(temp_html);  //아주아주 중요하다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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