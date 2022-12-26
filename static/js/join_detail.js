const urlParams = new URLSearchParams(window.location.search);
const join_article_id = urlParams.get("join_article_id");
const user_id = parseJwt("access").user_id;

// back에서 받아온 json 데이터 front에 내용 붙이는 함수
async function loadDetailArticles(join_article_id) {
  article = await getJoinDetail(join_article_id);
  const nowuser = await getProfile(user_id)
  
  //프론트엔드에서 태그 id 확인하기
  const festival = document.getElementById("join_detail_festival");
  const title = document.getElementById("join_detail_title");
  const desc = document.getElementById("join_detail_desc");
  const period = document.getElementById("join_detail_period");
  const count = document.getElementById("join_detail_count");
  const comment_count = document.getElementById("join_comment_count");

  const btnModify = document.getElementById("join_update");
  const btnDelete = document.getElementById("join_delete");
  const btnApply = document.getElementById("join_recruit");

  festival.innerText = article.join_festival;
  title.innerText = article.join_title;
  desc.innerText = article.join_desc;
  period.innerText = article.join_period;
  count.innerText = article.join_count;
  comment_count.innerText = article.comments.length;

  if (article.join_status == false) {
    btnModify.style.visibility = "hidden";
    btnDelete.style.visibility = "hidden";
    btnApply.style.visibility = "hidden";
  } else if (nowuser.user_nickname!=article.join_author) {  //user의 user_nickname 필드를 unique로 설정할 것!!!
    btnModify.style.visibility = "hidden";
    btnDelete.style.visibility = "hidden";
  } else {
    btnApply.style.visibility = "hidden";
  }


  //댓글 불러오기
  $("#comment_box").empty(); //초기화 버튼을 위해 기존에 있던 card 모두 제거

  if (article.comments.length > 0) {
    for (let i = 0; i < article.comments.length; i++) {
      get_join_comment_html(
        article.comments[i].comment_user,
        article.comments[i].comment_content,
        article.comments[i].comment_created_at,
        article.comments[i].id,
        nowuser.user_nickname
      );
    }
  }
}


function get_join_comment_html(user, comment, created_at, id, nickname) {
  if (user==nickname) {
    temp_html = `<br>
                  <li class="flex-box">
                        <div class="user-text">
                            <hr>
                            <p id="join_comment_user"><strong>${user}</strong></p>
                            <hr>
                            <div id="join_comment_box_${id}">
                                <p id="join_comment_${id}">${comment}</p>
                            </div>
                            
                            <small id="join_date" class="gray-text">${
                              created_at.split("T")[0]
                            } ${created_at.split("T")[1].split(".")[0]}</small>
                        </div>
                        <div id="join_button_box_${id}" class="user-text2">
                            <a href="#" id="join_update_button_${id}" type="button" onclick="editJoinCommentEvent(${id})">수정</a>
                            <a href="#" type="button" onclick="deleteJoinComment(${id})">삭제</a>
                        </div>
                  </li>`;
  } else {
    temp_html = `<br>
                  <li class="flex-box">
                        <div class="user-text">
                            <p id="join_comment_user">${user}</p>
                            <div id="join_comment_box_${id}">
                                <p id="join_comment_${id}">${comment}</p>
                            </div>
                            <small id="join_date" class="gray-text">${
                              created_at.split("T")[0]
                            } ${created_at.split("T")[1].split(".")[0]}</small>
                        </div>
                  </li>`;
  }
  $("#comment_box").append(temp_html);
}


