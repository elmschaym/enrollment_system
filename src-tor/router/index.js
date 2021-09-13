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

	{ path: '/tor', component: MainView,
		children: [
			{   path: '', component: () => import('../views/tor/_.vue'),
				children: [
					{ path: 'enter-student', component: () => import('../views/tor/EnterStudent.vue'), name: 'enter-student' },
					{ path: 'list-student', component: () => import('../views/tor/ListStudent.vue'), name: 'list-student' },
					{ path: 'build-subject', component: () => import('../views/tor/BuildSubject.vue'), name: 'build-subject' },
					{ path: 'build-subject-q', component: () => import('../views/tor/BuildSubjectQ.vue'), name: 'build-subject-q' },
					{ path: 'print-record', component: () => import('../views/tor/PrintRecord.vue'), name: 'print-record' },
					{ path: 'create-course', component: () => import('../views/tor/CreateCourse.vue'), name: 'create-course' },
					{ path: 'list-course', component: () => import('../views/tor/ListCourse.vue'), name: 'list-course' },
					{ path: 'transcript-details', component: () => import('../views/tor/TranscriptDetails.vue'), name: 'transcript-details' }
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
