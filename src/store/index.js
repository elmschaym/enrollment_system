import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isReloadView: false,
		appWidth: 0,
		appHeight: 0,
		module: { name: 'system_enr' },
		forms: {
			admission: {
				academic_type: [
					{id: 1, name: 'Undergraduate (2-year Programme)'},
					{id: 2, name: 'Undergraduate (4-year Programme)'},
					{id: 3, name: 'Undergraduate (5-year Programme)'},
					{id: 4, name: 'Graduate / Masters Degree'},
					{id: 5, name: 'PhD / Doctorate'}
				]
			},
			student: {
				gender: [
					{id: 'M', name: 'Male'}, {id: 'F', name: 'Female'}, {id: 'B', name: 'Binary'}
				],
				civil_status: [
					{id: 'S', name: 'Single'}, {id: 'M', name: 'Married'}, {id: 'W', name: 'Widow'}, {id: 'R', name: 'Robot'}
				]
			},
			course: {
				program_type: [
					{id: 'BS', name: 'Bachelor of Science'},
					{id: 'AB', name: 'Arts Literature'},
					{id: 'BE', name: 'Bachelor of Eduation'},
					{id: 'VT', name: 'Vocational/Technology'},
					{id: 'MS', name: 'Master of Science'}
				]
			},
			faculty: {
				positions: [
					{ id: 'DEAN', name: 'Department Dean'},
					{ id: 'CHAIRP', name: 'Chairperson'},
					{ id: 'INST1', name: 'Instructor I'},
					{ id: 'INST2', name: 'Instructor II'},
					{ id: 'PROF1', name: 'Professor I'},
					{ id: 'PROF2', name: 'Professor II'},
					{ id: 'ASSOC', name: 'Associate Professor'}
				]
			}
		}
	},
	mutations: {
		setModuleName(state, name) {
			Vue.set(state, 'module', { name });
		},
		setReloadView(state) {
			state.isReloadView = !state.isReloadView;
		},
		setAppWidth(state, payload) {
			state.appWidth = payload;
		},
		setAppHeight(state, payload) {
			state.appHeight = payload;
		}
	}
});