//모집게시글 수정하기 버튼 클릭 시 동작하는 함수
function editJoinEvent() {
  const join_title = document.getElementById("join_detail_title");
  const join_desc = document.getElementById("join_detail_desc");
  const join_count = document.getElementById("join_detail_count");
  const pre_count = join_count.innerText;  //여기여기여기여기여기여기
  const join_period = document.getElementById("join_detail_period");
  const pre_period = join_period.innerText;  //여기여기여기여기여기여기
  
  join_title.style.visibility = "hidden";
  join_desc.style.visibility = "hidden";
  join_count.style.visibility = "hidden";
  join_period.style.visibility = "hidden";

  const title_update = document.createElement("textarea"); // 수정할 수 있는 입력창만들기
  title_update.setAttribute("id", "title_update");
  title_update.classList.add("title_update_style"); // title 수정 입력창의 class -> detail.page.css에서 꾸미면 됨
  title_update.innerText = join_title.innerHTML; // 원래 있던 값 일단 보여주기, 안하면 공란처리됨

  const desc_update = document.createElement("textarea"); // 수정할 수 있는 입력창만들기 title,content 둘다 해줘야함. 안그러면 안생김
  desc_update.setAttribute("id", "desc_update");
  desc_update.classList.add("input_desc_style"); // content 수정 입력창의 class -> detail.page.css에서 꾸미면 됨
  desc_update.innerText = join_desc.innerHTML; // 안하면 공란처리됨
  desc_update.rows = 3;

  const count_update = document.createElement("select");

  option1 = document.createElement("option");
  option1.setAttribute("value", "1");
  option1.innerText = "1";
  option2 = document.createElement("option");
  option2.setAttribute("value", "2");
  option2.innerText = "2";
  option3 = document.createElement("option");
  option3.setAttribute("value", "3");
  option3.innerText = "3";
  option4 = document.createElement("option");
  option4.setAttribute("value", "4");
  option4.innerText = "4";
  option5 = document.createElement("option");
  option5.setAttribute("value", "5");
  option5.innerText = "5";
  option6 = document.createElement("option");
  option6.setAttribute("value", "6");
  option6.innerText = "6";
  option7 = document.createElement("option");
  option7.setAttribute("value", "7");
  option7.innerText = "7";
  option8 = document.createElement("option");
  option8.setAttribute("value", "8");
  option8.innerText = "8";
  option9 = document.createElement("option");
  option9.setAttribute("value", "9");
  option9.innerText = "9";
  option10 = document.createElement("option");
  option10.setAttribute("value", "10");
  option10.innerText = "10";
  count_update.appendChild(option1);
  count_update.appendChild(option2);
  count_update.appendChild(option3);
  count_update.appendChild(option4);
  count_update.appendChild(option5);
  count_update.appendChild(option6);
  count_update.appendChild(option7);
  count_update.appendChild(option8);
  count_update.appendChild(option9);
  count_update.appendChild(option10);
  count_update.setAttribute("id", "count_update");
  count_update.value = String(pre_count);   //여기여기여기여기여기여기

  const period_update = document.createElement("input");
  period_update.setAttribute("type", "date");
  period_update.setAttribute("id", "period_update");
  period_update.value = pre_period;   //여기여기여기여기여기여기

  const body1 = document.getElementById("update_title");
  const body2 = document.getElementById("update_desc");
  const body3 = document.getElementById("update_count");
  const body4 = document.getElementById("update_period");
  body1.insertBefore(title_update, join_title); //기존 부분을 입력란으로 교체
  body2.insertBefore(desc_update, join_desc);
  body3.insertBefore(count_update, join_count);
  body4.insertBefore(period_update, join_period);

  const update_button = document.getElementById("join_update"); //업데이트 버튼 요소 가져오기
  update_button.setAttribute("onclick", "appendJoinHtml()"); //클릭시 update_Review 함수 실행
}

// 리뷰 수정한 내용을 다시 front에 붙여주는 함수
async function appendJoinHtml() {
  let title_update = document.getElementById("title_update");
  let desc_update = document.getElementById("desc_update");
  let count_update = document.getElementById("count_update");
  let period_update = document.getElementById("period_update");

  const re_join = await patchJoin(
    join_article_id,
    title_update.value,
    desc_update.value,
    count_update.value,
    period_update.value
  );

  title_update.remove();
  desc_update.remove();
  count_update.remove();
  period_update.remove(); // 수정하기 눌러서 기존 내용없애주기.

  const join_title = document.getElementById("join_detail_title"); // review_title.style.visibility = "hidden"으로 없애놨으니까
  const join_desc = document.getElementById("join_detail_desc"); // 불러와서
  const join_count = document.getElementById("join_detail_count");
  const join_period = document.getElementById("join_detail_period");
  join_title.style.visibility = "visible"; // 다시 보이게 !
  join_desc.style.visibility = "visible";
  join_count.style.visibility = "visible";
  join_period.style.visibility = "visible";

  update_button.setAttribute(
    "onclick",
    "patchJoin(join_article_id, join_title, join_desc, join_count, join_period)"
  );

  loadDetailArticles(join_article_id); // 다시 한 번. 맨 위의 함수 실행
}


async function writeJoinCommentEvent() {
  const myNote = document.getElementById("myNote");
  const comment = await postJoinComment(join_article_id, myNote.value);
  loadDetailArticles(join_article_id);
  myNote.value = "";
}


// 댓글 수정하기 버튼 클릭 시 동작하는 함수
function editJoinCommentEvent(id) {
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
  comment_button.setAttribute("onclick", `putJoinComment(${id})`);
}


loadDetailArticles(join_article_id);