import { useContext, useEffect } from "react"
import { UserContext } from "../../context/userProvider"
import { Navigate } from 'react-router-dom'
import { deleteUser } from "../../services/deleteUser"
import { deleteNote } from "../../services/getNotes"
import './profile.css'
import Confirm from "../../components/confirm/Confirm"
import Spinner from "../../components/spinner/Spinner"

const Profile = () => {

    const { user, setUser, notes, openConfirm, setOpenConfirm, spinner, setSpinner } = useContext(UserContext)

    if(!user){
        return <Navigate to='/'/>
    }

    useEffect(() => {
        setSpinner(true)
        window.scroll({ top: 0 })
        setOpenConfirm(false)
        const loggedUser = window.localStorage.getItem('loggedInUser')
        if (loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            setUser(userStorage)
        }
        setTimeout(() => setSpinner(false), 800)
    }, [])

    const spinnerLogout = () => {
        setSpinner(true)
        setTimeout(() => setSpinner(false), 2000)
    }

    const deleteUsers = async () => {
        const { id, token } = user
        try {
            setSpinner(true)
            for (const note of notes){
                await deleteNote(note.id, {token})
            }
            await deleteUser({id, token})
            setUser(null)
            window.localStorage.removeItem('loggedInUser')
            spinnerLogout()
        } catch (error) {
            console.log('ocurrio un error')
        }
 
    }

    return (
        <>
        {spinner ? <Spinner/> : 
        <div className="profile-container">
            <div>
                <h2>@{user.username}</h2>
                <ul>
                    <li>nombre de usuario: {user.username}</li><hr/>
                    <li>Nombre: {user.name}</li><hr />
                    <li>Notas totales: {notes.length}</li><hr />
                </ul>
                <button onClick={() => setOpenConfirm(true)}>Eliminar cuenta</button>
            </div>
            {openConfirm && 
                <Confirm 
                    aceptar={deleteUsers}
                    cancelar={() => setOpenConfirm(false)} 
                    aceptarTxt='eliminar' 
                    cancelarTxt='cancelar' 
                    txt='¿Seguro que quieres eliminar tu cuenta?' 
                    txt2='Tus notas se eliminarán' />
            }
        </div>}
        </>
    )
}

export default Profile