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

	{ path: '/adm', component: MainView,
		children: [
			{   path: '', component: () => import('../views/adm/_.vue'),
				children: [
					{   path: 'index', component: () => import('../views/adm/Index.vue'), name: 'adm-index' },
					{   path: 'list', component: () => import('../views/adm/list/_.vue'),
						children: [
							{ path: 'adm-master', component: () => import('../views/adm/list/AdmMaster.vue'), name: 'adm-list-adm-master' },
							{ path: 'stu-master', component: () => import('../views/adm/list/StuMaster.vue'), name: 'adm-list-stu-master' },
							{ path: 'cou-master', component: () => import('../views/adm/list/CouMaster.vue'), name: 'adm-list-cou-master' }
						]
					},
					{ path: 'create-admittee', component: () => import('../views/adm/create/Admittee.vue'), name: 'adm-create-admittee' },
					{ path: 'create-admittee-saved', component: () => import('../views/adm/create/AdmitteeSaved.vue'), name: 'adm-create-admittee-saved' },
					{ path: 'create-student', component: () => import('../views/adm/create/Student.vue'), name: 'adm-create-student' },
					{ path: 'create-student-admit', component: () => import('../views/adm/create/StudentAdmit.vue'), name: 'adm-create-student-admit' },
					{ path: 'view/adm/vadm/:admit_id', component: () => import('../views/adm/view/adm/Admittee.vue'), name: 'adm-view-admittee' },
					{ path: 'view/adm/vstu/:stude_id', component: () => import('../views/adm/view/stu/_.vue'),
						children: [
							{ path: 'index', component: () => import('../views/adm/view/stu/Index.vue'), name: 'adm-view-student-index' },
							{ path: 'admit', component: () => import('../views/adm/view/stu/Admit.vue'), name: 'adm-view-student-admit' },
							{ path: 'enrol', component: () => import('../views/adm/view/stu/Enrol.vue'), name: 'adm-view-student-enrol' },
							{ path: 'infos', component: () => import('../views/adm/view/stu/Infos.vue'), name: 'adm-view-student-infos' }
						]
					},
					{ path: 'sub-create', component: () => import('../views/adm/create/Subject.vue'), name: 'adm-create-subject' },
					{ path: 'cou-create', component: () => import('../views/adm/create/Course.vue'), name: 'adm-create-course' },
					{ path: 'assign-sub-xreq', component: () => import('../views/adm/assign/SubjectRequisite.vue'), name: 'adm-assign-sub-xreq' },
					{ path: 'course-program', component: () => import('../views/adm/assign/CourseProgram.vue'), name: 'adm-assign-cou-subj' },
					{ path: 'student-evaluation', component: () => import('../views/adm/tool/StudentEvaluation.vue'), name: 'adm-tool-student-evaluation' },
					{ path: 'grade-slip', component: () => import('../views/adm/tool/GradeSlip.vue'), name: 'adm-tool-grade-slip' },
					{ path: 'generate-prospectus', component: () => import('../views/adm/tool/GenerateProspectus.vue'), name: 'adm-tool-view-prospectus' },
					{ path: 'confirm-registration', component: () => import('../views/adm/tool/ConfirmRegistration.vue'), name: 'adm-tool-confirm-registration' }
				]
			}
		]
	},


	{ path: '/adm/item', component: ItemView,
		children: [
			{ path: 'modify-admittee', component: () => import('../views/adm/item/Index.vue'), name: 'adm-item-modify-admittee' }
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
