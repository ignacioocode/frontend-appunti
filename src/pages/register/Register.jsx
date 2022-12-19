import { useContext, useState, useEffect } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import './Register.css'
import { UserContext } from '../../context/userProvider'
import { urlApi } from '../../../secret'

const Register = () => {
    const { user, setUser, setSpinner} = useContext(UserContext)

    if (user) {
        return <Navigate to='/home' />
    }

    const initialState = {
        username: '',
        name: '',
        password: ''
    }

    const [input, setInput] = useState(initialState)
    const [registrado, setRegistrado] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser')
        if (loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            setUser(userStorage)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!input.username.trim()) {
            e.target.username.focus()
            return setError('El nombre de usuario es requerido')
        }
        if (!input.name.trim()) {
            e.target.name.focus()
            return setError('El nombre es requerido')
        }
        if (!input.password.trim()) {
            e.target.password.focus()
            return setError('La contraseña es requerida')
        }

        register()

    }
    const spinnerRegister = () => {
        setSpinner(true)
        setTimeout(() => setSpinner(false), 800)
    }

    const register = async () => {

        const usuario = {
            username: input.username,
            name: input.name,
            password: input.password
        }

        try {
            setRegistrado(false)
            const url = `${urlApi}/users`
            await axios.post(url, usuario)

            spinnerRegister()
            setRegistrado(true)

        } catch (error) {
            console.log('error en el registro')
            console.log(error.response.data)

            if (error.response.data.code === 11000){
                setError(error.response.data.error)
            }
            const errors = error.response.data.errors
            for (const msg of errors) {
                setError(msg.msg)
            }
        }
    }

    const handleChange = (e) => {
        setError(null)
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    if (registrado) {
        return <Navigate to='/' />
    }

    return (
        <div className='container-register'>
            <form onSubmit={handleSubmit}>
                <label>Registrarse</label>
                <Input type='text' placeholder="nombre de usuario" name="username" onChange={handleChange} />
                <Input type='text' placeholder="nombre" name="name" onChange={handleChange} />
                <Input type='password' placeholder='contraseña' name='password' onChange={handleChange} />
                {error !== null && <div className='error'>{error}</div>}
                <Button type='submit' text='registrarse' />
            </form>
            <p>Si ya tienes una cuenta inicia sesión<br /> <NavLink className='link-login' to='/'>iniciar sesión</NavLink></p>
        </div>
    )
}

export default Register