//신청게시글 조회 api
async function getRecruitDetail(recruit) {
    const response = await fetch(`${backend_base_url}/articles/festival/join/recruit/${recruit}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },  
        method: "GET",
    });
    response_json = await response.json();
    
    return response_json;
}


//신청게시글 상태 수정 api
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