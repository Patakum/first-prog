import { useState, useEffect, useContext } from 'react';
import { IsLiked, RemoveFromLike, AddToLike } from '../utils/likeUtils';
import './css/image.css'
import { DogsContext } from './Context';


export default function Image({ src }) {
    const [likeIt, setLikeIt] = useState();
    const { activeUser, removeFromFavorites,
        addToFavorites, favorites } = useContext(DogsContext)

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

    return <div className='dogImage'
        onClick={chekLike}>
        <span className='like'>{likeIt ? '❤️' : '🤍'}</span>
        <img className='dogImage' src={src} />
    </div>
}

