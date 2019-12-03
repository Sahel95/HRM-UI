// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

require('./assets/bootstrap-rtl.css')
require('./assets/sb-admin-rtl.scss')
require('./assets/style.scss')

import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import router from './router'
import VueTextareaAutosize from 'vue-textarea-autosize'
import config from '../config/config'

Vue.use(VueTextareaAutosize)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

Vue.http.options.xhr = { withCredentials : true }
Vue.http.options.emulateJSON = true
// console.log(router.history.current)
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Access-Control-Allow-Origin', '*')
  // console.log(request.headers.get('Authorization',false))
  if (window.localStorage.getItem('isAuthenticated', false))
    request.headers.set('Authorization', window.localStorage.getItem('token'))
    // request.headers.set('Authorization', 'Basic c29yb3VzaDoxMjNxd2U=')

  request.body = JSON.stringify(request.body)

  next(res => {
    // console.log(res)
    if ((res.status === 401) && router.history.current.name != 'Login') {
      Vue.localStorage.remove('isAuthenticated')
      Vue.localStorage.remove('token')
      Vue.localStorage.remove('user')

      window.location.href = '/login?ref=' + encodeURI(window.location.pathname)
    }
  })
})

// var viewTypes = require('./ViewTypes.json')

Vue.mixin({
  data: function() {
    return {
      get viewTypes() {
        return require('./ViewTypes.json');
      },
      get VodModules() {
        return require('./VodModules.json');
      },
      get baseUrl() {
        return config.baseUrl;
      },
      get lenzStatic() {
        return config.staticUrl;
      }
    }
  }
})


// router.beforeEach((to, from, next) => {
//   var public_endpoints = ['Login']

//   // console.log(to)
//   // console.log(next)


//   if (public_endpoints.indexOf(to.name) == -1) {

//     if (!window.localStorage.getItem('isAuthenticated', false)) {
//       next({
//         path: '/login',
//         query: { ref: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     if(to.name == 'Login' && window.localStorage.getItem('isAuthenticated', false) ){
//       next({
//         path: '/'
//       })
//     }
//     else{
//       next()
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
