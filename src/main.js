/* Styles */
import '@/scss/main.scss'

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* Router & Store */
import router from './router'
import store from './store'
import common from '@/mixins/common'

import axios from 'axios'
import VueAxios from 'vue-axios'

/* Service Worker */
import './registerServiceWorker'

/* Vue. Main component */
import App from './App.vue'

/* Default title tag */
const defaultDocumentTitle = 'Healdash'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach(to => {
    store.commit('asideMobileStateToggle', false)

    if (to.meta.title) {
        document.title = `${to.meta.title} — ${defaultDocumentTitle}`
    } else {
        document.title = defaultDocumentTitle
    }
})

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.mixin(common);
Vue.use(VueAxios, axios)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')