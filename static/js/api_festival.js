//축제게시물 가져오기 api (전부)
async function getFestivals() {
    const response = await fetch(`${backend_base_url}/articles/festival/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}


//축제게시글 상세보기 api
async function getFestivalDetail(festival_article_id) {
    const response = await fetch(`${backend_base_url}/articles/festival/${festival_article_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
    });
    response_json = await response.json();
  
    return response_json;
}


//추천 축제게시물 가져오기 api
async function getFestivalRecommend() {
    const response = await fetch(`${backend_base_url}/articles/recommend/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}

//조건에 맞는 축제게시물 가져오기 api
async function getFestivalFilter(option_param) {
    const response = await fetch(`${backend_base_url}/articles/festival/filter/`+ "?" +option_param, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },    
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}


//축제게시글 북마크 api
async function postFestivalBookmark(festival_article_id) {
    const bookmarkData = {
        "bookmark_festival": festival_article_id,
    }
    const response = await fetch(`${backend_base_url}/articles/festival/${festival_article_id}/bookmark/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify(bookmarkData)
    })

    // response_json = await response.json()

    if (response.status == 200) {
        alert("북마크가 되었습니다!")
        window.location.reload()
        return response
    } else if(response.status == 204) {
        alert("북마크가 취소되었습니다!")
        window.location.reload()
    }
}