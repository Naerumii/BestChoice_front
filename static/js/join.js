  // 팝업창
    function openPopup(){
    window.open("http://127.0.0.1:5500/templates/create_content.html", "new", "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=500, height=850, left=700, top=250" );
}

// 페이지네이션
// 페이지네이션
// 페이지네이션

// jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/
var items = $(".list_wrapper .list_item");
var numItems = items.length;
var perPage = 8;

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