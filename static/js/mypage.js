// 로그인한 user.id 찾는 함수 //
function parseJwt(token) {
  var base64Url = localStorage.getItem("access").split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(
      function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  return JSON.parse(jsonPayload);
};

const user_id = parseJwt('access').user_id

// 사용자 정보 받아오기
async function getProfile(user_id) {
    const response = await fetch(`${backend_base_url}/users/${user_id}/`, {
      method: "GET",
    });
    response_json = await response.json();
    
    return response_json;
    //user model all
}

let region_arr = ["서울시", "부산시", "대구시", "인천시", "광주시", "대전시", "울산시", "세종시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"]


// 받아온 json 데이터 front에 내용 붙이는 함수
async function loadProfile(user_id) {
    console.log(user_id)
    now_user = await getProfile(user_id);
    console.log(now_user)
    // articles 
    //프론트엔드에서 태그 id 확인하기
    const user_img = document.getElementById("user_img");
    const author = document.getElementById("user_nickname");
    const email = document.getElementById("user_email");
    const phone = document.getElementById("user_phone");
    const address = document.getElementById("user_address");
    const introduce = document.getElementById("user_introduce");
    // const bookmark_set = document.getElementById("bookmark_set");

    //user_address를 int화하여 리스트값에 맞게 -1계산해서 해당 리스트에 있는 지역값으로 바꿔준다.
    region = region_arr[parseInt(now_user.user_address)-1]
    console.log(`${backend_base_url}${now_user.user_profile_img}`)
    user_img.setAttribute("src", `${backend_base_url}${now_user.user_profile_img}`)
    author.innerText = now_user.user_nickname
    email.innerText = now_user.email
    phone.innerText = now_user.user_phone
    address.innerText = region
    introduce.innerText = now_user.user_introduce
    
    // //작성 게시글 불러오기
    // image.appendChild(profile_img);
    // for (let i = 0; i < now_user.article_set.length; i++) {
    //   const myarticle = document.createElement("div");
    //   myarticle.classList.add("gallery-item");
    //   myarticle.setAttribute("tabindex", "0");
    
    //   const imageFrame = document.createElement("img");
    //   imageFrame.classList.add("gallery-image");
    //   imageFrame.setAttribute("src", `${backend_base_url}${now_user.article_set[i].image}`)
    //   imageFrame.setAttribute("id", now_user.article_set[i].pk);
    //   imageFrame.setAttribute("onclick", "articleDetail(this.id)")
      
    //   myarticle.appendChild(imageFrame);
    //   gallery_container.appendChild(myarticle);
    // }
  }
  
//   function articleDetail(article_id) {
//     console.log(article_id);
//     const url = `${frontend_base_url}/templates/detail_page.html?id=${article_id}`;
//     location.href = url;
// }

  loadProfile(user_id);