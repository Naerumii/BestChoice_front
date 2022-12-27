//모집하기 버튼 클릭 시 열리는 팝업창
function openPopup2(){
  window.open("./join_page.html", "new", "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=1200, height=750, left=600, top=100" );
}
  

//전체 게시물 로드하기
async function loadArticles() {

  articles = await getFestivals();

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

  article_pagination();  //페이징 함수 실행
};


//초기화 버튼 눌렀을 때 실행되는 함수
async function initArticles() {
  $("#article_container").empty();  //초기화 버튼을 위해 기존에 있던 card 모두 제거
  $("#text1").val(''); //검색창 기존 입력 지우기
  $("#selSearchOption").val("A").prop("selected", true);

   //옵션 체크되어있는 것 확인 -> 옵션풀기
   let obj_length = document.getElementsByName("region").length;

   for (let i=0; i<obj_length; i++) {
       document.getElementsByName("region")[i].checked = false;
  }

  // 함수 실행
  await loadArticles();
}


//적용하기 버튼 눌렀을 때 검색한 지역 옵션에 대한 게시물 가져오기
async function searchArticle() {
  $("#article_container").empty(); //기존 내용 다 지우기
  $("#text1").val(''); //검색창 기존 입력 지우기
  $("#selSearchOption").val("A").prop("selected", true);

  //옵션 체크되어있는 것 확인
  let obj_length = document.getElementsByName("region").length;
  let search_list = [];

  for (let i=0; i<obj_length; i++) {
      if(document.getElementsByName("region")[i].checked == true) {
          search_list.push(parseInt(document.getElementsByName("region")[i].value));
      }
  }

  let option_param = changeOptionUrl(search_list);

  articles = await getFestivalFilter(option_param);  //조건 필터링 함수 실행

   //검색 결과 각 요소에 대해 함수 실행
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
}

function searchkey() {
    if (window.event.keyCode == 13) {

         // 엔터키가 눌렸을 때 실행할 내용
         searchBox();
    }
  }

//검색창에서 검색한 축제게시글 찾기(입력란)
async function searchBox() {
  let searchForm = $("#searchForm");
  let searchCategory = searchForm.find("option:selected").val();  //A or T or C
  let searchWord = searchForm.find("input[id='text1']").val();  //검색어
  let search_list = [];

  if (!searchWord) {
      swal("검색어를 입력하세요")
      return false;
  }

  $("#article_container").empty(); //기존 내용 다 지우기
  //옵션 체크되어있는 것 확인 -> 옵션풀기
  let obj_length = document.getElementsByName("region").length;

  for (let i=0; i<obj_length; i++) {
      document.getElementsByName("region")[i].checked = false;
 }
  search_list.push(searchCategory);
  search_list.push(searchWord);

  let option_param = changeOptionUrl(search_list);

  articles = await getFestivalFilter(option_param);  //조건 필터링 함수 실행

   //검색 결과 각 요소에 대해 함수 실행
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

  article_pagination();  //페이징 함수 실행
}


//축제 검색 결과 html로 이어붙이기 (옵션 버튼 사용)
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
                            <button onclick="location.href='./festival_detail.html?festival_article_id=${pk}'">&#x21e2;</button>
                        </div>
                    </div>
                </div>`
    $("#article_container").append(temp_html);
  }


//이어붙인 Festival_Article에 대한 페이지네이션
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

// 함수 실행
loadArticles();