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

  const email = signupData.email;
  const nickname = signupData.user_nickname;
  const phone = signupData.user_phone;
  const password = signupData.password;
  const password2 = signupData.password2;
  const address = parseInt(signupData.user_address);

  if (email == "") {
    swal("이메일을 입력해주세요.", "", "info");
    return 0;
  } else if (nickname == "") {
    swal("닉네임을 입력해주세요.", "", "info");
    return 0;
  } else if (phone == "") {
    swal("번호를 입력해주세요.", "", "info");
    return 0;
  } else if (password == "" || password2 == "") {
    swal("비밀번호를 입력해주세요.", "", "info");
    return 0;
  } else if (password != password2) {
    swal("비밀번호가 일치하지 않습니다.", "", "warning");
    return 0;
  } else if (address == 0) {
    swal("지역을 선택해주세요!", "", "info");
    return 0;
  }

  //이메일 형식 확인 정규표현식
  let regex_email = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (regex_email.test(signupData.email) == false) {
    swal("올바른 이메일 형식이 아닙니다!", "", "warning");
    return 0;
  }

  //휴대폰 전화번호 형식 확인 정규표현식(11자리만 가능)
  var patternPhone = /01[016789][^0][0-9]{3}[0-9]{4}$/;

  if (!patternPhone.test(signupData.user_phone)) {
    swal("핸드폰 번호를 확인 해주세요!", "", "warning");
    return 0;
  }

  //비밀번호 형식 확인 정규표현식(비밀번호 유효성 검사: 최소 한개의 영문자 + 최소 한개의 숫자 + 최소 8자)
  let regex_password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!regex_password.test(signupData.password)) {
    swal("올바른 비밀번호 형식이 아닙니다!", "", "warning");
    return 0;
  }

  const response = await fetch(`${backend_base_url}/users/signup/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(signupData),
  });

  response_json = await response.json();

  if (response.status == 201) {
    swal("환영합니다").then((value) => {
      if (value) {
        window.location.replace(`${frontend_base_url}/sign.html`);
      }
    });
  } else {
    swal(response_json.message);
  }
}

function enterkey() {
  if (window.event.keyCode == 13) {

       // 엔터키가 눌렸을 때 실행할 내용
       handleSignin();
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
  if (response_json.detail == undefined) {
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
    swal("원하는 축제를 찾아보세요!", "모집 게시판을 통해 축제에 함께 갈 사람들을 모집해보세요.").then((value) => {
      if (value) {
        window.location.replace(`${frontend_base_url}/main.html`);
      }
    });
  } else {
    swal("로그인 정보가 잘못되었습니다.", "", "warning");
  }
}

//로그아웃
async function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  swal("로그아웃 되었습니다").then((value) => {
    if (value) {
      window.location.replace(`${frontend_base_url}/sign.html`);
    }
  });
}
