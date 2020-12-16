import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./plugins/element-ui";
import "./plugins/view-design";
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
