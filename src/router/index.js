import {createApp} from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router'
import { constantRouterMap } from '@/config/router.config'
var Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap
});
// hack router push callback
/*
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
*/
const Vue = createApp({});
Vue.use(Router)

export default Router;
