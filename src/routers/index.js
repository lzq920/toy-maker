import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/list'
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName:"signup" */'../views/SignUp')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "home" */ '../views/Create.vue')
  }, {
    path: '/edit/:id/',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/Create.vue')
  }, {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName:"list" */'../views/List.vue')
  }, {
    path: '/publish',
    name: 'Publish',
    component: () => import(/* webpackChunkName:"publish" */'../views/Publish.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  next()
})

export default router
