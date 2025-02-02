import React, { Children, useContext, createContext, useEffect, useState } from 'react'
import './css/child.css'
import './css/popup.css'
import { PopupBtn } from './Popup'
import { NavLink } from 'react-router-dom'
import { getUser } from '../utils/userUtils'

const PageContext = createContext()


const Child = () => {
    const [myState, useMyState] = useState('first')
    const [close, setClose] = useState(true);
    const [selectUser, setSelectUser] = useState('');

    return (
        <PageContext.Provider value={{ changeTxt: useMyState }}>
            <Frame title={"This is Title"}>
                <h1>Children page</h1>
                <h1>my state == {myState}</h1>
            </Frame>
            <Container>
                <span>this is inner text </span>
                <span>this enother inner text</span>
            </Container>
            <Displayer>
                <span>First</span>
                <span>Second</span>
                <span>Theerd</span>
            </Displayer>
            <Popup2 close={close} setClose={setClose}>
                <div className="txtArea">
                    <div
                        className='close'
                        onClick={() => { setClose(!close) }}>
                        x</div>
                    Helooooooo!
                </div>
            </Popup2>
            <PopupBtn>
                {getUser().map((item, i) => <a
                    href='#'
                    onClick={() => setSelectUser(item.name)}
                    style={selectUser == item.name ?
                        { color: 'green' } : { color: 'black' }}
                    key={i}
                    className={"linkUser"}>
                    {item.name}</a>)}
            </PopupBtn>
        </PageContext.Provider>
    )
}

const Container = (props) => {
    const myContext = useContext(PageContext)

    return <div className='containerComponenta'>
        {Children.map(props.children, (child, i) => i != 1 ? <span key={i}>
            [start]
            {child}
            [end]
            <br />
        </span> : null)}
        <button onClick={() => myContext.changeTxt('second')}> change txt</button>
    </div>
}

const Frame = (props) => {
    return (
        <div>
            <legend className='frameTitle'>{props.title}</legend>
            <div className='frameBorder'>
                {props.children}
            </div>
        </div>
    )
}

const Popup2 = ({ children, close, setClose }) => {
    const [cliked, setCliked] = useState(true)
    const myContext = useContext(PageContext)
    console.log(close);

    return (
        <div>
            <button
                className='openWindow'
                onClick={() => { setCliked(!cliked) }}>
                {cliked ? "open" : "close"}</button>
            {Children.map(children,
                (child, i) => cliked ? child : "")}
        </div>
    )
}





const Displayer = ({ children }) => {
    const [numOfTxt, setNumOfTxt] = useState('1')
    // console.log(Children.count(props.children));
    console.log(children);
    useEffect(() => {
        if (numOfTxt > Children.count(children)) {
            setNumOfTxt(1)
        } else if (numOfTxt < 1) {
            setNumOfTxt(Children.count(children))
        }
    }, [numOfTxt])

    return (
        <div>
            <input
                type="number"
                value={numOfTxt}
                onChange={e => setNumOfTxt(e.target.value)} />
            {Children.count(children) == 1 ? children : children[numOfTxt - 1]}
        </div>
    )
}




export default Child