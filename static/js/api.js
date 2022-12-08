//sign.html 기능
//회원가입
async function handleSignup() {
    console.log(document.getElementById("signup-address").value);

    const signupData = {
    email: document.getElementById("signup-email").value,
    user_nickname: document.getElementById("signup-nickname").value,
    user_phone: document.getElementById("signup-phone").value,
    password: document.getElementById("signup-password1").value,
    password2: document.getElementById("signup-password2").value,
    user_address: document.getElementById("signup-address").value,
    };

    console.log(signupData);

    const response = await fetch("http://127.0.0.1:8000/users/signup/", {
    headers: {
        "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(signupData),
    });

    console.log(response);

    // if (response.status == 201) {
    // window.location.replace("http://127.0.0.1:5500/templates/sign.html");
    // } else {
    // alert(response.status);
    // }
}

//로그인
async function handleSignin() {
    const signinData = {
    email: document.getElementById("signin-email").value,
    password: document.getElementById("signin-password1").value,
    };

    const response = await fetch("http://127.0.0.1:8000/users/api/token/", {
    headers: {
        "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(signinData),
    });

    const response_json = await response.json();
    console.log(response_json);

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
    atob(base64)
        .split("")
        .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    localStorage.setItem("payload", jsonPayload);
    window.location.replace("http://127.0.0.1:5500/templates/main.html");

    // if (response.status==200){
    //     window.location.replace('http://127.0.0.1:8000/users/signup/');
    // } else {
    //     alert(response.status)
    // }
}

//로그아웃
async function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    alert("로그아웃 되었습니다");
    window.location.replace("http://127.0.0.1:5500/templates/sign.html");
}
