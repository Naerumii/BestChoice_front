const user_id = parseJwt("access").user_id;

window.onload = () => {
    ProfileChange()
}

//기존 정보 표시
async function ProfileChange(){
    const response = await fetch(`${backend_base_url}/users/${user_id}/`, {
        method: 'GET',
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
        }
    })
    response_json = await response.json();

    document.getElementById("nickname").value = `${response_json.user_nickname}`
    document.getElementById("phone").value = `0${response_json.user_phone}`
    document.getElementById("address").value = `${response_json.user_address}`;   //여기여기여기여기여기여기
       

    if (response_json.user_introduce==null){
        let introduce_str = "";
        document.getElementById("introduce").value = introduce_str;
    } else {
        document.getElementById("introduce").value = `${response_json.user_introduce}`
    }
}

//수정버튼 클릭 시 실행되는 함수
async function ProfileChangeput(){
	const nickname = document.getElementById("nickname").value;
    const introduce = document.getElementById("introduce").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const image = document.getElementById('file').files[0]  //파일은 value가 아니라 files[0]으로 받는다
    
    //닉네임 공백 확인
    if(nickname == "") {
    	swal("닉네임을 입력해주세요", "", "warning");
        return 0;
    }
    
    //휴대폰 전화번호 형식 확인 정규표현식(11자리만 가능)
    let patternPhone = /01[016789][^0][0-9]{3}[0-9]{4}$/;
    
    if(phone == "") {  //전화번호 공백 확인
    	swal("전화번호를 입력해주세요", "", "warning");
        return 0;
    } else if(!patternPhone.test(phone)) {  //휴대폰 번호가 형식과 일치하는지 확인
    	swal("핸드폰 번호를 확인 해주세요!", "", "warning");
        return 0;
    }
    
    //지역입력 확인
    if(parseInt(address)==0){
    	swal("지역을 선택해주세요", "", "warning");
        return 0;
    }
    
    const form_data = new FormData();  //프로필 이미지 전송을 위한 FormData
    form_data.append('user_nickname', nickname)
    form_data.append('user_introduce', introduce)
    form_data.append('user_phone', phone)
    form_data.append('user_address', address)   //입력받은 데이터를 form_data에 append

    if (image==undefined) {  //프로필 이미지가 없다면
        response = await patchProfile(form_data);  //없는 상태로 form_data를 전송
    } else {
        form_data.append('user_profile_img', image);  //있다면 image를 form_data에 append해 전송
        response = await patchProfile(form_data);
    }

    if (response.status == 200) {
        swal("수정되었습니다!", "", "success");
        opener.parent.location.reload();
        window.close();
      } else {
        swal("회원정보가 잘못되었습니다.", "", "warning");
        return 0;
      }
}

//50글자 수 제한
$(document).ready(function() {
    $('#introduce_cnt').hide();

    $('#introduce').on('focus', function() {
        $('#introduce_cnt').show();
        $('#introduce_cnt').html("("+$(this).val().length+" / 50)");
    });

    $('#introduce').on('keyup', function() {
        $('#introduce_cnt').html("("+$(this).val().length+" / 50)");
 
        if($(this).val().length > 50) {
            $(this).val($(this).val().substring(0, 50));
            $('#introduce_cnt').html("(50 / 50)");
        }
    });
});