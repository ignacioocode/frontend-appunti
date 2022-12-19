import { NavLink} from 'react-router-dom'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './NotesList.css'

const NotesList = ({note}) => {

    return (
        <NavLink className='note-link' to={`/details/${note.id}`}>
            <li>
                <div className="icon">
                    <p>{note.createdAt.split('T')[0]}</p>
                    <FontAwesomeIcon className="info" icon={faCircleInfo} />
                </div>
                <div className="note">
                    {note.content}
                </div>
            </li>
        </NavLink>
    )
}

export default NotesList