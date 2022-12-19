import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { UserContext } from '../../context/userProvider'

const CreateNoteButton = () => {

    const { setOpenCreateNote, setSearch } = useContext(UserContext)

    return (
        <button onClick={() => {
            setOpenCreateNote(true)
            setSearch('')
            window.scroll({top: 0, behavior: 'smooth'})
        }} className='container-newNote'>
            <FontAwesomeIcon className='newNoteButton' icon={faCirclePlus} />
        </button>
    )
}

export default CreateNoteButton