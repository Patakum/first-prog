import { useState, useEffect, useContext } from 'react';
import { IsLiked, RemoveFromLike, AddToLike } from '../utils/likeUtils';
import './css/imageFav.css'
import { DogsContext } from './Context';


export default function ImageFav({ src }) {
    const [likeIt, setLikeIt] = useState();
    const [editNmae, setEditName] = useState('');
    const { activeUser, removeFromFavorites,
        addToFavorites, favorites, updateUserPic } = useContext(DogsContext)

    useEffect(() => setLikeIt(
        favorites?.find(fav => fav.imgSrc == src)?._id)
        , [src, favorites]);

    const chekLike = () => {
        if (!activeUser) return
        if (likeIt) {
            removeFromFavorites(likeIt);
        } else {
            addToFavorites(src);
        }
    }

    return <div className='dogImage'>
        <span className='like'>{likeIt ? '❤️' : '🤍'}</span>
        <img className='dogImage' src={src} onClick={chekLike}>
        </img>
        <div className='changeFavName'>
            <input
                type="text"
                onChange={e => { setEditName(e.target.name) }} />
            <button >Edit</button>
            <button onClick={() => updateUserPic(likeIt)}>make it profile</button>
        </div>
    </div>
}
