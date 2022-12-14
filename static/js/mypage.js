// 로그인한 user.id 찾는 함수 //
function parseJwt(token) {
  var base64Url = localStorage.getItem("access").split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

const user_id = parseJwt("access").user_id;

// 사용자 프로필 정보 받아오기
async function getProfile(user_id) {
  const response = await fetch(`${backend_base_url}/users/${user_id}/`, {
    method: "GET",
  });
  response_json = await response.json();

  return response_json;
}

// 내가 생성한 모집게시글에 대한 recruit 정보 받아오기
async function getRecruited(user_id) {
  const response = await fetch(
    `${backend_base_url}/articles/festival/join/recruited/`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "GET",
    }
  );
  response_json = await response.json();

  return response_json;
}

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

// 받아온 json 데이터 front에 내용 붙이는 함수
async function loadProfile(user_id) {
  now_user = await getProfile(user_id);
  results = await getRecruited(user_id);

  const user_img = document.getElementById("user_img");
  const author = document.getElementById("user_nickname");
  const email = document.getElementById("user_email");
  const phone = document.getElementById("user_phone");
  const address = document.getElementById("user_address");
  const introduce = document.getElementById("user_introduce");

  //user_address를 int화하여 리스트값에 맞게 -1계산해서 해당 리스트에 있는 지역값으로 바꿔준다.
  region = region_arr[parseInt(now_user.user_address) - 1];
  console.log(`${backend_base_url}${now_user.user_profile_img}`);
  user_img.setAttribute(
    "src",
    `${backend_base_url}${now_user.user_profile_img}`
  );
  author.innerText = now_user.user_nickname;
  email.innerText = now_user.email;
  phone.innerText = now_user.user_phone;
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
      get_recruited_html(
        results[i].id,
        results[i].recruit_join,
        results[i].recruit_status,
        results[i].recruit_time,
        now_user.user_nickname
      );
    }
  }
} 
  


async function get_bookmark_html(pk, user, festival) {
  const oneArticle = await getArticle(festival);
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

let status_str = ["대기중", "승인"];

async function get_recruit_html(id, join, status_bool, time) {
  const oneArticle = await getJoin(join);
  console.log(oneArticle.join_title);
  let status;

  if (status_bool) {
    status = status_str[1];
  } else {
    status = status_str[0];
  }

  console.log(time);
  temp_html = `<li>
                <a href="#">
                  ${oneArticle.join_title} || ${status} </br>
                </a>
              </li>`;
  $("#yj").append(temp_html);
}

async function get_recruited_html(id, join, status_bool, time, user) {
  const oneArticle = await getJoin(join);
  console.log(oneArticle.join_title);
  let status;

  if (status_bool) {
    status = status_str[1];
  } else {
    status = status_str[0];
  }

  console.log(time);
  temp_html = `<li>
                <a href="#">
                  ${oneArticle.join_title} || ${status} || ${user}</br>
                </a>
              </li>`;
  $("#sy").append(temp_html);
}

// 북마크한 축제게시글번호(bookmark_festival: 7)를 통해서 축제게시글 정보 받아오기(역참조)
async function getArticle(festival_id) {
  const response = await fetch(
    `${backend_base_url}/articles/festival/${festival_id}`,
    {
      method: "GET",
    }
  );
  response_json = await response.json();

  return response_json;
}

// 신청게시글을 통해서 모집게시글 번호를 알아냈다.(recruit_join: 8) 이걸 통해서 join title을 얻고 싶다.
// Join Article 객체를 가져와야 함
async function getJoin(join) {
  const response = await fetch(
    `${backend_base_url}/articles/festival/join/${join}`,
    {
      method: "GET",
    }
  );
  response_json = await response.json();

  return response_json;
}


loadProfile(user_id);