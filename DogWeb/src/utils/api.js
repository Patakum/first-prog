const BASE_URL = 'http://localhost:2000/api';

function APICall(url, method, body) {
    const options = { method };
    if (body) {
        options.body = JSON.stringify(body);
        options.headers = { 'Content-Type': 'application/json' }
    }
    return fetch(BASE_URL + url, options)
        .then(res => res.json())
        .then(obj => {
            if (obj.status == 'success') {
                return obj.data;
            } else {
                throw new Error(obj.message);
            }
        });
}

export const createUser = (name) => APICall('/user', 'POST', { name });
export const getUsers = () => APICall('/users', 'GET');
export const getUserById = (id) => APICall(`/user/${id}`, 'GET');
export const changeName = (id, name) => APICall(`/user/${id}/name`, 'PATCH', { name });
export const changeProfile = (id, profilePic) => {
    return APICall(`/user/${id}/profile`, 'PATCH', { profilePic })
};
export const deleteUser = (id) => APICall(`/user/${id}`, 'DELETE');
export const deleteProfile = (id) => APICall(`/user/${id}/profile`, 'DELETE');
export const createFavorite = (id, imgSrc) => APICall(`/user/${id}/favorite`, 'POST', { imgSrc });
export const getFavorite = (id) => APICall(`/user/${id}/favorites`, 'GET');
export const deleteFav = (id, favId) => APICall(`/user/${id}/favorite/${favId}`, 'DELETE');
export const updateFavName = (id, favId, name) => APICall(`/user/${id}/favorite/${favId}/name`, 'PATCH', { name });
export const deleteFavPic = (id, favId) => APICall(`/user/${id}/favorite/${favId}/image`, 'DELETE');