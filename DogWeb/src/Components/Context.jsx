import { createContext, useState, useEffect } from 'react'
import { changeProfile, createFavorite, createUser, deleteFav, deleteUser, getFavorite, getUsers, updateFavName } from '../utils/api';

export const DogsContext = createContext()

const DogsContextProvider = ({ children }) => {
    const [activeUser, setActiveUser] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [users, setUsers] = useState([]);
    const [userPic, setUserPic] = useState('');
    // Favorites
    const updateFavorites = () => {
        activeUser && getFavorite(activeUser).then(setFavorites)
    };
    useEffect(() => {
        updateFavorites()
    }, [activeUser]);
    const addToFavorites = (imgSrc) => {
        createFavorite(activeUser, imgSrc)
            .then(updateFavorites)
            .then(setFavorites)
            .catch(err => console.error(err))
    };
    const removeFromFavorites = (favId) => {
        deleteFav(activeUser, favId)
            .then(updateFavorites)
            .then(setFavorites)
            .catch(err => console.error(err))
    };
    // Users
    const updateUsers = () => getUsers().then(setUsers);
    useEffect(() => {
        updateUsers()
    }
        , []);
    const addUser = (name) => {
        createUser(name).then(updateUsers)
    };
    const removeUser = (id) => {
        deleteUser(id).then(updateUsers)
    };
    // cange Name
    const changeFavName = (favId, name) =>
        updateFavName(activeUser, favId, name)
            .then(updateUsers)
    // add profile Pic
    const updateUserPic = (favId) =>
        changeProfile(activeUser, favId)
            .then(updateUsers)


    const value = {
        activeUser,
        setActiveUser,
        favorites,
        addToFavorites,
        removeFromFavorites,
        users,
        setUsers,
        addUser,
        removeUser,
        updateUserPic,
    };
    //logic
    return (
        <DogsContext.Provider value={value}>
            {children}
        </DogsContext.Provider>
    )
}

export default DogsContextProvider
