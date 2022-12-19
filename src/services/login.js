import axios from 'axios'
import {urlApi} from '../../secret'

export const login = async (user) => {
    try {
        const url = `https://notasdepana.onrender.com/login`
        const res = await axios.post(url, user)
        const { data } = res
        return data
    } catch (error) {
        console.log('ocurrio un error en el login')
        console.log(error.response.data.error)
    }
}