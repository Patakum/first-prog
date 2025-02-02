const getKey = user => 'likedDogs' + (user ? '_' + user : '');

export const IsLiked = (item, user) => {
    return getALLiked(user).includes(item);
};

export const getALLiked = (user) => {
    const likedStr = localStorage.getItem(user);
    return likedStr ? JSON.parse(likedStr) : [];
};

export const AddToLike = (item, user) => {
    const likeStr = localStorage.getItem(user);
    const liked = likeStr ? JSON.parse(likeStr) : [];
    if (!liked.includes(item)) {
        liked.push(item);
    }
    const likeToSave = JSON.stringify(liked);
    localStorage.setItem(user, likeToSave);
};

export const RemoveFromLike = (item, user) => {
    const likeStr = localStorage.getItem(user);
    const liked = likeStr ? JSON.parse(likeStr) : [];
    if (liked.includes(item)) {
        liked.splice(liked.indexOf(item), 1);
    }
    const likeToSave = JSON.stringify(liked);
    localStorage.setItem(user, likeToSave);
};