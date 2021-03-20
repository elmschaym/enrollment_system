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

	{ path: '/dbd', component: MonoView,
		children: [
			{ path: 'index', component: () => import('../views/DashBoard.vue'), name: 'dbd-index', meta: { name: 'DashBoard'} }
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

	{ path: '/enr', component: MainView,
		children: [
			{   path: '', component: () => import('../views/enr/_.vue'),
				children: [
					{   path: 'index', component: () => import('../views/enr/Index.vue'), name: 'enr-index' },
					{   path: 'list', component: () => import('../views/enr/list/_.vue'),
						children: [
							{ path: 'index', component: () => import('../views/enr/list/Master.vue'), name: 'enr-list-index' },
							{ path: 'master', component: () => import('../views/enr/list/Master.vue'), name: 'enr-list-master' }
						]
					},
					{ path: 'new-enrol', component: () => import('../views/enr/new/Enrol.vue'), name: 'enr-new-enrol' },
					{ path: 'new-saved', component: () => import('../views/enr/new/Saved.vue'), name: 'enr-new-saved' },
					{ path: ':enrol_id/view', component: () => import('../views/enr/view/Enrol.vue'), name: 'enr-view-enrol' }

				]
			}
		]
	},

	{ path: '/cas', component: MainView,
		children: [
			{   path: '', component: () => import('../views/cas/_.vue'),
				children: [
					{ path: 'index', component: () => import('../views/cas/Index.vue'), name: 'cas-index' }
				]
			}
		]
	},

	{ path: '/stu', component: MainView,
		children: [
			{   path: '', component: () => import('../views/stu/_.vue'),
				children: [
					{   path: 'index', component: () => import('../views/stu/Index.vue'), name: 'stu-index' },
					{   path: 'list', component: () => import('../views/stu/list/_.vue'),
						children: [
							{ path: 'index', component: () => import('../views/stu/list/Master.vue'), name: 'stu-list-index' },
							{ path: 'master', component: () => import('../views/stu/list/Master.vue'), name: 'stu-list-master' }
						]
					},
					{ path: 'new-stude', component: () => import('../views/stu/new/Student.vue'), name: 'stu-new-stude' },
					{ path: 'new-saved', component: () => import('../views/stu/new/StudentAdmit.vue'), name: 'stu-new-saved' },
					{ path: ':stuid', component: () => import('../views/stu/view/_.vue'),
						children: [
							{ path: 'index', component: () => import('../views/stu/view/Index.vue'), name: 'stu-view-index' },
							{ path: 'admit', component: () => import('../views/stu/view/Admit.vue'), name: 'stu-view-admit' },
							{ path: 'enrol', component: () => import('../views/stu/view/Enrol.vue'), name: 'stu-view-enrol' },
							{ path: 'infos', component: () => import('../views/stu/view/Infos.vue'), name: 'stu-view-infos' }
						]
					}
				]
			}
		]
	},

	{ path: '/sub', component: MainView,
		children: [
			{   path: '', component: () => import('../views/sub/_.vue'),
				children: [
					{ path: 'index', component: () => import('../views/sub/AssignRequisites.vue'), name: 'sub-index' },
					{ path: 'assign-xreq', component: () => import('../views/sub/AssignRequisites.vue'), name: 'sub-assign-xreq' },
					{ path: 'student-eval', component: () => import('../views/sub/StudentEvaluation.vue'), name: 'sub-student-eval' },
					{ path: 'create', component: () => import('../views/sub/Create.vue'), name: 'sub-create' },
				]
			}
		]
	},

	{ path: '/sec', component: MainView,
		children: [
			{   path: '', component: () => import('../views/sec/_.vue'),
				children: [
					{ path: 'index', component: () => import('../views/sec/Index.vue'), name: 'sec-index' }
				]
			}
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

	{ path: '/cou', component: MainView,
		children: [
			{   path: '', component: () => import('../views/cou/_.vue'),
				children: [
					{ path: 'index', component: () => import('../views/cou/MasterList.vue'), name: 'cou-index' },
					{ path: 'master-list', component: () => import('../views/cou/MasterList.vue'), name: 'cou-master-list' },
					{ path: 'assign-subj', component: () => import('../views/cou/AssignSubjects.vue'), name: 'cou-assign-subj' },
					{ path: 'view-prospectus', component: () => import('../views/cou/ViewProspectus.vue'), name: 'cou-view-prospectus' },
					{ path: 'cou-create', component: () => import('../views/cou/Create.vue'), name: 'cou-create' }
				]
			}
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
