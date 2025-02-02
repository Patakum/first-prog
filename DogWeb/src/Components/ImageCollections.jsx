import { useState, useEffect, useContext } from 'react'
import { getALLiked } from '../utils/likeUtils';
import Image from './Image';
import './css/imageCollection.css'
import { useParams } from 'react-router-dom';
import { DogsContext } from './Context.jsx';
import ImageFav from './ImageFav.jsx';

function ImageCollection(props) {
    const { imgArr, txtWithoutImg, preId } = props;

    if (!imgArr) {
        return <div className='dogBox'>
            <span>  {txtWithoutImg} </span>
        </div>
    } else {
        return <div className='dogBox'>
            {imgArr.map((item, i) => {
                if (typeof item == 'object') {
                    return <ImageFav key={i + preId} src={item.imgSrc} />
                }
                return <Image key={i + preId} src={item} />
            }
            )}
        </div>
    }
}

export function BreedImage() {
    const [imageUrl, setImageUrl] = useState([]);
    const [textErr, setErr] = useState('Loading');
    const params = useParams();
    useEffect(() => {
        fetch(`https://dog.ceo/api/breed/${params.breed}/images/random/20`)
            .then(res => res.json())
            .then(obj => {
                if (obj.status == "success") {
                    setImageUrl(obj.message)
                } else {
                    setImageUrl();
                    setErr(obj.message);
                }
            })

    }, [params.breed]);

    return <ImageCollection
        imgArr={imageUrl}
        txtWithoutImg={textErr}
        preId={params.breed} />
}

export function FavoriteImg() {
    const { favorites } = useContext(DogsContext)

    return <ImageCollection
        imgArr={favorites}
        txtWithoutImg={"There isn't favorites"}
        preId={"favporite"} />
}

export function RandomImg() {
    const [randomImage, setRandomImage] = useState();

    useEffect(() => {
        fetch(`https://dog.ceo/api/breeds/image/random/20`)
            .then(res => res.json())
            .then(obj => setRandomImage(obj.message));
    }, []);

    return <ImageCollection
        imgArr={randomImage}
        txtWithoutImg="Loading"
        preId="random" />
}