import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/libs/axios'
import { setToken, getToken } from '@/libs/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    userInfo: null
  },
  mutations: {
    // 'SET_TOKEN'(state, data) {
    //   state.token = data
    // },
    setToken(state, { token }) {
      state.token = token
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
          "登录接口返回的tokenType+半角空格+登录返回的token"
          commit('setToken', { token: response.data.tokenType+' '+response.data.accessToken})
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
          commit('setToken', {token:''})
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
          // console.log(33)
          // console.log(response)
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
