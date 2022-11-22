import {createRouter, createWebHashHistory} from "vue-router";
import OsuToAss from "views/OsuToAss.vue"


const routes= [
  {
    path: '/',
    redirect: '/OsuToAss'
  },
  {
    path: '/OsuToAss',
    component: () => import('views/OsuToAss.vue'),
    name: 'OsuToAss'
  },

]
const router = createRouter({
  routes,
  history:createWebHashHistory()
})

export default router;
