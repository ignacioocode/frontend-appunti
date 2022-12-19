import ReactDOM from "react-dom"
import Button from '../button/Button'
import './CreateNote.css'
import { useContext, useState } from "react"
import { UserContext } from "../../context/userProvider"
import { createNote } from "../../services/getNotes"
import { getUser } from "../../services/getNotes"
import Checkbox from "../checkbox/Checkbox"

const CreateNote = () => {

    const { setOpenCreateNote, user, setNotes, setSpinner } = useContext(UserContext) 

    const initialState = {
        content: '',
        important: false
    }

    const [input, setInput] = useState(initialState)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!input.content.trim()) {
            e.target.content.focus()
            console.log('no dejí la wea vacia po loko')
            return
        }

        const newNote = {
            content: input.content,
            important: input.important
        }
        try {
            setOpenCreateNote(false)
            setSpinner(true)
            const {token, id} = user
    
            await createNote(newNote, {token})
            await getUser({ id }, setNotes, {token})
            
        } catch (error) {
            console.log(error)
        } finally {
            setSpinner(false)
        }


    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]:  e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    return ReactDOM.createPortal(
        <div className="container-createNote">
            <div className="container-form">
                <form onSubmit={handleSubmit}>
                    <label>Crear nueva nota</label>
                    <textarea type='text' placeholder='ingresa nueva nota' name='content' onChange={handleChange} />
                    <div className="container-checkbox">
                        <p>marcar como importante</p>
                        <Checkbox id='important' type='checkbox' name='important' onChange={handleChange} />
                    </div>
                    <div className="container-button">
                        <Button text='Crear'/>
                        <Button className='cancel' onClick={() => setOpenCreateNote(false)} text='cancelar'/>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('createNote')
    )
}

export default CreateNote