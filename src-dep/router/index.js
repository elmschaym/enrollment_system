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
	{ path: '/dbd', component: MainView,
		children: [
			{ path: 'index', component: () => import('../views/DashBoard.vue'), name: 'dbd-index' }
		]
	},
	
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

	{ path: '/dep', component: MainView,
		children: [
			{   path: '', component: () => import('../views/dep/_.vue'),
				children: [
					{   path: 'index', component: () => import('../views/dep/Index.vue'), name: 'dep-index' },
					{   path: 'list', component: () => import('../views/dep/enr/_.vue'),
						children: [
							{ path: 'enrollees', component: () => import('../views/dep/list/Enrollees.vue'), name: 'dep-list-enrollees' },
							{ path: 'faculties', component: () => import('../views/dep/list/Faculties.vue'), name: 'dep-list-faculties' }
						]
					},
					{ path: 'new-enrollee', component: () => import('../views/dep/create/Enrollee.vue'), name: 'dep-create-enrollee' },
					{ path: 'new-room', component: () => import('../views/dep/create/Room.vue'), name: 'dep-create-room' },
					{ path: 'new-section', component: () => import('../views/dep/create/Section.vue'), name: 'dep-create-section' },
					{ path: 'set-subject', component: () => import('../views/dep/assign/SetSubject.vue'), name: 'dep-assign-set-subject' },
					{ path: 'enter-grades', component: () => import('../views/dep/assign/EnterGrades.vue'), name: 'dep-assign-enter-grades' },
					{ path: 'teaching-load', component: () => import('../views/dep/assign/TeachingLoad.vue'), name: 'dep-assign-teaching-load' },
					{ path: 'section-handler', component: () => import('../views/dep/assign/SectionHandler.vue'), name: 'dep-assign-section-handler' },
					{ path: 'view/:enrol_id/view', component: () => import('../views/dep/view/Enrollee.vue'), name: 'dep-view-enrollee' },
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
