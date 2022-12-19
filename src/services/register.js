import axios from 'axios'
import { urlApi } from '../../secret'

export const register = async (registro) => {
    try {
        const url = `${urlApi}/users`
        const res = await axios.post(url, registro)
        const { data } = res
        return data
    } catch (error) {
        console.log('error en el registro')
        console.log(error.response.data.errors)
    }
}