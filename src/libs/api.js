import axios from '@/libs/api.request.js'
export const login = ({ userName, password }) => {
    const data = {
      userName,
      password
    }
    return axios.request({
      url: 'api/front/member/login.json',
      data,
      method: 'post'
    })
  }
  
  export const getUserInfo = (token) => {
    return axios.request({
      url: 'get_info',
      params: {
        token
      },
      method: 'post'
    })
  }
  
  export const logout = () => {
    return axios.request({
      url: 'api/front/member/loginOut.json',
      method: 'post'
    })
  }