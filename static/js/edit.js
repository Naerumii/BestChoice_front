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

    if (Math.floor(response_json.user_address/10) == 0) {
        let address_str = '0'+String(response_json.user_address);
        document.getElementById("address").value = address_str;
    } else {
        document.getElementById("address").value = String(`${response_json.user_address}`);
    }

    if (response_json.user_introduce==null){
        let introduce_str = "";
        document.getElementById("introduce").value = introduce_str;
    } else {
        document.getElementById("introduce").value = `${response_json.user_introduce}`
    }
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
        swal("핸드폰 번호를 확인 해주세요!", "", "warning");
        return 0;
    }

    if (image==undefined) {
        response = await patchProfile(form_data);
    } else {
        form_data.append('user_profile_img', image);
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