import ReactDOM from "react-dom"
import Button from '../button/Button'
import './UpdateNote.css'
import { useContext, useState } from "react"
import { UserContext } from "../../context/userProvider"
import { getNoteId, updateNote } from "../../services/getNotes"
import Checkbox from "../checkbox/Checkbox"

const UpdateNote = ({nota}) => {

    const { user, setOpenUpdateNote, setNota, setSpinner } = useContext(UserContext)

    const initialState = {
        content: nota.content,
        important: false
    }

    const [input, setInput] = useState(initialState)

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
        }

    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    return ReactDOM.createPortal(
        <div className="container-updateNote">
            <div className="container-form">
                <form onSubmit={handleSubmit}>
                    <label>Editar nota</label>
                    <textarea type='text' placeholder='ingresa nueva nota' name='content' onChange={handleChange} />
                    <div className="container-checkbox">
                        <p>marcar como importante</p>
                        <Checkbox id='update' type='checkbox' name='important' onChange={handleChange} />
                    </div>
                    <div className="container-button">
                        <Button text='Guardar' />
                        <Button className='cancel' onClick={() => setOpenUpdateNote(false)} text='cancelar' />
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('updateNote')
    )
}

export default UpdateNote