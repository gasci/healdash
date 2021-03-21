import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /* User */
        userEmail: null,
        userAvatar: null,
        firstName: null,
        lastName: null,

        /* NavBar */
        isNavBarVisible: true,

        /* Auth */
        authenticated: false,

        /* FooterBar */
        isFooterBarVisible: true,

        /* Aside */
        isAsideVisible: true,
        isAsideMobileExpanded: false
    },
    mutations: {
        /* A fit-them-all commit */
        basic(state, payload) {
            state[payload.key] = payload.value
        },

        /* User */
        user(state, payload) {
            if (payload.email) {
                state.userEmail = payload.email
            }
            if (payload.lastName) {
                state.lastName = payload.lastName
            }
            if (payload.firstName) {
                state.firstName = payload.firstName
            }
            if (payload.avatar) {
                state.userAvatar = payload.avatar
            }
        },

        /* Navbar */
        auth(state, payload) {
            // state.isNavBarVisible = payload.isNavBarVisible;
            state.authenticated = payload.authenticated;
        },

        /* Aside Mobile */
        asideMobileStateToggle(state, payload = null) {
            const htmlClassName = 'has-aside-mobile-expanded'

            let isShow

            if (payload !== null) {
                isShow = payload
            } else {
                isShow = !state.isAsideMobileExpanded
            }

            if (isShow) {
                document.documentElement.classList.add(htmlClassName)
            } else {
                document.documentElement.classList.remove(htmlClassName)
            }

            state.isAsideMobileExpanded = isShow
        }
    },
    actions: {

    }
})