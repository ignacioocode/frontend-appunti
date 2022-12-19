import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faPencilSquare, faUserAlt, faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { NavLink} from 'react-router-dom'
import { UserContext } from "../../context/userProvider"
import './Navbar.css'
import Logout from "../logout/Logout"

const Navbar = () => {

    const { user, setUser, openLogout, setOpenLogout, setSpinner} = useContext(UserContext)

    const logout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedInUser')
        // window.localStorage.removeItem('notes')
        setOpenLogout(false)
    }

    return (
        <header>
            <nav>
                {user ? 
                    (<NavLink className='home-icon' onClick={() => {
                        setSpinner(true)
                        setTimeout(() => setSpinner(false), 800)
                    }} to='/home'><FontAwesomeIcon icon={faHouseChimneyUser} /></NavLink>) : 
                (<div className="title">
                        <h1>NotasDePana</h1>
                        <FontAwesomeIcon className="title-icon" icon={faPencilSquare} />
                    </div>
                )}
                {user && (
                    <div>
                        <NavLink to={`/${user.username}`} >
                            <FontAwesomeIcon className="user" icon={faUserAlt} />
                        </NavLink>
                            <FontAwesomeIcon onClick={() => setOpenLogout(true)} className="logout" icon={faRightFromBracket} />
                    </div>
                )}
            </nav>
            {openLogout && <Logout logout={logout}/>}
        </header>
    )
}

export default Navbar