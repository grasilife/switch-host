import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./plugins/element-ui";
import "./plugins/view-design";
import "./common/styles//global.less";
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
