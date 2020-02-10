import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/components/Login'], resolve)
const Handbook = resolve => require(['@/components/Handbook'], resolve)
const User = resolve => require(['@/components/User'], resolve)
const bag = resolve => require(['@/components/bag'], resolve)
const ball = resolve => require(['@/components/ball'], resolve)
const My = resolve => require(['@/components/My'], resolve)
const More = resolve => require(['@/components/More'], resolve)
const Home = resolve => require(['@/client/Home'], resolve)
const Shop = resolve => require(['@/client/Shop'], resolve)
const Get = resolve => require(['@/client/Get'], resolve)
const Mypokemon = resolve => require(['@/client/Mypokemon'], resolve)
const buyexp = resolve => require(['@/client/buyexp'], resolve)
Vue.use(Router)

export default new Router({
  history: false,
  saveScrollPosition: true,
  suppressTransitionError: true,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: resolve => require(['../components/Main.vue'], resolve),
      beforeEnter: (to, from, next) => {
        var data = JSON.parse(window.localStorage.getItem('user'))
        var role = JSON.parse(window.localStorage.getItem('user')).role
        if (data != null && role === '管理员') {
          next()
        } else if (role !== '管理员') {
          bus.$notify.error({
            title: '错误',
            message: '权限不足！'
          })
          next('/login')
        } else {
          bus.$notify.error({
            title: '错误',
            message: '请先登录！'
          })
          next('/login')
        }
      },
      children: [
        {
          path: '/my',
          name: 'my',
          component: My
        },
        {
          path: '/handbook',
          name: 'handbook',
          component: Handbook
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/bag',
          name: 'bag',
          component: bag
        },
        {
          path: '/ball',
          name: 'ball',
          component: ball
        },
        {
          path: '/more',
          name: 'more',
          component: More
        }
      ]
    },
    {
      path: '/',
      component: resolve => require(['../client/Main.vue'], resolve),
      beforeEnter: (to, from, next) => {
        var data = JSON.parse(window.localStorage.getItem('user'))
        if (data != null) {
          next()
        } else {
          bus.$notify.error({
            title: '错误',
            message: '请先登录！'
          })
          next('/login')
        }
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/shop',
          name: 'shop',
          component: Shop
        },
        {
          path: '/get',
          name: 'get',
          component: Get
        },
        {
          path: '/mypokemon',
          name: 'mypokemon',
          component: Mypokemon
        },
        {
          path: '/buyexp',
          name: 'buyexp',
          component: buyexp
        }
      ]
    }
  ]
})
