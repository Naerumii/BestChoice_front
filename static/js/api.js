// const backend_base_url = "http://13.209.85.231";  //포트번호 변경해주세요
const backend_base_url = "http://127.0.0.1:8000";  //포트번호 변경해주세요
// const backend_base_url = "http://13.209.85.231"
const frontend_base_url = "http://127.0.0.1:5500";  //포트번호 변경해주세요

// 로그인한 user.id 찾는 함수 //
function parseJwt(token) {
    var base64Url = localStorage.getItem("access").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(
        function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

    return JSON.parse(jsonPayload);
};


//옵션 url 변환 함수//
function changeOptionUrl(search_list){
    let option_param = ""
    for (let i=0; i<search_list.length; i++) {
        if (search_list[i] != undefined) {
            option_param += "param=" + search_list[i] + "&"
        }
    }

    return option_param
}