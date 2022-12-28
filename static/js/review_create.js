// 리뷰 게시글 생성
async function writeReviewEvent() {
  const payload = localStorage.getItem("payload");
  const parsed_payload = await JSON.parse(payload);

  postReview();
}
