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
    const comment = await postComment(join_article_id, myNote.value);
    loadDetailArticles(join_article_id);
    myNote.value = "";
}

// 댓글 백엔드로 전송 //
async function postComment(join_article_id, myNote) {
    const commentData = {
        comment_content: myNote,
    };
    const response = await fetch(
    `${backend_base_url}/articles/festival/join/${join_article_id}/comment/`,
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
    alert("댓글을 입력하세요");
    }
}

// 댓글 삭제 //
// async function delete_comment(join_article_id, comment_id) {
//     const response = await fetch(
//     `${backend_base_url}/articles/festival/join/${join_article_id}/comment/${comment_id}`,
//     {
//         headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("access"),
//         },
//         method: "DELETE",
//     }
//     );

//     if (response.status == 204) {
//         alert("댓글이 삭제되었습니다.")
//     window.location.reload(
//         `${frontend_base_url}/templates/detail_page.html?id=${join_article_id}`
//     );
//     } else {
//     alert("댓글 작성자만 삭제 가능합니다.");
//     }
// }

//댓글 삭제 기능
async function delete_comment(id) {
    const response = await fetch(`${backend_base_url}/articles/festival/join/${join_article_id}/comment/${id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "DELETE",
    });

    if (response.status == 204) {
        alert("댓글이 삭제되었습니다.")
        window.location.reload(
            `${frontend_base_url}/templates/join_detail.html?id=${join_article_id}`
        );
    } else {
        alert("댓글 작성자만 삭제 가능합니다.");
    }
}

// 댓글 수정하기 버튼 클릭 시 동작하는 함수
function commentupdate(id) {
    const comment = document.getElementById(`join_comment_${id}`);
    const updateBtn = document.getElementById(`join_update_button_${id}`);
    comment.style.visibility = "hidden";
    updateBtn.style.visibility = "hidden";

    const input_comment = document.createElement("textarea"); // 수정할 수 있는 입력창만들기
    input_comment.setAttribute("id", `join_input_comment_${id}`);
    input_comment.classList.add("join_input_comment_style");
    input_comment.innerText = comment.innerHTML; // 안하면 공란처리됨
    
    const insertcomment = document.getElementById(`join_comment_box_${id}`);
    insertcomment.insertBefore(input_comment, comment); //기존 부분을 입력란으로 교체

    const comment_button = document.createElement("a"); //수정 버튼 자리에 작성 버튼 생성
    comment_button.setAttribute("href", "#");
    comment_button.setAttribute("type", "button");
    comment_button.setAttribute("id", `join_cmp_button_${id}`);
    comment_button.innerText = "수정";


    
    const update_button = document.getElementById(`join_button_box_${id}`);
    update_button.insertBefore(comment_button, updateBtn);
    comment_button.setAttribute("onclick", `updateArticle(${id})`);
}


// 수정한 댓글 작성 버튼 클릭 시 동작하는 함수
async function updateArticle(id) {    
    const comment_retext = document.getElementById(`join_input_comment_${id}`).value;
    const commentReData = {
        comment_content: comment_retext,
    }   
    const response = await fetch(`${backend_base_url}/articles/festival/join/${join_article_id}/comment/${id}/`, {
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },    
            method: "PUT",
            body: JSON.stringify(commentReData),
        });
    
        if (response.status == 200) {
            alert("댓글이 수정되었습니다.")
            window.location.reload(
                `${frontend_base_url}/templates/join_detail.html?id=${join_article_id}`
            );
        } else {
            alert("권한이 없습니다.");
        }
    }