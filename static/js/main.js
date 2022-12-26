// 자동 함수 실행
// 게시물 로드하기
$(document).ready(async function loadArticles() {
  //로그인 체크
  var token = localStorage.getItem("access");
  if (!token) {
    swal("로그인 후 사용해주세요!", "", "warning").then((value) => {
      if (value) {
        window.location.replace(`${frontend_base_url}/sign.html`);
      }
    });
  }

  articles = await getFestivalRecommend();
  const article_list = document.getElementById("article_container");

  articles.forEach((article) => {
    const newArticle = document.createElement("div");
    newArticle.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3");

    const articleLink = document.createElement("a");
    articleLink.classList.add("course");
    articleLink.setAttribute(
      "href",
      `./festival_detail.html?festival_article_id=${article.pk}`
    );

    const articleImage = document.createElement("img");
    articleImage.classList.add("course-img");
    articleImage.setAttribute("src", `${article.festival_image}`);
    articleImage.setAttribute("width", "100%");
    articleImage.setAttribute("height", "200");

    const articleBody = document.createElement("div");
    articleBody.classList.add("info");

    const bodyTitle = document.createElement("h4");
    bodyTitle.innerHTML = article.festival_title;
    const bodyAddress = document.createElement("div");
    bodyAddress.classList.add("lecturer");
    const bodyFooter = document.createElement("img");
    bodyFooter.setAttribute("src", "https://i.postimg.cc/FKKK3PpN/image.png");
    bodyFooter.setAttribute("width", "15");
    bodyFooter.setAttribute("height", "15");

    const FooterStr = document.createElement("span");
    FooterStr.classList.add("name");
    FooterStr.innerText = article.festival_region;

    bodyAddress.appendChild(bodyFooter);
    bodyAddress.appendChild(FooterStr);
    articleBody.appendChild(bodyTitle);
    articleBody.appendChild(bodyAddress);
    articleLink.appendChild(articleImage);
    articleLink.appendChild(articleBody);
    newArticle.appendChild(articleLink);
    article_list.appendChild(newArticle);
  });
});
