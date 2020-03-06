// 专门处理路由权限问题
import router from '@/router'
router.beforeEach(function (to, from, next) {
//   next()
// 拦截哪些页面
// 如果页面以/home开头
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
