//리뷰게시글 가져오기 api(전부)
async function getReviews() {
    const response = await fetch(`${backend_base_url}/articles/review/`, {
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
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/`, {
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
  const response = await fetch("http://127.0.0.1:8000/articles/review/", {
      headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "POST",
      body: formData,
  });

  if (response.status == 200) {
      alert("게시물 등록");
      opener.location.reload("http://127.0.0.1:5500/templates/review.html");
      window.close();
  } else {
      alert(response.status)
  }
}

//리뷰게시물 수정하는 api
async function patchReview(review_id, review_title, review_desc) {
    const ReviewData = {
      review_title: review_title,
      review_desc: review_desc,
    };
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "PATCH",
      body: JSON.stringify(ReviewData),
    });
  
    if (response.status == 200) {
      response_json = await response.json();
      alert("게시물이 수정되었습니다.")
      return response_json;
    } else {
      alert("게시물 작성자만 수정 가능합니다.")
    }
}


//리뷰게시물 삭제하는 api
async function deleteReview(review_id) {
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access")
      },
      method: "DELETE"
    })
  
    if (response.status == 204) {
      alert("게시물이 삭제되었습니다.")
      window.location.replace(`${frontend_base_url}/templates/review_page.html`)
    } else {
      alert("게시물 작성자만 삭제 가능합니다.")
    }
}


//리뷰게시글 댓글 작성 api
async function postReviewComment(review_id, comment_text) {
    const commentData = {
      review_comment: comment_text,
    };
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/comment/`, {
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
      alert(response.status);
    }
}


//리뷰게시글 댓글 수정 api
async function putReviewComment(id) {    
    const comment_retext = document.getElementById(`input_comment_${id}`).value;
    const commentReData = {
      review_comment: comment_retext,
    }   
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/comment/${id}/`, {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "PUT",
        body: JSON.stringify(commentReData),
    });
    
    if (response.status == 200) {
        alert("댓글이 수정되었습니다.")
        window.location.reload(
        `${frontend_base_url}/templates/review_detail.html?id=${review_id}`
        );
    } else {
        alert(response.status);
    }
}


//리뷰게시글 댓글 삭제 api
async function deleteReviewComment(id) {
    const response = await fetch(`${backend_base_url}/articles/review/${review_id}/comment/${id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "DELETE",
    });

    if (response.status == 204) {
        alert("댓글이 삭제되었습니다.")
        window.location.reload(
            `${frontend_base_url}/templates/review_detail.html?id=${review_id}`
        );
    } else {
        alert(response.status);
    }
}