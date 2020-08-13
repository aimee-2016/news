import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getToken, setToken } from '@/libs/util'
import config from '@/libs/config'
const { homeName } = config

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('../views/Video.vue')
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('../views/Add.vue')
      },
      {
        path: 'topic',
        name: 'topic',
        component: () => import('../views/Topic.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('../views/My.vue')
      },
    ]
  },
  {
    path: '/topicdetails',
    name: 'topicdetails',
    component: () => import('../views/TopicDetails.vue')
  },
  {
    path: '/myhome',
    name: 'myhome',
    component: () => import('../views/MyHome.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


const LOGIN_PAGE_NAME = 'login'

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (to.name == 'home' || to.name == 'video' || to.name == 'my' || to.name == 'topic' || to.name == 'topicdetails' || to.name == 'myhome' || to.name == 'test') {
    next()
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (store.state.userInfo) {
      next()
    } else {
      store.dispatch('getUserInfo').then(() => {
        next()
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})
export default router
