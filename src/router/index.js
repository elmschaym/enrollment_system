import Vue from 'vue';
import VueRouter from 'vue-router';

import InitView from '../layouts/InitView.vue';
import MainView from '../layouts/MainView.vue';
import LoadIndex from '../views/LoadIndex.vue';
import UsrSignIn from '../views/usr/SignIn.vue';

Vue.use(VueRouter);


const routes = [
    { path: '/', component: LoadIndex, name: 'load-view' },

    { path: '/usr', component: InitView,
        children: [
            { path: 'signin', component: UsrSignIn, name: 'usr-signin' }
        ]
    },

    { path: '/dbd', component: MainView,
        children: [
            { path: 'index', component: () => import('../views/DashBoard.vue'), name: 'dbd-index' }
        ]
    },

    { path: '/adm', component: MainView,
        children: [
            { path: 'index', component: () => import('../views/adm/Index.vue'), name: 'adm-index' }
        ]
    },

    { path: '*', component: () => import('../views/Error404.vue'), name: 'error-404' }
];


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
