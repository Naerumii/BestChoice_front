// 리뷰 게시글 생성
async function createReview() {
    const payload = localStorage.getItem("payload");
    const parsed_payload = await JSON.parse(payload);

    review_title = document.getElementById("review_title").value;
    review_desc = document.getElementById("review_desc").value;
    image = document.getElementById("file").files[0];

    const formData = new FormData();

    formData.append("review_title", review_title);
    formData.append("review_desc", review_desc);
    formData.append("image", image);

    console.log(formData.get("review_desc"))

    //테스트할 때 포트번호 변경
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
