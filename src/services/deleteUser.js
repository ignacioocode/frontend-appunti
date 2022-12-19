import axios from 'axios'
import { urlApi } from '../../secret'

export const deleteUser = async ({id, token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${urlApi}/users/${id}`
        const res = await axios.delete(url, config)
        const { data } = res
        return data
    } catch (error) {
        console.log('error al eliminar el usuario')
    }
}