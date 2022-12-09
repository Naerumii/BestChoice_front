// postNote = function() {
//     var myDiv = document.getElementById("noteCommentBox"),  //댓글 입력창+버튼 합친 영역
//         msgBox = document.getElementById("myNote"),  //댓글 입력창
//         message = '<div class="text-holder"><div class="feed-description"><span id="note_Note_Content">' + escapeHTML(msgBox.value)  + '</span><div class="feed-by">from <span id="note_Created_By">' + 'get_current_user_displayname' + '</span> at <span id="note_Created_Time">'+ Date.now() + '</span></div></div></div>';
//     myDiv.insertAdjacentHTML('afterend', '<div id="feed-item">' + message + '</div>');
// },

// escapeHTML = function(input) {
//     return input
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// },

// initEvents = function() {
//     var sendBttn = document.getElementById("send");
//     sendBttn.addEventListener("click", function() {
//     postNote();
//     });
// };

// document.addEventListener("DOMContentLoaded", initEvents);

////////////댓글작성///////////////////////////////////////////////////////
async function writeComment() {
    const myNote = document.getElementById("myNote");
    const comment = await postComment(article_id, myNote.value);
    loadDetailArticles(article_id);
    myNote.value = "";
}

// 댓글 작성 //
async function postComment(article_id, myNote) {
    const commentData = {
    content: myNote,
    };
    const response = await fetch(
    `${backend_base_url}/articles/${article_id}/comment/`,
    {
        headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: JSON.stringify(commentData),
    }
    );

    if (response.status == 200) {
    return response;
    } else {
    alert(response.status);
    }
}

// 댓글 삭제 //
async function delete_comment(article_id, id) {
    const response = await fetch(
    `${backend_base_url}/articles/${article_id}/comment/${id}`,
    {
        headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    }
    );

    if (response.status == 204) {
    window.location.reload(
        `${frontend_base_url}/templates/detail_page.html?id=${article_id}`
    );
    } else {
    alert("댓글 작성자만 삭제 가능합니다.");
    }
}
