//리뷰게시글 가져오기 api(전부)
async function getReviews() {
    const response = await fetch(`${backend_base_url}/reviews/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}

//리뷰게시글 상세보기 api
async function getReviewDetail(review_id) {
    const response = await fetch(`${backend_base_url}/reviews/${review_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
    });
    response_json = await response.json();
  
    return response_json;
}


//리뷰게시글 작성하는 api
async function postReview() {
  review_title = document.getElementById("review_title").value;
  review_desc = document.getElementById("review_desc").value;
  image = document.getElementById("file").files[0];

  const formData = new FormData();

  formData.append("review_title", review_title);
  formData.append("review_desc", review_desc);
  formData.append("image", image);
  const response = await fetch(`${backend_base_url}/reviews/`, {
      headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "POST",
      body: formData,
  });

  if (response.status == 200) {
      swal("게시글이 등록됐습니다.", "", "success").then((value) => {
        if (value) {
          opener.location.reload(`${frontend_base_url}/review.html`);
          window.close();
        }
      });
  } else {
      swal(response.status)
  }
}

//리뷰게시물 수정하는 api
async function patchReview(review_id, review_title, review_desc) {
    const ReviewData = {
      review_title: review_title,
      review_desc: review_desc,
    };
    const response = await fetch(`${backend_base_url}/reviews/${review_id}/`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "PATCH",
      body: JSON.stringify(ReviewData),
    });
  
    if (response.status == 200) {
      response_json = await response.json();
      swal("게시물이 수정되었습니다.", "", "success");
      return response_json;
    } else {
      swal("게시물 작성자만 수정 가능합니다.", "", "warning");
    }
}


//리뷰게시물 삭제하는 api
async function deleteReview(review_id) {
    const response = await fetch(`${backend_base_url}/reviews/${review_id}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access")
      },
      method: "DELETE"
    })
  
    if (response.status == 204) {
      swal("게시물이 삭제되었습니다.", "", "info").then((value) => {
        if (value) {
          window.location.replace(`${frontend_base_url}/review_page.html`)
        }
      });
    } else {
      swal("게시물 작성자만 삭제 가능합니다.", "", "error");
    }
}


//리뷰게시글 댓글 작성 api
async function postReviewComment(review_id, comment_text) {
    const commentData = {
      review_comment: comment_text,
    };
    const response = await fetch(`${backend_base_url}/reviews/${review_id}/comment/`, {
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
      swal(response.status);
    }
}


//리뷰게시글 댓글 수정 api
async function putReviewComment(id) {    
    const comment_retext = document.getElementById(`input_comment_${id}`).value;
    const commentReData = {
      review_comment: comment_retext,
    }   
    const response = await fetch(`${backend_base_url}/reviews/${review_id}/comment/${id}/`, {
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
              `${frontend_base_url}/review_detail.html?id=${review_id}`
              );
          }
        });
    } else {
        swal(response.status);
    }
}


//리뷰게시글 댓글 삭제 api
async function deleteReviewComment(id) {
    const response = await fetch(`${backend_base_url}/reviews/${review_id}/comment/${id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "DELETE",
    });

    if (response.status == 204) {
        swal("댓글이 삭제되었습니다.").then((value) => {
          if (value) {
            window.location.reload(
                `${frontend_base_url}/review_detail.html?id=${review_id}`
              );
          }
        })
    } else {
        swal(response.status);
    }
}