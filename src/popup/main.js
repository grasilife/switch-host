import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./plugins/ant-design-vue";
import "./plugins/md5";
import "./plugins/random-hash";
import "./common/styles//global.less";
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
