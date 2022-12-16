//프로필 정보 조회 api
async function getProfile(user_id) {
    const response = await fetch(`${backend_base_url}/users/${user_id}/`, {
      method: "GET",
    });
    response_json = await response.json();
  
    return response_json;
}