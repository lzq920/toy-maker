import { createRouter, createWebHashHistory } from 'vue-router'
import useTencentCloud from '@/hooks/useTencentCloud'

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: {
      hasAuth: true
    },
    redirect: '/list'
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: {
      hasAuth: false
    },
    component: () => import(/* webpackChunkName:"signup" */'../views/SignUp')
  },
  {
    path: '/create',
    name: 'Create',
    meta: {
      hasAuth: true
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/Create.vue')
  }, {
    path: '/edit/:id/',
    name: 'Edit',
    meta: {
      hasAuth: true
    },
    component: () => import(/* webpackChunkName: "edit" */ '../views/Create.vue')
  }, {
    path: '/list',
    name: 'List',
    meta: {
      hasAuth: true
    },
    component: () => import(/* webpackChunkName:"list" */'../views/List.vue')
  }, {
    path: '/publish',
    name: 'Publish',
    meta: {
      hasAuth: true
    },
    component: () => import(/* webpackChunkName:"publish" */'../views/Publish.vue')
  }, {
    path: '/form',
    name: 'Form',
    meta: {
      hasAuth: true
    },
    component: () => import(/* webpackChunkName:"form" */'../views/Form.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const { loginState } = useTencentCloud()
  const { hasAuth } = to.meta
  if (hasAuth) {
    if (loginState()) {
      next()
    } else {
      next('/signup')
    }
  } else {
    next()
  }
})

export default router
