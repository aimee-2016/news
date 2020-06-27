import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/libs/axios'
import { setToken, getToken } from '@/libs/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken()
  },
  mutations: {
    // 'SET_TOKEN'(state, data) {
    //   state.token = data
    // },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password,loginType,codeArea }) {
      userName = userName.trim()
        let params = {}
        if(loginType=='PASSWORD') {
          params= {
            account: userName,
            passWord: password,
            codeArea: codeArea,
            loginType: loginType
          }
        } else {
          params= {
            phone: userName,
            sysCode: password,
            codeArea: codeArea,
            loginType: loginType
          }
        }
        axios.post('api/front/member/login.json', params).then(response => {
          console.log(22)
          console.log(response)
            commit('setToken', response.data.accessToken)
        }).catch(function(error) {
          console.log(error);
        });
    },
    // 退出登录
    // handleLogOut ({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('setToken', '')
    //       commit('setAccess', [])
    //       resolve()
    //     }).catch(err => {
    //       reject(err)
    //     })
    //     // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
    //     // commit('setToken', '')
    //     // commit('setAccess', [])
    //     // resolve()
    //   })
    // },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      axios.post('api/front/member/findMember.json', params).then(response => {
        console.log(22)
        console.log(response)
          // commit('setToken', response.data.accessToken)
      }).catch(function(error) {
        console.log(error);
      });
      // return new Promise((resolve, reject) => {
      //   try {
      //     getUserInfo(state.token).then(res => {
      //       const data = res.data
      //       commit('setAvatar', data.avatar)
      //       commit('setUserName', data.name)
      //       commit('setUserId', data.user_id)
      //       commit('setAccess', data.access)
      //       commit('setHasGetInfo', true)
      //       resolve(data)
      //     }).catch(err => {
      //       reject(err)
      //     })
      //   } catch (error) {
      //     reject(error)
      //   }
      // })
    },
  },
  modules: {
  }
})
