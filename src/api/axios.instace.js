import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:4000/',
})

api.interceptors.request.use(
    config => {
      config.headers['Authorization'] = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export { api }