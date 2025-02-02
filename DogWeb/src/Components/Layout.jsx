import { useState, useEffect, useContext } from "react";
import { FavoriteImg } from "./ImageCollections";
import './css/layout.css';
import { Link, NavLink, Outlet } from "react-router-dom";
import { PopupBtn } from "./Popup";
import './css/popup.css';
import { DogsContext } from "./Context";

function UserBox(props) {
    const { activeUser, setActiveUser } = useContext(DogsContext);
    const { name, profilePic, id } = props;

    return <div
        className={"linkUser"}
        style={activeUser == id ? { color: 'green' } : { color: 'black' }}
        onClick={() => setActiveUser(id)}>
        <img className='userImg' src={profilePic ? profilePic : "https://static.thenounproject.com/png/4154905-200.png"} alt="" />
        <h5>{name}</h5>
    </div>
}

function UsersPoup(params) {
    const { activeUser, users, favorites } = useContext(DogsContext);
    const activeUserName = users.find(user => user._id == activeUser)?.name;
    return <PopupBtn title={activeUserName || 'Choose User'}>
        <div>
            {users.map((user, i) =>
                <UserBox
                    key={i}
                    name={user.name}
                    profilePic={user?.profilePic?.imgSrc}
                    id={user._id} />
            )
            }
        </div>

    </PopupBtn>
}

function Header({ breed }) {
    return <header >
        <UsersPoup />
        <h1>Dog Images</h1>
        <nav>
            <NavLink
                to='/page/home'
                className="navlink"
                style={obj => obj.isActive ? { background: 'green' } : {}}>
                Home</NavLink>
            <NavLink
                to={`/page/${breed}`}
                className="navlink"
                style={obj => obj.isActive ? { background: 'green' } : {}}>
                Breed images</NavLink>
            <NavLink
                to='/page/favorite'
                className="navlink"
                style={obj => obj.isActive ? { background: 'green' } : {}}>
                Favorite images</NavLink>
        </nav>


    </header>
}

function SideBar() {
    const [choose, setChoose] = useState([]);

    useEffect(() => {
        fetch(`https://dog.ceo/api/breeds/list/all`)
            .then(res => res.json())
            .then(obj => setChoose(Object.keys(obj.message)))
    }, []);

    return <div className='sidebar'>
        {choose.map((item, i) => <NavLink
            to={`${item}`}
            className="navlink"
            key={i}>
            {item}</NavLink>)
        }
    </div >
}

export function Layout() {
    return (
        <div className='contain'>
            <Header />
            <SideBar />
            <Outlet />
        </div>
    )
}