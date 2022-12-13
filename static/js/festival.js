

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
// const scrollButton = document.querySelector(".scroll-top");
// scrollButton.addEventListener("click", () => {
//     window.scrollTo(0, 0);
// });

// 팝업창
function openPopup2(){
  window.open("http://127.0.0.1:5500/templates/join_page.html", "new", "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=1200, height=750, left=600, top=100" );
  // newWindow.onload = function (newWindow) {
    // newWindow.console.log("...something...");
  }
// }

// var newWindow = window.open("url");
// newWindow.onload = function (newWindow) {
//   newWindow.console.log("...something...");
// }

/////////////////////////////////////////////////////////////////////////////////////////////
  