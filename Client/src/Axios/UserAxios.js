import axios from 'axios'
import { BaseUrl } from '../Constants/BaseUrl'


export const axiosInstance = axios.create({
    baseURL:BaseUrl
})