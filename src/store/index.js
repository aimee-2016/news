import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/libs/axios'
import { setToken, getToken } from '@/libs/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    tokenType: '',
    userInfo: null
  },
  mutations: {
    // 'SET_TOKEN'(state, data) {
    //   state.token = data
    // },
    setToken(state, { token, tokenType }) {
      state.token = token
      state.tokenType = tokenType
      setToken(token)
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
  },
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password, loginType, codeArea }) {
      return new Promise((resolve, reject) => {
        userName = userName.trim()
        let params = {}
        if (loginType == 'PASSWORD') {
          params = {
            account: userName,
            passWord: password,
            codeArea: codeArea,
            loginType: loginType
          }
        } else {
          params = {
            phone: userName,
            sysCode: password,
            codeArea: codeArea,
            loginType: loginType
          }
        }
        axios.post('api/front/member/login.json', params).then(response => {
          commit('setToken', { token: response.data.accessToken, tokenType: response.data.tokenType })
          resolve()
        }).catch(function (error) {
          reject(error);
        });
      })
    },
    // 退出登录
    handleLogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post('api/front/member/loginOut.json').then(() => {
          commit('setToken', '')
          resolve()
        }).catch(function (error) {
          reject(error);
        });
      })
    },
    // 获取用户相关信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post('api/front/member/findMember.json').then(response => {
          console.log(33)
          console.log(response)
          commit('setUserInfo', response.data)
          resolve()
        }).catch(function (error) {
          reject(error);
        });
      })
    },
  },
  modules: {
  }
})
