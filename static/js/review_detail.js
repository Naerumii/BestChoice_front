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
    console.log(response_json);
    // 받아온 값을 json화 시키고 콘솔로그 확인
  
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
    
    title.innerText = review.review_title;
    desc.innerText = review.review_desc;
    created_at.innerText = date;
    // image.setAttribute("src", `${backend_base_url}${article.image}`);
    count.innerText = review.count;

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
    console.log(user, comment, created_at, id)
    temp_html = `<li class="flex-box">
                    <div class="user-text">
                        <p id="review_comment_user">${user}</p>
                        <p id="review_comment">${comment}</p>
                        <small id="review_date" class="gray-text">${created_at}</small>
                    </div>
                    <div onclick="openToc1()" class="dropdown-btn">
                        <div class="drop-menu" id="more1">
                        <a href="#">수정</a>
                        <a href="#" type="button" onclick="commentdelete(${id})">삭제</a>
                        </div>
                    </div>
                    </li>`
    $("#comment_box").append(temp_html);
}

async function commentdelete(id) {
    console.log("하염")
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/comment/${id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "DELETE",
    });

    if (response.status == 204) {
        window.location.reload(
            `${frontend_base_url}/templates/review_detail.html?id=${review_id}`
        );
    } else {
        alert(response.status);
    }
}

function openToc1() {
    document.getElementById('more1').classList.toggle('xx');
}

function openToc2() {
    document.getElementById('more2').classList.toggle('xx');
}

loadDetailReview(review_id);