import Cookies from 'js-cookie'
import config from '@/libs/config.js'

export const TOKEN_KEY = 'token'

const { cookieExpires} = config

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}