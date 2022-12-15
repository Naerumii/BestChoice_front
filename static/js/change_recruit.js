const backend_base_url = "http://127.0.0.1:8000";  //포트번호 변경해주세요
const frontend_base_url = "http://127.0.0.1:5500";  //포트번호 변경해주세요


const urlParams = new URLSearchParams(window.location.search);
const recruit_id = urlParams.get("recruit_id");

let status_str = ["대기중", "수락", "거절"];

// Join Article 객체를 가져와야 함
async function getJoin(join) {
    const response = await fetch(
      `${backend_base_url}/articles/festival/join/${join}/`,
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

  async function getRecruit(recruit) {
    const response = await fetch(
      `${backend_base_url}/articles/festival/join/recruit/${recruit}`,
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

  // 사용자 프로필 정보 받아오기
async function getProfile(user_id) {
    const response = await fetch(`${backend_base_url}/users/${user_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },  
      method: "GET",
    });
    response_json = await response.json();
    return response_json;
  }

    // 사용자 프로필 정보 받아오기
async function patchRecruit(recruit_id, status) {
    const response = await fetch(`${backend_base_url}/articles/festival/join/recruited/${recruit_id}/${status}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },  
      method: "PATCH",
    });
    response_json = await response.json();
    return response_json;
  }

  // 받아온 json 데이터 front에 내용 붙이는 함수
async function loadRecruit(recruit_id) {
    results = await getRecruit(recruit_id);
    
    joins = await getJoin(results.recruit_join);
    author = await getProfile(results.recruit_user);
  
    const user = document.getElementById("recruit_user");
    const join = document.getElementById("recruit_join");
    const status = document.getElementById("recruit_status");

    let status_ch
    if (!results.recruit_status) {
        status_ch = status_str[0];
    } else if(results.recruit_status == 1) {
        status_ch = status_str[1]
    } else if(results.recruit_status == 2) {
        status_ch = status_str[2]
    }
    
    
    user.innerText = author.user_nickname;
    join.innerText = joins.join_title;
    status.innerText = status_ch;
  
} 

  async function changeStatus(status) {
    if (status>2 || status<1) {
        alert("이상한 값이네요.")
    } else {
        results = await patchRecruit(recruit_id, status);
        console.log(results)
        if (results=="신청상태가 수락으로 변경되었습니다.") {
            alert("신청 수락하였습니다.")
            window.location.replace(`${frontend_base_url}/templates/mypage.html`)
        } else if (results== "신청상태가 거절로 변경되었습니다.") {
            alert("신청 거부하였습니다.")
            window.location.replace(`${frontend_base_url}/templates/mypage.html`)
        }
    }
  }

  loadRecruit(recruit_id);