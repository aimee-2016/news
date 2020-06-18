import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/news',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'news',
        name: 'News',
        component: () => import('../views/News.vue'),
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('../views/Video.vue')
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('../views/Add.vue')
      },
      {
        path: 'topic',
        name: 'Topic',
        component: () => import('../views/Topic.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
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

export default router
