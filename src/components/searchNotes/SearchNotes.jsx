import { useContext } from "react"
import { UserContext } from "../../context/userProvider"
import Input from "../input/Input"
import './SearchNotes.css'

const SearchNotes = () => {

    const { search, setSearch} = useContext(UserContext)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="container-search">
            <form>
                <Input type='text' placeholder='Buscar nota' value={search} onChange={handleChange} />
            </form>
        </div>
    )
}

export default SearchNotes