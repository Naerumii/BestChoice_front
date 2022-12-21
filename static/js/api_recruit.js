//신청게시글 상세보기 api
async function getRecruitDetail(recruit) {
    const response = await fetch(`${backend_base_url}/recruits/recruit/${recruit}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },  
        method: "GET",
    });
    response_json = await response.json();
    
    return response_json;
}


//신청게시글 생성 api
async function postRecruit(join_article_id) {
  const payload = localStorage.getItem("payload");
  const parsed_payload = await JSON.parse(payload);

  //테스트할 때 포트번호 변경
  const response = await fetch(`${backend_base_url}/recruits/${join_article_id}/recruit/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "POST",
    }
  );

  if (response.status == 201) {
    swal("해당 모집글에 신청되었습니다.", "", "success");
  } else {
    swal("이미 해당 모집글에 신청되었습니다.", "", "warning");
  }
}

//신청게시글 상태 수정 api
async function patchRecruit(recruit_id, status) {
    const response = await fetch(`${backend_base_url}/recruits/recruited/${recruit_id}/${status}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },  
        method: "PATCH",
    });
    response_json = await response.json();
    return response_json;
}


// 내가 생성한 모집게시글에 대한 recruit 정보 받아오기 api(My 모집하기 항목을 위해 존재)
async function getRecruited(user_id) {
    const response = await fetch(
      `${backend_base_url}/recruits/recruited/`,
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