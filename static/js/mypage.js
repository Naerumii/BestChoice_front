const user_id = parseJwt("access").user_id;


let region_arr = [
  "서울시",
  "부산시",
  "대구시",
  "인천시",
  "광주시",
  "대전시",
  "울산시",
  "세종시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주도",
];

let status_str = ["대기중", "수락", "거절"];

// 받아온 json 데이터 front에 내용 붙이는 함수
async function loadProfile(user_id) {
  now_user = await getProfile(user_id);
  results = await getRecruited(user_id);

  console.log(results)
  const user_img = document.getElementById("user_img");
  const author = document.getElementById("user_nickname");
  const email = document.getElementById("user_email");
  const phone = document.getElementById("user_phone");
  const address = document.getElementById("user_address");
  const introduce = document.getElementById("user_introduce");

  //user_address를 int화하여 리스트값에 맞게 -1계산해서 해당 리스트에 있는 지역값으로 바꿔준다.
  region = region_arr[parseInt(now_user.user_address) - 1];
  user_img.setAttribute(
    "src",
    `${backend_base_url}${now_user.user_profile_img}`
  );
  author.innerText = now_user.user_nickname;
  email.innerText = now_user.email;
  phone.innerText = "0" + String(now_user.user_phone);
  address.innerText = region;
  introduce.innerText = now_user.user_introduce;

  if (now_user.bookmark_set.length > 0) {
    for (let i = 0; i < now_user.bookmark_set.length; i++) {
      get_bookmark_html(
        now_user.bookmark_set[i].pk,
        now_user.bookmark_set[i].bookmark_user,
        now_user.bookmark_set[i].bookmark_festival
      );
    }
  }

  //신청내역
  if (now_user.recruit_user_set.length > 0) {
    for (let i = 0; i < now_user.recruit_user_set.length; i++) {
      get_recruit_html(
        now_user.recruit_user_set[i].id,
        now_user.recruit_user_set[i].recruit_join,
        now_user.recruit_user_set[i].recruit_status,
        now_user.recruit_user_set[i].recruit_time
      );
    }
  }

  //my어쩌구에 들어가는거
  if (results.length > 0) {
    for (let i = 0; i < results.length; i++) {
      other_user = await getProfile(results[i].recruit_user);
      get_recruited_html(
        results[i].id,
        results[i].recruit_join,
        results[i].recruit_status,
        results[i].recruit_time,
        other_user.user_nickname
      );
    }
  }
} 
  


async function get_bookmark_html(pk, user, festival) {
  const oneArticle = await getFestivalDetail(festival);
  temp_html = `<div class="col-12 col-md-6 col-lg-4 col-xl-3" id="bookmark" onclick="location.href='/templates/festival_detail.html?festival_article_id=${festival}'">
                <a href="#" class="course">
                <img src="${oneArticle.festival_image}" width="100%" class="course-img">

                <div class="info">
                  <h4>${oneArticle.festival_title}</h4>
                    <div class="lecturer">
                      <img src="https://i.postimg.cc/FKKK3PpN/image.png" width="15" height="15"><span class="name">${oneArticle.festival_region}</span>
                    </div>
                </div>
                </a>
               </div>`;
  $("#bookmark_box").append(temp_html);
}

async function get_recruit_html(id, join, status_num, time) {
  const oneArticle = await getJoinDetail(join);
  let status;

  if (!status_num) {
    status = status_str[0];
  } else if (status_num == 1) {
    status = status_str[1];
  } else if (status_num == 2) {
    status = status_str[2];
  }

  temp_html = `<li>
                <a href="#" class="join">
                  ${oneArticle.join_title} || ${status} </br>
                </a>
              </li>`;
  $("#yj").append(temp_html);
}

async function get_recruited_html(id, join, status_num, time, user) {
  const oneArticle = await getJoinDetail(join);
  let status;

  if (!status_num) {
    status = status_str[0];
  } else if (status_num == 1) {
    status = status_str[1];
  } else if (status_num == 2) {
    status = status_str[2];
  }

  temp_html = `<li>
                <a href='/templates/recruit_change.html?recruit_id=${id}'>
                  ${oneArticle.join_title} || ${user} || ${status}
                </a>
              </li>`;
  $("#sy").append(temp_html);
}

function openPopup1(){
  window.open("http://127.0.0.1:5500/templates/mypage-patch.html", "new", "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=500, height=850, left=700, top=250" );
}

loadProfile(user_id);