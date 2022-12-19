import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../context/userProvider"
import './Note.css'

const Note = ({nota}) => {

    const { user, setOpenUpdateNote, setOpenConfirm} = useContext(UserContext)

    if(!user){
        return <Navigate to='/' />
    }

    return (
        <>
            <div className="username">
                <h2>@{user.username}</h2>
            </div>
            <div className="container">
                <div className="content">{nota.content}</div>
                <div className="date">
                    <p>Creado: <br/>{nota.createdAt.split('T')[0]} - {nota.createdAt.split('T')[1].split('.')[0]}</p>
                    <p>Editado: <br/>{nota.updatedAt.split('T')[0]} - {nota.updatedAt.split('T')[1].split('.')[0]}</p>
                </div>
            </div>
            <div className="icon">
                <div onClick={() => setOpenUpdateNote(true)} className="edit"><FontAwesomeIcon icon={faPenToSquare} /></div>
                <div onClick={() => setOpenConfirm(true)} className="delete"><FontAwesomeIcon icon={faTrashCan}  /></div>
            </div>
        </>
    )
}

export default Note