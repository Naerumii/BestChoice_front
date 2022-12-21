//회원가입
async function handleSignup() {
    const signupData = {
      email: document.getElementById("signup-email").value,
      user_nickname: document.getElementById("signup-nickname").value,
      user_phone: document.getElementById("signup-phone").value,
      password: document.getElementById("signup-password1").value,
      password2: document.getElementById("signup-password2").value,
      user_address: document.getElementById("signup-address").value,
    };

    const email = signupData.email
    const nickname = signupData.user_nickname
    const phone = signupData.user_phone
    const password = signupData.password
    const password2 = signupData.password2
    const address = parseInt(signupData.user_address)

    if (email == '') {
      alert("이메일을 입력해주세요.");
      return 0;
    }
    else if (nickname == '') {
      alert("닉네임을 입력해주세요.");
      return 0;
    }
    else if (phone == '') {
      alert("번호를 입력해주세요.");
      return 0;
    } 
    else if (password == '' || password2 == '') {
      alert("비밀번호와 비밀번호 확인을 입력해주세요.");
      return 0;
    }
    else if (password != password2) {
      alert("비밀번호 확인이 잘못되었습니다.");
      return 0;
    }
    else if (address == 0) {
      alert("지역을 선택해주세요!");
      return 0;
    }

    //이메일 형식 확인 정규표현식
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (regex.test(signupData.email) == false) {
      alert("올바른 이메일 형식이 아닙니다!")
      return 0;
    } 

    //휴대폰 전화번호 형식 확인 정규표현식(11자리만 가능)
    var patternPhone = /01[016789][^0][0-9]{3}[0-9]{4}/;

    if(!patternPhone.test(signupData.user_phone)) {
        alert('핸드폰 번호를 확인 해주세요!');
        return 0;
    }
  
    const response = await fetch(`${backend_base_url}/users/signup/`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(signupData),
    });
    
    response_json = await response.json()

    if (response.status == 201) {
      alert(response_json.message)
      window.location.replace(`${frontend_base_url}/templates/sign.html`);
    } else {
      alert(response_json.message)
    }
}


//로그인
async function handleSignin() {
    const signinData = {
      email: document.getElementById("signin-email").value,
      password: document.getElementById("signin-password1").value,
    };
  
    const response = await fetch(`${backend_base_url}/users/api/token/`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(signinData),
    });
  
    const response_json = await response.json();
    if(response_json.detail == undefined) {
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
    alert("원하는 축제를 찾아보세요!")
    window.location.replace(`${frontend_base_url}/templates/main.html`);
    } else {
        alert("로그인 정보가 잘못되었습니다.")
    }
}
  

//로그아웃
async function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    alert("로그아웃 되었습니다");
    window.location.replace(`${frontend_base_url}/templates/sign.html`);
  }