import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/pages/home'
import layoutVodHome from 'components/pages/layout-manage/vod'
import Login from 'components/pages/login'
import channelList from 'components/pages/list-manage/channelList'
import genresList from 'components/pages/list-manage/genresList'
import systemStatus from 'components/pages/systemStatus'
import userList from 'components/pages/user-manage/list'
import kudosTransasction from 'components/pages/game/kudosTransasction'
import subCampList from 'components/pages/game/subCampList'
import kudosTransfer from 'components/pages/game/kudosTransfer'
import gameSubCampEdit from 'components/pages/game/editSubCampaign'
import gameCampAdd from 'components/pages/game/addCampaign'
import gameCampEdit from 'components/pages/game/editCampaign'
import profile from 'components/pages/user/profile'
import changePassword from 'components/pages/user/changePassword'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      // meta: { requiresAuth: true }
    },
    {
      path: '/layout/vod',
      name: 'layoutVodHome',
      component: layoutVodHome
    },
    {
      path: '/systemStatus',
      name: 'systemStatus',
      component: systemStatus
    },
    {
      path: '/list/channels',
      name: 'channelList',
      component: channelList
    },
    {
      path: '/list/genres',
      name: 'genresList',
      component: genresList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'userList',
      component: userList
    },
    {
      path: '/game/subcamp/list',
      name: 'subCampList',
      component: subCampList
    },
    {
      path: '/kudos/transaction',
      name: 'kudosTransasction',
      component: kudosTransasction
    },
    {
      path: '/game/subcamp/edit/:id',
      name: 'gameSubCampEdit',
      component: gameSubCampEdit
    },
    {
      path: '/game/camp/edit/:id',
      name: 'gameCampEdit',
      component: gameCampEdit
    },
    {
      path: '/kudos/transfer',
      name: 'kudosTransfer',
      component: kudosTransfer
    },
    {
      path: '/game/camp/add',
      name: 'gameCampAdd',
      component: gameCampAdd
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/user/password/change',
      name: 'changePassword',
      component: changePassword
    }
  ]
})
