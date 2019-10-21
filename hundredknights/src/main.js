import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import AWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'
import './plugins/fontawesome'

Vue.config.productionTip = false

Vue.use(AWN, {
    durations: {
        global: 2000
    },
    minDurations: {
        async: 0,
        "async-block": 0
    }
})

Vue.mixin({
    methods: {
        next: function (response) {
            this.$awn.alert(response)
        }
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
