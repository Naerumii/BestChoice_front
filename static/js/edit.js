window.onload= () => {
    ProfileChange()
    Profile()
}

//기존 정보 표시
async function ProfileChange(){
    const response = await fetch(`${backend_base_url}/users/`, {
        method: 'GET',
        headers:{
            "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await response.json()

    document.getElementById("username").value = `${response_json.user_nickname}`
    document.getElementById("email").innerText = `${response_json.email}`
    a=document.getElementById("email")
}

//수정
async function ProfileChangeput(){
    const form_data = new FormData();
    const nickname = document.getElementById("usernamechange").value 
    form_data.append('username', username)
    const bio = document.getElementById("biochange").value
    form_data.append('bio', bio)
    
    const image = document.getElementById('file').files[0]
    if (image!=undefined){
        form_data.append('image',image)
        const response = await fetch(`${backend_base_url}/user/`, {
            headers:{
                "Authorization": localStorage.getItem("access"),
            },
            method: 'PUT',
            body: form_data
        })
    }
    else{
        const response = await fetch(`${backend_base_url}/user/`, {
            headers:{
                "Authorization": localStorage.getItem("access"),
            },
            method: 'PUT',
            body: form_data
        })
    }
    location.href="profile.html"
}