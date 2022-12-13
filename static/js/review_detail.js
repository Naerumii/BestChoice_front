const urlParams = new URLSearchParams(window.location.search);
const review_id = urlParams.get("review_id");

// 특정 리뷰를 back에서 받아오는 함수
async function getReviewDetail(review_id) {
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
    });
    response_json = await response.json();
  
    return response_json;
}

// back에서 받아온 json 데이터 front에 내용 붙이는 함수
async function loadDetailReview(review_id) {
    review = await getReviewDetail(review_id);

    //프론트엔드에서 태그 id 확인하기
    const title = document.getElementById("review_title");
    const desc = document.getElementById("review_desc");
    const created_at = document.getElementById("review_created_at");
    const date = review.review_created_at.split("T")[0]
    const image = document.getElementById("review_image");
    const count = document.getElementById("review_count");
    const comment_count = document.getElementById("review_comment_count");
    
    title.innerText = review.review_title;
    desc.innerText = review.review_desc;
    created_at.innerText = date;
    image.setAttribute("src", `${backend_base_url}${review.image}`);
    count.innerText = review.count;
    comment_count.innerText = review.review_comment.length;


    //댓글 불러오기
    $("#comment_box").empty();  //초기화 버튼을 위해 기존에 있던 card 모두 제거

    if (review.review_comment.length > 0) {
        for (let i=0; i < review.review_comment.length; i++) {
            get_review_comment_html(
                review.review_comment[i].review_user,
                review.review_comment[i].review_comment,
                review.review_comment[i].review_comment_created_at,
                review.review_comment[i].id,
            )
        }
    }
}

function get_review_comment_html(user, comment, created_at, id) {
    temp_html = `<li class="flex-box">
                    <div class="user-text">
                        <p id="review_comment_user">${user}</p>
                        <div id="comment_box_${id}">
                          <p id="review_comment_${id}">${comment}</p>
                        </div>
                        <small id="review_date" class="gray-text">${created_at.split("T")[0]} ${created_at.split("T")[1].split(".")[0]}</small>
                    </div>
                    <div id="button_box_${id}">
                        <a href="#" id="update_button_${id}" type="button" onclick="commentupdate(${id})">수정</a>
                        <a href="#" type="button" onclick="commentdelete(${id})">삭제</a>
                    </div>
                    </li>`
    $("#comment_box").append(temp_html);
}

// 게시글 수정하기 버튼 클릭 시 동작하는 함수
function updateReview() {
  const review_title = document.getElementById("review_title");
  const review_desc = document.getElementById("review_desc");
  review_title.style.visibility = "hidden";
  review_desc.style.visibility = "hidden";

  const input_title = document.createElement("textarea"); // 수정할 수 있는 입력창만들기
  input_title.setAttribute("id", "input_title");
  input_title.classList.add("input_title_style"); // title 수정 입력창의 class -> detail.page.css에서 꾸미면 됨
  input_title.innerText = review_title.innerHTML; // 원래 있던 값 일단 보여주기, 안하면 공란처리됨

  const input_desc = document.createElement("textarea"); // 수정할 수 있는 입력창만들기 title,content 둘다 해줘야함. 안그러면 안생김
  input_desc.setAttribute("id", "input_desc");
  input_desc.classList.add("input_desc_style"); // content 수정 입력창의 class -> detail.page.css에서 꾸미면 됨
  input_desc.innerText = review_desc.innerHTML; // 안하면 공란처리됨
  input_desc.rows = 3;

  const body1 = document.getElementById("title_box");
  const body2 = document.getElementById("review_content");
  body1.insertBefore(input_title, review_title); //기존 부분을 입력란으로 교체
  body2.insertBefore(input_desc, review_desc);

  const update_button = document.getElementById("update_button"); //업데이트 버튼 요소 가져오기
  update_button.setAttribute("onclick", "update_Review()");  //클릭시 update_Review 함수 실행
}

