import Vue from 'vue';
import VueRouter from 'vue-router';

import InitView from '../layouts/InitView.vue';
import MainView from '../layouts/MainView.vue';
import MonoView from '../layouts/MonoView.vue';

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
                            { path: 'index', component: () => import('../views/adm/list/Master.vue'), name: 'adm-list-index' },
                            { path: 'master', component: () => import('../views/adm/list/Master.vue'), name: 'adm-list-master' }
                        ]
                    },
                    { path: 'new-admit', component: () => import('../views/adm/new/Admittee.vue'), name: 'adm-new-admit' },
                    { path: 'new-saved', component: () => import('../views/adm/new/AdmitteeSaved.vue'), name: 'adm-new-saved' },
                    { path: ':admit_id/view', component: () => import('../views/adm/view/Admittee.vue'), name: 'adm-view-admit' }

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

    { path: '/fin', component: MainView,
        children: [
            {   path: '', component: () => import('../views/fin/_.vue'),
                children: [
                    { path: 'index', component: () => import('../views/fin/Matriculation.vue'), name: 'fin-index' },
                    { path: 'index', component: () => import('../views/fin/Matriculation.vue'), name: 'fin-matriculation' }
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
                    { path: 'index', component: () => import('../views/sub/Index.vue'), name: 'sub-index' }
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
                    {   path: 'fac', component: () => import('../views/dep/fac/_.vue'),
                        children: [
                            { path: 'master-list', component: () => import('../views/dep/fac/MasterList.vue'), name: 'dep-fac-master-list' },
                            { path: 'assign-section', component: () => import('../views/dep/fac/AssignSection.vue'), name: 'dep-fac-assign-section' },
                            { path: 'teaching-load', component: () => import('../views/dep/fac/TeachingLoad.vue'), name: 'dep-fac-teaching-load' }
                        ]
                    },
                    {   path: 'enr', component: () => import('../views/dep/enr/_.vue'),
                        children: [
                            { path: 'master-list', component: () => import('../views/dep/enr/MasterList.vue'), name: 'dep-enr-master-list' },
                            { path: 'shiftee-form', component: () => import('../views/dep/enr/ShifteeForm.vue'), name: 'dep-enr-shiftee-form' },
                            { path: 'new-enrollee', component: () => import('../views/dep/enr/NewEnrollee.vue'), name: 'dep-enr-new-enrollee' },
                        ]
                    },
                    { path: 'new-section', component: () => import('../views/dep/sec/NewSection.vue'), name: 'dep-sec-new-section' },
                    { path: 'set-subject', component: () => import('../views/dep/sub/SetSubject.vue'), name: 'dep-set-subject' },
                    { path: 'enr/:enrol_id/view', component: () => import('../views/dep/enr/ViewEnrollee.vue'), name: 'dep-enr-view-enrollee' },
                ]
            }
        ]
    },

    { path: '/cou', component: MainView,
        children: [
            {   path: '', component: () => import('../views/cou/_.vue'),
                children: [
                    { path: 'index', component: () => import('../views/cou/Index.vue'), name: 'cou-index' }
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
