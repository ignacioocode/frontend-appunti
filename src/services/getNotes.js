import axios from 'axios'
import { urlApi } from '../../secret'

export const getUser = async ({ id }, state, {token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${urlApi}/users/${id}`
        const res = await axios.get(url, config)
        state(res.data.notes)
    } catch (error) {
        console.log('ocurrio un error al obtener el usuario')
    }
}

export const getNoteId = async (id, state, { token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${urlApi}/notes/${id}`
        const res = await axios.get(url, config)
        const { data } = res
        state(data)
    } catch (error) {
        console.log('ocurrio un error al obtener la nota')
    }
}

export const createNote = async (nota, { token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${urlApi}/notes`
        const res = await axios.post(url, nota, config)
        const { data } = res
        return data     
    } catch (error) {
        console.log('error al crear la nota')
    }
}

export const deleteNote = async (id, {token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${urlApi}/notes/${id}`
        const res = await axios.delete(url, config)
        const {data} = res
        return data
    } catch (error) {
        console.log('error en el delete')
    }
}

export const updateNote = async (content, id, {token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${urlApi}/notes/${id}`
        const res = await axios.put(url, content, config)
        const { data } = res
        return data
    } catch (error) {
        console.log('ocurrio un error en el update')
    }
}