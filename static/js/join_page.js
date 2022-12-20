const join_status_str = ["마감", "진행중"]

async function loadArticles() {
  // $("#article_container").empty();  //초기화 버튼을 위해 기존에 있던 card 모두 제거
  // $("#text1").val(''); //검색창 기존 입력 지우기

  articles = await getJoins(); //Join Article들의 객체

  if (articles.length > 0) {
    for (let i = 0; i < articles.length; i++) {
      get_join_html(
        articles[i].id,
        i+1,
        articles[i].join_festival.festival_title,
        articles[i].join_author,
        articles[i].join_period,
        articles[i].join_nowcount,
        articles[i].join_count,
        articles[i].join_hits,
        articles[i].join_status,
      );
    }
  }

  article_pagination();  //페이징 함수 실행
}

//
async function get_join_html(id, num, festival, author, period, nowcount, count, hits, status) {
  let status_str;
  if (status) {
    status_str = join_status_str[1];
  } else {
    status_str = join_status_str[0];
  }

  let temp_html = `<li class="list_item" type="button" onclick="location.href='/templates/join_detail.html?join_article_id=${id}'">
                    <ul>
                        <li>${num}</li>
                        <li class="left">${festival}</li>
                        <li>${author}</li>
                        <li>${period}</li>
                        <li>${nowcount}/${count}</li>
                        <li>${status_str}</li>
                        <li>${hits}</li>
                    </ul>
                    </li>`;
  $("#ulTable", document).append(temp_html);
}


//이어붙인 Join_Article에 대한 페이징
function article_pagination() {
  //card가 새로워졌기 때문에 paging 다시 실행
  var items = $(".list-wrapper .list-item");
  var numItems = items.length;
  var perPage = 8;

  items.slice(perPage).hide();

  $("#pagination-container").pagination({
    items: numItems,
    itemsOnPage: perPage,
    prevText: "&laquo;",
    nextText: "&raquo;",
    onPageClick: function (pageNumber) {
      var showFrom = perPage * (pageNumber - 1);
      var showTo = showFrom + perPage;
      items.hide().slice(showFrom, showTo).show();
    },
  });
}

loadArticles();
