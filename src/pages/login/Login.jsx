import { useContext, useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import './Login.css'
import { UserContext } from '../../context/userProvider'
import Spinner from '../../components/spinner/Spinner'
import { urlApi } from '../../../secret'

const Login = () => {
    const { user, setUser, setSpinner, spinner } = useContext(UserContext)

    if (user) {
        return <Navigate to='/home' />
    }
    

    const initialState = {
        username: '',
        password: ''
    }

    const [input, setInput] = useState(initialState)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser')
        if(loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            setUser(userStorage)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!input.username.trim()) {
            e.target.username.focus()
            return setError('Nombre de usuario requerido')
        }
        if(!input.password.trim()) {
            e.target.password.focus()
            return setError('Contraseña requerida')
        }

        login()
 
    }

    const login = async () => {
        const initiated = {
            username: input.username,
            password: input.password
        }

        try {
            setSpinner(true)
            const url = `${urlApi}/login`
            const res = await axios.post(url, initiated)
            const { data } = res

            if (data) {
                window.localStorage.setItem('loggedInUser', JSON.stringify(data))
            }
            setUser(data)

        } catch (error) {
            console.log(error.response.status)
            setError(error.response.data.error)
            setSpinner(false)
        } finally {
            setSpinner(false)
        }
    }

    const handleChange = (e) => {
        setError(null)
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    return (
        <div className='container-login'>
            {spinner ? <Spinner /> : (
            <>
                <form onSubmit={handleSubmit}>
                    <label>Iniciar sesión</label>
                    <Input type='text' placeholder="nombre de usuario" name="username" onChange={handleChange} />
                    <Input type='password' placeholder='contraseña' name='password' onChange={handleChange} />
                    {error !== null && <div className='error'>{error}</div>}
                    <Button type='submit' text='iniciar'/>
                </form>
                <p>Regístrate para iniciar sesión<br /> <NavLink className='link-register' to='/register'>registrarse</NavLink></p>
            </>
            )}
        </div>
    )
}

export default Login