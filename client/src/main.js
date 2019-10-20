import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { LayoutPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



// import bootstrap modal as plugin / components
import { ModalPlugin } from 'bootstrap-vue'

// import bootstrap card as plugin / components
import { CardPlugin } from 'bootstrap-vue'

// import vbscrollpy as plugin
import { VBScrollspyPlugin } from 'bootstrap-vue'

// import bootstrap dropdown and table as plugin / components
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.use(CardPlugin)
Vue.use(VBScrollspyPlugin)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
