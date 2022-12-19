import ReactDOM from "react-dom"
import './Confirm.css'
import { NavLink } from "react-router-dom"

const Confirm = ({ cancelarTxt, aceptarTxt, aceptar, cancelar, txt, txt2 }) => {

    return ReactDOM.createPortal(
        <div className="container-deleteNote">
            <div className="container-modal">
                <div className="content">
                    <p>{txt}<br/> {txt2}</p>
                    <div className="container-button">
                        <button onClick={cancelar}>{cancelarTxt}</button>
                        {txt === '¿Quieres eliminar esta nota?' ? 
                            <NavLink className='delete' to='/home' onClick={aceptar}>{aceptarTxt}</NavLink> : 
                            <button className='delete' onClick={aceptar}>{aceptarTxt}</button>}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('confirm')
    )
}

export default Confirm