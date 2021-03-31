import Vue from 'vue';
import VueRouter from 'vue-router';

import InitView from '../layouts/InitView.vue';
import MainView from '../layouts/MainView.vue';
import MonoView from '../layouts/MonoView.vue';
import ItemView from '../layouts/ItemView.vue';

import LoadIndex from '../views/LoadIndex.vue';

Vue.use(VueRouter);


const routes = [
	{ path: '/', component: LoadIndex, name: 'load-view' },

	{ path: '/usr', component: InitView,
		children: [
			{ path: 'signin', component: () => import('../views/usr/SignIn.vue'), name: 'usr-signin' },
			{ path: 'config', component: () => import('../views/usr/Config.vue'), name: 'usr-config' }
		]
	},

	{ path: '/usr', component: MonoView,
		children: [
			{ path: 'index', component: () => import('../views/usr/Index.vue'), name: 'usr-index' }
		]
	},

	{ path: '/not', component: MonoView,
		children: [
			{ path: 'index', component: () => import('../views/not/Index.vue'), name: 'not-index' }
		]
	},

	{ path: '/set', component: MonoView,
		children: [
			{ path: 'index', component: () => import('../views/set/Index.vue'), name: 'set-index' }
		]
	},

	{ path: '/ins', component: MainView,
		children: [
			{   path: '', component: () => import('../views/ins/_.vue'),
				children: [
					{ path: 'index', component: () => import('../views/ins/Index.vue'), name: 'ins-index' },
					{ path: 'enter-grades', component: () => import('../views/ins/EnterGrades.vue'), name: 'ins-enter-grades' }
				]
			}
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
