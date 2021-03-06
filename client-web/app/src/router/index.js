import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import LoginService from '@/services/login'

import MainLayout from '@/layouts/MainLayout'
import VendorLayout from '@/layouts/VendorLayout'
import LandingPage from '@/pages/LandingPage'
import CartPage from '@/pages/CartPage'
import FavoritePage from '@/pages/FavoritePage'
import MenuPage from '@/pages/MenuPage'
import PaymentPage from '@/pages/PaymentPage'
import ErrorPage from '@/pages/ErrorPage'
import TransactionPage from '@/pages/TransactionPage'
import DetailTransactionPage from '@/pages/DetailTransactionPage'
import VendorPage from '@/pages/VendorPage'
import AboutPage from '@/pages/AboutPage'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            component: MainLayout,
            meta: {
                title: 'BK Food',
                type: 'customer'
            },
            children: [{
                    path: '',
                    name: 'Landing Page',
                    component: LandingPage,
                    meta: {
                        title: 'BK Food | Home',
                    }
                },
                {
                    path: 'menu',
                    name: 'Menu Page',
                    component: MenuPage,
                    meta: {
                        title: 'BK Food | Menu',
                    }
                },
                {
                    path: 'cart',
                    name: 'Cart Page',
                    component: CartPage,
                    meta: {
                        title: 'BK Food | Cart',
                        auth: true
                    }
                },
                {
                    path: 'favorite',
                    name: 'Favorite Page',
                    component: FavoritePage,
                    meta: {
                        title: 'BK Food | Favorite',
                        auth: true
                    }
                },
                {
                    path: 'payment',
                    name: 'Payment Page',
                    component: PaymentPage,
                    meta: {
                        title: 'BK Food | Payment',
                        auth: true
                    }
                },
                {
                    path: 'transaction',
                    name: 'Transaction Page',
                    component: TransactionPage,
                    meta: {
                        title: 'BK Food | Transaction',
                        auth: true
                    }
                },
                {
                    path: 'detail-transaction',
                    name: 'DetailTransaction Page',
                    component: DetailTransactionPage,
                    meta: {
                        title: 'BK Food | Detail Transaction',
                        auth: true
                    }
                },
                {
                    path: 'about',
                    name: 'About us Page',
                    component: AboutPage,
                    meta: {
                        title: 'BK Food | About us',
                        auth: true
                    }
                }

            ]
        },
        {
            path: '/vendor',
            component: VendorLayout,
            children: [{
                path: 'detail-vendor',
                name: 'Vendor Page',
                component: VendorPage,
                meta: {
                    title: 'BK Food | Vendor',
                    auth: true
                }
            }]
        },
        {
            path: '/login/google',
            name: "Login with Google",
            meta: {
                title: 'Redirecting...',
            },
            beforeEnter: async(to, from, next) => {
                await LoginService.customerGoogle(to.query.code)
                next('/')
            }
        },
        {
            path: '/error',
            name: 'Error Page',
            component: ErrorPage,
            meta: {
                title: 'BK Food | Error',
            }
        },
        {
            path: '*',
            redirect: '/error',
            meta: {
                title: 'Redirecting...',
            }
        }
    ],
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
})
router.beforeEach(async(to, from, next) => {
    document.title = to.meta.title
    if (to.matched.some(router => router.meta.type == "customer")) {
        if (!store.state.account.customerLoggedIn) {
            await store.dispatch('account/customerAuth')
        }
        if (to.meta.auth && !store.state.account.customerLoggedIn) {
            return next('/')
        }
    }
    next()
})

export default router;