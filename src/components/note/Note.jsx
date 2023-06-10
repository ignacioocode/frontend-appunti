import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userProvider"
import { getNoteId, updateNote } from "../../services/getNotes"
import './Note.css'

const Note = ({nota}) => {
    const { user, setOpenUpdateNote, setNota, setSpinner, setOpenConfirm} = useContext(UserContext)
    if(!user){
        return <Navigate to='/' />
    }

    const navigate = useNavigate()
    const [button, setButton] = useState(false)
    const [input, setInput] = useState({
        content: nota.content,
        important: false
    })

    const handleChange = (e) => {
        setButton(true)
        const {name, type, checked, value} = e.target
        setInput({
            ...input,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!input.content.trim()) {
            e.target.content.focus()
            return
        }

        const newNote = {
            content: input.content,
            important: input.important
        }

        try {
            setOpenUpdateNote(false)
            setSpinner(true)

            const { token } = user

            await updateNote(newNote, nota.id, { token })
            await getNoteId(nota.id, setNota, { token })

        } catch (error) {
            console.log(error)
        } finally {
            setSpinner(false)
            navigate('/home')
        }

    }


    return (
        <>
            <div className="username">
                <h2>@{user.username}</h2>
            </div>
            <textarea className="container" value={input.content} name='content'  onChange={handleChange}/>
                {/* <div className="content">{nota.content}</div>
                <div className="date">
                    <p>Creado: <br/>{nota.createdAt.split('T')[0]} - {nota.createdAt.split('T')[1].split('.')[0]}</p>
                    <p>Editado: <br/>{nota.updatedAt.split('T')[0]} - {nota.updatedAt.split('T')[1].split('.')[0]}</p>
                </div> */}
            <div className="icon">
                <button disabled={!button ? true : false} onClick={handleSubmit} style={{ color: `${button ? '#27ab67' : '#666'}`}} className="edit">Guardar</button>
                <button onClick={() => setOpenConfirm(true)} className="delete">Eliminar</button>
            </div>
        </>
    )
}

export default Note