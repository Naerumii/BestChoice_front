//모집게시글 가져오기 api (전부)
async function getJoins() {
    const response = await fetch(`${backend_base_url}/joins/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
      }
    );
    response_json = await response.json();
    return response_json;
}


//모집게시글 생성 api
async function postJoin(festival_article_id) {
  article = await getFestivalDetail(festival_article_id);


  //프론트엔드에서 태그 id 확인하기
  // const title = document.getElementById("festival_title").innerText;
  let searchForm = $("#searchForm");
  const join_count = searchForm.find("option:selected").val();
  const join_title = document.getElementById("join_title").value;
  const join_content = document.getElementById("join_content").value;
  const join_donedate = document.getElementById("join_donedate").value;

  const data = {
      join_title: join_title,
      join_count: join_count,
      join_desc: join_content,
      join_period: join_donedate,
  }


  const response = await fetch(`${backend_base_url}/joins/${festival_article_id}/createjoin/`, {

      headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "POST",
      body: JSON.stringify(data),
  });

  if (response.status == 200) {
      swal("게시글이 등록됐습니다.", "", "success").then((value) => {
        if (value) {
          window.location.replace(`${frontend_base_url}/templates/festival_page.html`);
        }
      });
  } else {
      swal(response.status)
  }
}


//모집게시글 상세보기 api
async function getJoinDetail(join_article_id) {
  const response = await fetch(`${backend_base_url}/joins/${join_article_id}/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "GET",
    }
  );
  response_json = await response.json();
  return response_json;
}


//모집게시글 삭제 api
async function deleteJoin(join_article_id) {
  const response = await fetch(`${backend_base_url}/joins/${join_article_id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "DELETE",
    }
  );

  if (response.status == 204) {
    swal("게시물이 삭제되었습니다.", "", "info").then((value) => {
      if (value) {
        window.location.replace(`${frontend_base_url}/templates/join_page.html`);
      }
    });
  } else {
    swal("게시물 작성자만 삭제 가능합니다.", "", "error");
  }
}


//모집게시글 수정 api
async function patchJoin(join_article_id, join_title, join_desc, join_count, join_period) {
  const JoinData = {
    join_title: join_title,
    join_desc: join_desc,
    join_count: join_count,
    join_period: join_period,
  };
  const response = await fetch(`${backend_base_url}/joins/${join_article_id}/`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "PATCH",
      body: JSON.stringify(JoinData),
    }
  );

  if (response.status == 200) {
    response_json = await response.json();
    swal("게시물이 수정되었습니다.", "", "success").then((value) => {
      if (value) {
        window.location.reload(
          `${frontend_base_url}/templates/join_detail.html?join_article_id=${join_article_id}`
        );
      }
    });
  } else {
    swal(response.status);
  }
}


//모집게시글 댓글 생성 api
async function postJoinComment(join_article_id, myNote) {
  const commentData = {
      comment_content: myNote,
  };
  const response = await fetch(
  `${backend_base_url}/joins/${join_article_id}/comment/`,
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
  swal("댓글을 입력하세요");
  }
}


//모집게시글 댓글 수정 api
async function putJoinComment(id) {    
  const comment_retext = document.getElementById(`join_input_comment_${id}`).value;
  const commentReData = {
      comment_content: comment_retext,
  }   
  const response = await fetch(`${backend_base_url}/joins/${join_article_id}/comment/${id}/`, {
          headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
          },    
          method: "PUT",
          body: JSON.stringify(commentReData),
      });
  
      if (response.status == 200) {
          swal("댓글이 수정되었습니다.").then((value) => {
            if (value) {
              window.location.reload(
                `${frontend_base_url}/templates/join_detail.html?id=${join_article_id}`
              );
            }
          });
      } else {
          swal("댓글 작성자만 수정 가능합니다");
      }
}


//모집게시글 댓글 삭제 api
async function deleteJoinComment(id) {
  const response = await fetch(`${backend_base_url}/joins/${join_article_id}/comment/${id}/`, {
      headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
      },    
      method: "DELETE",
  });

  if (response.status == 204) {
      swal("댓글이 삭제되었습니다.").then((value) => {
        if (value) {
          window.location.reload(
            `${frontend_base_url}/templates/join_detail.html?id=${join_article_id}`
        );
        }
      });
  } else {
      swal("댓글 작성자만 삭제 가능합니다.");
  }
}