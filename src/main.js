import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//样式
import 'reset.css';
import './assets/css/base.css';

//font-awesome
import "font-awesome/css/font-awesome.min.css"

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
