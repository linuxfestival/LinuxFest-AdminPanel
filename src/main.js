import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Notifications from 'vue-notification';


Vue.config.productionTip = false
Vue.use(Notifications);
new Vue({
  router,
  store,
  // Notifications,
  render: function (h) { return h(App) }
}).$mount('#app')
