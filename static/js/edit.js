const user_id = parseJwt("access").user_id;

window.onload = () => {
    ProfileChange()
}

//기존 정보 표시
async function ProfileChange(){
    const response = await fetch(`${backend_base_url}/users/${user_id}`, {
        method: 'GET',
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
        }
    })
    response_json = await response.json()

    document.getElementById("nickname").value = `${response_json.user_nickname}`
    document.getElementById("phone").value = `0${response_json.user_phone}`
    document.getElementById("address").value = `${response_json.user_address}`
    document.getElementById("introduce").value = `${response_json.user_introduce}`

}

//수정
async function ProfileChangeput(){
    const form_data = new FormData();
    const nickname = document.getElementById("nickname").value 
    form_data.append('user_nickname', nickname)
    const introduce = document.getElementById("introduce").value
    form_data.append('user_introduce', introduce)
    const phone = document.getElementById("phone").value
    form_data.append('user_phone', phone)
    const address = document.getElementById("address").value
    form_data.append('user_address', parseInt(address))
    
    const image = document.getElementById('file').files[0]

    //휴대폰 전화번호 형식 확인 정규표현식(11자리만 가능)
    let patternPhone = /01[016789][^0][0-9]{3}[0-9]{4}$/;

    if(!patternPhone.test(phone)) {
        alert('핸드폰 번호를 확인 해주세요!');
        return 0;
    }

    if (image==undefined) {
        response = await patchProfile(form_data);
    } else {
        form_data.append('user_profile_img', image);
        response = await patchProfile(form_data);
    }

    if (response.status == 200) {
        alert("수정되었습니다!")
        opener.parent.location.reload();
        window.close();
      } else {
        alert("오류 발생!!!!!!")
        return 0;
      }
}

//50글자 수 제한
$(document).ready(function() {
    $('#introduce').on('keyup', function() {
        $('#introduce_cnt').html("("+$(this).val().length+" / 50)");
 
        if($(this).val().length > 50) {
            $(this).val($(this).val().substring(0, 50));
            $('#introduce_cnt').html("(50 / 50)");
        }
    });
});