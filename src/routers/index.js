import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      hasAuth: true
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hasAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.hasAuth) {
    const loginState = true
    if (loginState) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
