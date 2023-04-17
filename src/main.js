import Vue from "vue";
import ElementUI from "element-ui";
import "./index.css";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store";
import tr from "element-ui/lib/locale/lang/tr-TR";
import locale from "element-ui/lib/locale";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleExclamation,
  faDownload,
  faArrowRight,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import VueGtag from "vue-gtag";
import App from "./App.vue";
locale.use(tr);
Vue.use(ElementUI);
library.add(
  faCircleExclamation,
  faLinkedin,
  faGithub,
  faDownload,
  faArrowRight,
  faCaretUp,
  faCaretDown
);

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS_TRACK_ID },
});
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
