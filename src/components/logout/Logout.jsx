import ReactDOM from "react-dom"
import './Logout.css'
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/userProvider"

const Logout = ({logout}) => {

    const { setOpenLogout, setSpinner } = useContext(UserContext)

    const spinnerLogout = () => {
        setSpinner(true)
        setTimeout(() => setSpinner(false), 800)
    }

    return ReactDOM.createPortal(
        <div className="container-logout">
            <div className="container-modal">
                <div className="content">
                    <p>¿Quieres cerrar sesión?</p>
                    <div className="container-button">
                        <button onClick={() => setOpenLogout(false)}>cancelar</button>
                        <NavLink className='delete' to='/home' onClick={() => {
                            logout()
                            spinnerLogout()
                        }}>cerrar</NavLink>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('logout')
    )
}

export default Logout