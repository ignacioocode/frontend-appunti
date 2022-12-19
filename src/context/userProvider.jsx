import { createContext, useState } from "react";

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [notes, setNotes] = useState(null)
    const [error, setError] = useState(false)
    const [openCreateNote, setOpenCreateNote] = useState(false)
    const [openUpdateNote, setOpenUpdateNote] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openLogout, setOpenLogout] = useState(false)
    const [nota, setNota] = useState(null)
    const [search, setSearch] = useState('')
    const [spinner, setSpinner] = useState(false)

    let searchNote = []

    if (!searchNote >= 1) {
        searchNote = notes
    } else {
        if(notes !== null){
        searchNote = notes.filter(note => {
            const contentNotes = note.content.toLowerCase()
            const contentSearch = search.toLocaleLowerCase()
            return contentNotes.includes(contentSearch)
        })
    }
    }

    return (
        <UserContext.Provider value={{ 
            user, 
            setUser, 
            error, 
            setError, 
            openCreateNote, 
            setOpenCreateNote, 
            notes, 
            setNotes,
            search,
            setSearch,
            searchNote,
            openUpdateNote,
            setOpenUpdateNote,
            nota,
            setNota, 
            spinner, 
            setSpinner, 
            openConfirm, 
            setOpenConfirm, 
            openLogout, 
            setOpenLogout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider