import Vue from "vue";
import App from "./App.vue";
import "./index.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store";
import tr from "element-ui/lib/locale/lang/tr-TR";
import locale from "element-ui/lib/locale";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
locale.use(tr);
Vue.use(ElementUI);
library.add(faCircleExclamation, faLinkedin, faGithub);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
