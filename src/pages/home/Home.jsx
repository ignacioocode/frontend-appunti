import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import NotesList from '../../components/notesList/NotesList'
import { UserContext } from '../../context/userProvider'
import { getUser } from '../../services/getNotes'
import './Home.css'
import CreateNoteButton from '../../components/createNoteButton/CreateNoteButton'
import CreateNote from '../../components/createNote/CreateNote'
import SearchNotes from '../../components/searchNotes/SearchNotes'
import Empty from '../../components/empty/Empty'
import Checkbox from '../../components/checkbox/Checkbox'
import Spinner from '../../components/spinner/Spinner'

const Home = () => {
    const { user, openCreateNote, notes, setNotes, searchNote, spinner, setSpinner, setSearch, search } = useContext(UserContext)
    
    if(!user) {
        return <Navigate to='/' />
    }
    const [check, setCheck] = useState(false)

    const onCheck = (e) => {
        setCheck(e.target.checked)
    }
    let important = []

    if(notes){
        important = notes.filter(note => note.important === true)
    }

    useEffect(() => {
        setSearch('')
        setSpinner(true)

        window.scroll({ top: 0 })

        const { id, token } = user
        getUser({id}, setNotes, {token})

        setTimeout(() => setSpinner(false), 800)
    }, [])

    const Message = ({text}) => <p className='message'>{text}</p> 

    return (
        <>
                {spinner ? <Spinner/> : (
            <div className='home'>
                <SearchNotes/>
                <div className='important'>
                    <p>filtrar notas importantes</p>
                    <Checkbox id="toggler-1" name="toggler-1" type="checkbox" value="1" onChange={onCheck} />
                </div>
                    <div className='container-notesList'>
                    {(check && important.length === 0) && <Message text='No hay notas importantes'/>}
                    {(searchNote.length === 0 && search === '' ) && <Empty/>}
                    {(searchNote.length === 0 && search !== '') && <Message text={`No hay resultados de "${search}"`}/>}
                        <ul>
                            {notes !== null && (
                            check ? 
                                important.map(note => (
                                    <NotesList key={note.id} note={note} />
                                )).reverse() :
                                searchNote.map(note => (
                                    <NotesList key={note.id} note={note} />
                                )).reverse()
                            )}
                        </ul>
                    </div>
            </div>
                )}    
            <CreateNoteButton/>
            { openCreateNote && <CreateNote/> }
        </>
    )
}

export default Home