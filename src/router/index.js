import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import SecondHome from '@/views/home/secondhome/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 配置二级路由
    children: [
      {
        path: '', // 什么都不写代表 代表二级路由默认组件
        component: SecondHome
      },
      {
        path: 'material',
        component: () => import('@/views/material')
      },
      {
        path: 'comment', // 地址
        component: () => import('@/views/comment')// 组件
      }

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

//   {
//     //按需加载
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]

const router = new VueRouter({
  routes
})

export default router
