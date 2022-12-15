const backend_base_url = "http://127.0.0.1:8000";  //포트번호 변경해주세요


// 팝업창
  function openPopup1(){
    window.open("http://127.0.0.1:5500/templates/create_review.html", "new", "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=500, height=850, left=700, top=250" );
}


// //댓글 - 드롭다운 신고 버튼
// function openToc1() {
//     document.getElementById('more1').classList.toggle('xx');
// }

// function openToc2() {
//     document.getElementById('more2').classList.toggle('xx');
// }


// // 페이지네이션
// // 페이지네이션
// // 페이지네이션

// // jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/
// var items = $("#p_wrapper #p_item");
// var numItems = items.length;
// var perPage = 5;

// items.slice(perPage).hide();

// $('#pagination-container').pagination({
//     items: numItems,
//     itemsOnPage: perPage,
//     prevText: "&laquo;",
//     nextText: "&raquo;",
//     onPageClick: function (pageNumber) {
//         var showFrom = perPage * (pageNumber - 1);
//         var showTo = showFrom + perPage;
//         items.hide().slice(showFrom, showTo).show();
//     }
// });


// loadReview();

// 자동 함수 실행
//게시물 가져오기(전부)
async function getReviews() {
    const response = await fetch(`${backend_base_url}/articles/review/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}

// 게시물 로드하기
async function loadReviews() {
    $("#postlist-box").empty();  //초기화 버튼을 위해 기존에 있던 card 모두 제거
    reviews = await getReviews();

    if (reviews.length > 0) {
        for (let i=0; i < reviews.length; i++) {
            get_reviews_html(
                reviews[i].id,
                reviews[i].review_author,
                reviews[i].review_title,
                reviews[i].review_desc,
                reviews[i].image,
            )
        }
    }

    article_pagination();
};

// 리뷰 리스트 html로 이어붙이기
function get_reviews_html(id, review_author, review_title, review_desc, image) {
    temp_html = `<div class="postlist-cont" id="p_wrapper">
                    <section class="flex-box" id="p_item">
                        <div>
                            <img src="${backend_base_url}${image}" alt="">
                        </div>
                        <div>
                            <h4>${review_title}</h4>
                            <p>${review_desc}</p>
                            <small class="gray-text">${review_author}</small>
                            <button onclick="location.href='/templates/review_detail.html?review_id=${id}'">확인하기</button>
                        </div>
                    </section>
                </div>`
    $("#postlist-box").append(temp_html);
}

//이어붙인 Review_Article에 대한 페이징
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
loadReviews();

