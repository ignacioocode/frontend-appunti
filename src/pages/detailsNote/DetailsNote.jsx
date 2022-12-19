import { useContext, useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import Confirm from "../../components/confirm/Confirm"
import Note from "../../components/note/Note"
import Spinner from "../../components/spinner/Spinner"
import UpdateNote from "../../components/updateNote/UpdateNote"
import { UserContext } from "../../context/userProvider"
import { deleteNote, getNoteId } from "../../services/getNotes"

const DetailsNote = () => {

    const { openUpdateNote, user, setUser, nota, setNota, spinner, setSpinner, openConfirm, setOpenConfirm } = useContext(UserContext)

    if (!user) {
        return <Navigate to='/'/>
    }

    const params = useParams()
    const { token } = user

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser')
        if (loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            setUser(userStorage)
        }
    }, [])

    useEffect(() => {
        setOpenConfirm(false)
        window.scroll({ top: 0 })
        setSpinner(true)
        getNoteId(params.id, setNota, { token })
        setTimeout(() => {
            setSpinner(false)
        }, 800)
    },[])

    const deletenote = async () => {
        const { token } = user
        await deleteNote(nota.id, { token })
        setOpenConfirm(false)
    } 

    return (
        <>
            {spinner ? 
            <Spinner /> : 
            <div className="container-note">
                {nota !== null && <Note nota={nota} />}
            </div>}
            {openUpdateNote && <UpdateNote nota={nota}/>}
            {openConfirm && 
                <Confirm 
                    aceptar={deletenote} 
                    cancelar={() => setOpenConfirm(false)} 
                    aceptarTxt='eliminar' 
                    cancelarTxt='cancelar' 
                    txt='¿Quieres eliminar esta nota?' />
            }
        </>
    )
}

export default DetailsNote