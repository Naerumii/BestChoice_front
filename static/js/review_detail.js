const urlParams = new URLSearchParams(window.location.search);
const review_id = urlParams.get("review_id");
const user_id = parseJwt("access").user_id;


//리뷰게시글 front에 붙이는 함수
async function loadDetailReview(review_id) {
    review = await getReviewDetail(review_id);  //리뷰게시글 상세 api 호출
    const nowuser = await getProfile(user_id)

    //프론트엔드에서 태그 id 확인하기
    const title = document.getElementById("review_title");
    const desc = document.getElementById("review_desc");
    const created_at = document.getElementById("review_created_at");
    const writer = document.getElementById("review_user");
    const date = review.review_created_at.split("T")[0]
    const image = document.getElementById("review_image");
    const count = document.getElementById("review_count");
    const comment_count = document.getElementById("review_comment_count");
    
    const btnModify = document.getElementById("update_button");
    const btnDelete = document.getElementById("delete_button");

    title.innerText = review.review_title;
    desc.innerText = review.review_desc;
    writer.innerText = review.review_author;
    created_at.innerText = date;
    image.setAttribute("src", `${backend_base_url}${review.image}`);
    count.innerText = review.count;
    comment_count.innerText = review.review_comment.length;

    if(nowuser.user_nickname!=review.review_author) {  //user의 user_nickname 필드를 unique로 설정할 것!!!
      btnModify.style.visibility = "hidden";
      btnDelete.style.visibility = "hidden";
    }

    //댓글 불러오기
    $("#comment_box").empty();  //초기화 버튼을 위해 기존에 있던 card 모두 제거

    if (review.review_comment.length > 0) {
        for (let i=0; i < review.review_comment.length; i++) {
            get_review_comment_html(
                review.review_comment[i].review_user,
                review.review_comment[i].review_comment,
                review.review_comment[i].review_comment_created_at,
                review.review_comment[i].id,
                nowuser.user_nickname
            )
        }
    }
}


//리뷰게시물 댓글 html로 붙이기
function get_review_comment_html(user, comment, created_at, id, nickname) {
  console.log(user)
  if (user==nickname) {
    temp_html = `<li class="flex-box">
                    <div class="user-text">
                        <p id="review_comment_user">${user}</p>
                        <div id="comment_box_${id}">
                          <p id="review_comment_${id}">${comment}</p>
                        </div>
                        <small id="review_date" class="gray-text">${created_at.split("T")[0]} ${created_at.split("T")[1].split(".")[0]}</small>
                    </div>
                    <div id="button_box_${id}">
                        <a href="#" id="update_button_${id}" type="button" onclick="editReviewCommentEvent(${id})">수정</a>
                        <a href="#" type="button" onclick="deleteReviewComment(${id})">삭제</a>
                    </div>
                  </li>`
  } else {
    temp_html = `<li class="flex-box">
                    <div class="user-text">
                        <p id="review_comment_user">${user}</p>
                        <div id="comment_box_${id}">
                          <p id="review_comment_${id}">${comment}</p>
                        </div>
                        <small id="review_date" class="gray-text">${created_at.split("T")[0]} ${created_at.split("T")[1].split(".")[0]}</small>
                    </div>
                  </li>`
  }
    $("#comment_box").append(temp_html);
}


//리뷰게시글 수정하기 버튼 클릭 시 동작하는 함수(입력란 생성)
function editReviewEvent() {
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
  update_button.setAttribute("onclick", "appendReviewHtml()");  //클릭시 update_Review 함수 실행
}


// 리뷰 수정한 내용을 다시 front에 붙여주는 함수
async function appendReviewHtml() {
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

  update_button.setAttribute("onclick", "editReviewEvent()");

  loadDetailReview(review_id); // 다시 한 번. 맨 위의 함수 실행
}


// 리뷰 댓글 작성 버튼 함수
async function writeReviewCommentEvent() {
    const comment_text = document.getElementById("comment_text");
    const comment = await postReviewComment(review_id, comment_text.value);
    loadDetailReview(review_id);
    comment_text.value = "";
  }


// 리뷰 댓글 수정하기 버튼 클릭 시 동작하는 함수(입력란 생성)
function editReviewCommentEvent(id) {
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
    comment_button.innerText = "수정";


    
    const update_button = document.getElementById(`button_box_${id}`);
    update_button.insertBefore(comment_button, updateBtn);
    comment_button.setAttribute("onclick", `putReviewComment(${id})`);
}
    

function openToc() {
    document.getElementById('more1').classList.toggle('xx');
}


loadDetailReview(review_id);