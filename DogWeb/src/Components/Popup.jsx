import React, { useContext, useState } from 'react'
import './css/popup.css'
import { getUser } from '../utils/userUtils';
import { DogsContext } from './Context.jsx';

// export const Popup = () => {
//     const [appear, setAppear] = useState('none');
//     const changeStatus = () => {
//         setAppear(appear == 'none' ? 'block' : 'none')
//     }

//     return (
//         <div>
//             <button
//                 className='myBtn'
//                 onClick={changeStatus}>
//                 {appear == 'none' ? "open" : "close"}
//             </button>
//             <div
//                 className="txtArea"
//                 style={{ display: `${appear}` }}>

//                 <div
//                     className='close'
//                     onClick={changeStatus}>
//                     x</div>

//             </div>
//         </div>
//     )
// }

export const PopupBtn = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='popupContainet' >
            <button
                className='myPopup'
                onClick={() => setIsOpen((prev) => !prev)}>
                {title}
            </button>
            <>{
                isOpen && <div className='txtArea'>
                    <div
                        className='closePopup'
                        onClick={() => setIsOpen(false)}>
                        x</div>
                    {children}
                </div>
            }</>
        </div>
    )
}


