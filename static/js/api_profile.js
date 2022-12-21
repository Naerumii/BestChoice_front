//프로필 정보 조회 api
async function getProfile(user_id) {
    const response = await fetch(`${backend_base_url}/users/${user_id}/`, {
      method: "GET",
    });
    response_json = await response.json();
  
    return response_json;
}


//프로필 정보 수정 api
async function patchProfile(form_data){
  const response = await fetch(`${backend_base_url}/users/`, {
    headers:{
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: 'PATCH',
    body: form_data
  });

  return response;
}