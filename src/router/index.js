import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Customers from '../views/Customers.vue'
import Employees from '../views/Employees.vue'

Vue.use(VueRouter)

const routes = [{
        // Document title tag
        // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
        meta: {
            title: 'Dashboard'
        },
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        meta: {
            title: 'Tables'
        },
        path: '/tables',
        name: 'tables',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "tables" */ '../views/Tables.vue')
    },
    {
        meta: {
            title: 'Login'
        },
        path: '/',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Login
    },
    {
        meta: {
            title: 'Customers'
        },
        path: '/customers',
        name: 'customers',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Customers
    },
    {
        meta: {
            title: 'Employees'
        },
        path: '/employees',
        name: 'employees',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Employees
    },
    {
        meta: {
            title: 'Forms'
        },
        path: '/forms',
        name: 'forms',
        component: () =>
            import ( /* webpackChunkName: "forms" */ '../views/Forms.vue')
    },
    {
        meta: {
            title: 'Profile'
        },
        path: '/profile',
        name: 'profile',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/Profile.vue')
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router