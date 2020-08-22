import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Country from '@/components/Country'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:page',
      name: 'HomePage',
      component: Home
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/country/:id',
      name: 'Country',
      component: Country
    }
  ],
  mode: 'history'
})