// 리뷰 수정한 내용을 다시 front에 붙여주는 함수
async function update_Review() {
  let input_title = document.getElementById("input_title");
  let input_desc = document.getElementById("input_desc");

  const re_review = await patchReview(
    review_id,
    input_title.value,
    input_desc.value
  );

  input_title.remove();
  input_desc.remove(); // 수정하기 눌러서 기존 내용없애주기.

  const review_title = document.getElementById("review_title"); // review_title.style.visibility = "hidden"으로 없애놨으니까
  const review_desc = document.getElementById("review_desc"); // 불러와서
  review_title.style.visibility = "visible"; // 다시 보이게 !
  review_desc.style.visibility = "visible";

  update_button.setAttribute("onclick", "updateReview()");

  loadDetailReview(review_id); // 다시 한 번. 맨 위의 함수 실행
}

//게시글 수정 내용 back에 보내 저장하는 메서드
async function patchReview(review_id, review_title, review_desc) {
  const ReviewData = {
    review_title: review_title,
    review_desc: review_desc,
  };
  console.log(review_id);
  const response = await fetch(`${backend_base_url}/articles/review/${review_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PATCH",
    body: JSON.stringify(ReviewData),
  });

  if (response.status == 200) {
    response_json = await response.json();
    alert("게시물이 수정되었습니다.")
    return response_json;
  } else {
    alert(response.status);
  }
}

  // 게시글 삭제
  async function deleteReview(review_id) {
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access")
      },
      method: "DELETE"
    })
  
    if (response.status == 204) {
      alert("게시물이 삭제되었습니다.")
      window.location.replace(`${frontend_base_url}/templates/review.html`)
    } else {
      alert("게시물 작성자만 삭제 가능합니다.")
    }
  }


//댓글 삭제 기능
async function commentdelete(id) {
    console.log("하염")
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/comment/${id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "DELETE",
    });

    if (response.status == 204) {
        alert("댓글이 삭제되었습니다.")
        window.location.reload(
            `${frontend_base_url}/templates/review_detail.html?id=${review_id}`
        );
    } else {
        alert(response.status);
    }
}

// 리뷰 댓글 작성
async function writeComment() {
    const comment_text = document.getElementById("comment_text");
    const comment = await postComment(review_id, comment_text.value);
    loadDetailReview(review_id);
    comment_text.value = "";
  }

// 댓글 작성 //
async function postComment(review_id, comment_text) {
    const commentData = {
      review_comment: comment_text,
    };
    const response = await fetch(
      `${backend_base_url}/articles/review/${review_id}/comment/`,
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

// 댓글 수정하기 버튼 클릭 시 동작하는 함수
function commentupdate(id) {
    const comment = document.getElementById(`review_comment_${id}`);
    const updateBtn = document.getElementById(`update_button_${id}`);
    comment.style.visibility = "hidden";
    updateBtn.style.visibility = "hidden";

    const input_comment = document.createElement("textarea"); // 수정할 수 있는 입력창만들기
    input_comment.setAttribute("id", `input_comment_${id}`);
    input_comment.classList.add("input_comment_style");
    input_comment.innerText = comment.innerHTML; // 안하면 공란처리됨
    
    const insertcomment = document.getElementById(`comment_box_${id}`);
    insertcomment.insertBefore(input_comment, comment); //기존 부분을 입력란으로 교체

    const comment_button = document.createElement("a"); //수정 버튼 자리에 작성 버튼 생성
    comment_button.setAttribute("href", "#");
    comment_button.setAttribute("type", "button");
    comment_button.setAttribute("id", `cmp_button_${id}`);
    comment_button.innerText = "작성";


    
    const update_button = document.getElementById(`button_box_${id}`);
    update_button.insertBefore(comment_button, updateBtn);
    comment_button.setAttribute("onclick", `updateArticle(${id})`);
}


// 수정한 댓글 작성 버튼 클릭 시 동작하는 함수
async function updateArticle(id) {    
    const comment_retext = document.getElementById(`input_comment_${id}`).value;
    const commentReData = {
      review_comment: comment_retext,
    }   
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/comment/${id}/`, {
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
                `${frontend_base_url}/templates/review_detail.html?id=${review_id}`
            );
        } else {
            alert(response.status);
        }
    }
    

function openToc() {
    document.getElementById('more1').classList.toggle('xx');
}


loadDetailReview(review_id);