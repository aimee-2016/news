import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getToken } from '@/libs/util'
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
        component: () => import('../views/Video.vue'),
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('../views/Add.vue'),
      },
      {
        path: 'topic',
        name: 'topic',
        component: () => import('../views/Topic.vue'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('../views/My.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'headmain',
    component: () => import('../views/HeadMain.vue'),
    children: [
      {
        path: '/setup',
        name: 'setup',
        component: () => import('../views/setup/Setup.vue'),
        meta: { title: '设置' },
      },
      {
        path: '/editmaterials',
        name: 'editmaterials',
        component: () => import('../views/setup/EditMaterials.vue'),
        meta: { title: '编辑资料' },
      },
      {
        path: '/bindphone',
        name: 'bindphone',
        component: () => import('../views/setup/Bindphone.vue'),
        meta: { title: '绑定手机号' },
      },
      {
        path: '/changephone',
        name: 'changephone',
        component: () => import('../views/setup/Changephone.vue'),
        meta: { title: '更改手机号' },
      },
      {
        path: '/accountprivacy',
        name: 'accountprivacy',
        component: () => import('../views/setup/Accountprivacy.vue'),
        meta: { title: '账号和隐私设置' },
      },
      {
        path: '/changepassword',
        name: 'changepassword',
        component: () => import('../views/setup/Changepassword.vue'),
        meta: { title: '修改密码' },
      },
      {
        path: '/blacklist',
        name: 'blacklist',
        component: () => import('../views/setup/Blacklist.vue'),
        meta: { title: '黑名单' },
      },
      {
        path: '/msgcenter',
        name: 'msgcenter',
        component: () => import('../views/messagecenter/Msgcenter.vue'),
        meta: { title: '消息中心' },
      },
      {
        path: '/myexplosive',
        name: 'myexplosive',
        component: () => import('../views/myexplosive/MyExplosive.vue'),
        meta: { title: '我的爆料' },
      },
      {
        path: '/explosivedetail',
        name: 'explosivedetail',
        component: () => import('../views/myexplosive/ExplosiveDetail.vue'),
        meta: { title: '爆料详情' },
      },
      {
        path: '/feedbackhelp',
        name: 'feedbackhelp',
        component: () => import('../views/feedback/FeedbackHelp.vue'),
        meta: { title: '反馈与帮助' },
      },
      {
        path: '/questiondetail',
        name: 'questiondetail',
        component: () => import('../views/feedback/QuestionDetail.vue'),
        meta: { title: '问题详情' },
      },
      {
        path: '/feedback',
        name: 'feedback',
        component: () => import('../views/feedback/Feedback.vue'),
        meta: { title: '意见反馈' },
      },
      {
        path: '/aboutus',
        name: 'aboutus',
        component: () => import('../views/aboutus/Aboutus.vue'),
        meta: { title: '关于我们' },
      },
      {
        path: '/useragreement',
        name: 'useragreement',
        component: () => import('../views/aboutus/UserAgreement.vue'),
        meta: { title: '柬中资讯用户协议' },
      },
      {
        path: '/integralexplain',
        name: 'integralexplain',
        component: () => import('../views/Integral/IntegralExplain.vue'),
        meta: { title: '积分说明' },
      },
      {
        path: '/integralrecord',
        name: 'integralrecord',
        component: () => import('../views/Integral/IntegralRecord.vue'),
        meta: { title: '积分记录' },
      },
      {
        path: '/exchangerecord',
        name: 'exchangerecord',
        component: () => import('../views/Integral/ExchangeRecord.vue'),
        meta: { title: '兑换记录' },
      },
    ],
  },
  {
    path: '/articledetails',
    name: 'articledetails',
    component: () => import('../views/ArticleDetails.vue'),
  },
  {
    path: '/articlecommentdetails',
    name: 'articlecommentdetails',
    component: () => import('../views/ArticleCommentDetails.vue'),
  },
  {
    path: '/topicdetails',
    name: 'topicdetails',
    component: () => import('../views/TopicDetails.vue'),
  },
  {
    path: '/videodetails',
    name: 'videodetails',
    component: () => import('../views/VideoDetails.vue'),
  },
  {
    path: '/myhome',
    name: 'myhome',
    component: () => import('../views/MyHome.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue'),
  },
  {
    path: '/msgdetail',
    name: 'msgdetail',
    component: () => import('../views/messagecenter/Msgdetail.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/messagecenter/Chat.vue'),
  },
  {
    path: '/questionlist',
    name: 'questionlist',
    component: () => import('../views/feedback/QuestionList.vue'),
  },
  {
    path: '/focus',
    name: 'focus',
    component: () => import('../views/my/Focus.vue'),
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import('../views/my/Collection.vue'),
  },
  {
    path: '/authapply',
    name: 'authapply',
    component: () => import('../views/MyAuth/Apply.vue'),
  },
  {
    path: '/applystatus',
    name: 'applystatus',
    component: () => import('../views/MyAuth/ApplyStatus.vue'),
  },
  {
    path: '/createfiled',
    name: 'createfiled',
    component: () => import('../views/MyAuth/CreateFiled.vue'),
  },
  {
    path: '/integralcenter',
    name: 'integralcenter',
    component: () => import('../views/Integral/IntegralCenter.vue'),
  },
  {
    path: '/goodsdetails',
    name: 'goodsdetails',
    component: () => import('../views/Integral/GoodsDetails.vue'),
  },
  
  {
    path: '/exchangedetails',
    name: 'exchangedetails',
    component: () => import('../views/Integral/ExchangeDetails.vue'),
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/Integral/Order.vue'),
  },
  {
    path: '/myaddress',
    name: 'myaddress',
    component: () => import('../views/Integral/MyAddress.vue'),
  },
  {
    path: '/addaddress',
    name: 'addaddress',
    component: () => import('../views/Integral/AddAddress.vue'),
  },

  {
    path: '/releasebroke',
    name: 'releasebroke',
    component: () => import('../views/release/Broke.vue'),
  },
  {
    path: '/releasevideo',
    name: 'releasevideo',
    component: () => import('../views/release/Video.vue'),
  },
  {
    path: '/qqlogin',
    name: 'qqlogin',
    component: () => import('../views/LoginQQ.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue'),
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

const LOGIN_PAGE_NAME = 'login'
// 一、不需要登陆，就可以进入的页面

// 二、不需要token就可以调用的接口
// 文章详情和评论列表，和评论详情等
// 首页查询栏目api/front/member/findIndexColumnList.json
// 首页查询新闻、视频api/front/articles/findArticlesByColumnId.json
// 文章详情、视频、爆料详情api/front/articles/findArticlesById.json
// 文章详情、视频详情推荐列表api/front/articles/findRecommendArticles.json
// 文章、视频评论查询分页api/front/articles/findCommentPageByCondition.json
// 话题首页api/front/articles/findTopicArticles.json
// 查看话题详情api/front/articles/findArticlesTopicDetails.json
// 查询热搜 api/front/articles/findHotSearch.json
// 综合查询 api/front/articles/findComprehensive.json
// 首页查询用户 api/front/member/findMemberPageByNickName.json
// 根据问题分类查询帮助列表 api/front/help/findHelpPageByCondition.json
// 问题分类列表 api/front/help/findProblemTypeListByCondition.json
// 他的主页-个人资料 api/front/member/findMemberById.json
// 他的/我的主页-文章列表 api/front/articles/findArticlesPageByCondition.json

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = getToken()
  // next()
  if (to.name == 'home' || to.name == 'articledetails' || to.name == 'articlecommentdetails' || to.name == 'video' || to.name == 'videodetails' || to.name == 'my' || to.name == 'topic' || to.name == 'topicdetails' || to.name == 'search' || to.name == 'aboutus' || to.name == 'useragreement'|| to.name == 'qqlogin') {
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
        store.commit('setToken', {token:''})
        next({
          name: 'login'
        })
      })
    }
  }
})
export default router
