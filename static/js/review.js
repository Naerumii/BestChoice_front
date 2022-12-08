
//댓글 - 드롭다운 신고 버튼
function openToc1() {
    document.getElementById('more1').classList.toggle('xx');
}

function openToc2() {
    document.getElementById('more2').classList.toggle('xx');
}


// 페이지네이션
// 페이지네이션
// 페이지네이션

// jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/
var items = $("#p_wrapper #p_item");
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