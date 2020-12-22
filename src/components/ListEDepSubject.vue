<template>
	<div class="find-c">
		<div class="form">
			<ui-select :setValue="setDepartment" :options="departments" :presets="presetDepartment" :styles="['border-radius: 0; padding: 7px 10px;']"></ui-select>
			<button @click="fetchSubjects()"><v-icon name="circle-notch"></v-icon></button>
		</div>
		<div class="rslt">
			<div class="tabs">
				<div></div>
				<div>Code</div>
				<div>Name</div>
				<div style="text-align: center;">Units</div>
			</div>
			<div class="list" v-if="isFetching">
				<ui-loader></ui-loader>
			</div>
			<div class="list" v-else-if="subjects.length > 0">
				<div :class="['l', {'active': selectedId == l.id}]" :key="l.id" v-for="l in subjects" @click="setSelected(l)">
					<div class="i">
						<div style="text-align: center;"><v-icon name="square"></v-icon></div>
						<div style="font-size: 10px">{{ l.code }}</div>
						<div style="font-size: 11px;">{{ l.name }}</div>
						<div style="text-align: center; font-size: 10px">{{ l.units }}</div>
					</div>
				</div>
			</div>
			<div class="list" v-else>
			</div>
		</div>
	</div>
</template>

<script>
	import UILoader from './UILoader.vue';
	import UISelect from '@/components/UISelect.vue';

	import 'vue-awesome/icons/circle-notch';
	import 'vue-awesome/icons/square';

	export default {
		components: {
			UiLoader: UILoader,
			UiSelect: UISelect
		},
		props: {
			setValue: {
				type: Function,
				required: true
			},
			stuid: {
				type: Number
			}
		},
		data() {
			return {
				query: '',
				isFetching: false,
				isErrorConnect: false,
				selectedId: 0,
				subjects: [],
				departments: [],
				departmentID: 0,
				userDepartment: 0
			}
		},
		computed: {
			presetDepartment() {
				return this.userDepartment;
			}
		},
		watch: {
			stuid(n) {
				if (n > 0) {
					this.fetchSubjects();
				}
			}
		},
		methods: {
			fetchSubjects() {
				this.isFetching = true;
				this.$http.get('subject/?action=lister&refer=department&depid='+ this.departmentID +'&subject_fields=id,name,code,units').then(res => {
					this.subjects = res.data;
				}).finally( () => {
					this.$sleep(500).then( () => { this.isFetching = false; });
				});
			},
			fetchDepartments() {
				this.$http.get('department/?action=lister').then(res => {
					this.departments = res.data;
				});
			},
			setSelected(v) {
				this.selectedId = v.id;
				this.setValue(v);
			},
			setDepartment(v) {
				this.departmentID = v;
			}
		},
		created() {
			let d = this.$storageGet('user_info').department;
			this.departmentID = d.id;
			this.userDepartment = d;
			this.fetchDepartments();
		}
	}
</script>

<style scoped>
	.find-c { background-color: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
	.find-c input { width: 100%; color: #391e22; padding: 8px 10px; border: none; background-color: #fefefe; font-size: 11px; outline: none; cursor: pointer; border-radius: 5px 5px 0 0; }

	.form { display: grid; grid-template-columns: 255px 32px; } 
	.form button { width: 100%; color: #000; padding: 3px 8px 2px 8px; border: none; background-color: #f5f5ed; font-size: 11px; outline: none; cursor: pointer; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.form button svg { width: 10px; height: 10px; }

	.rslt {  position: relative; }
	.head { font-size: 8px; text-transform: uppercase; padding: 4px 12px; background-color: #fafafa; }

	.tabs, .list .l .i { display: grid; grid-template-columns: 23px 50px auto 40px }
	.tabs { margin: 2px 0 0 0; padding: 6px 0; font-size: 10px; color: #333; background-color: #fafaf9 }
	.list { height: 380px; overflow-y: scroll; }
	.list::-webkit-scrollbar { width: 4px; display: block; }
	.list::-webkit-scrollbar-track { background: transparent; }
	.list::-webkit-scrollbar-thumb { background-color: #56373c; }

	.list .l { border-bottom: 1px solid #f9f9f9; cursor: pointer; }
	.list .l:hover, .l.active { background-color: #f7f7f5; }
	.list .l .i { padding: 0; }
	.list .l .i div { color: #000; white-space: nowrap; text-overflow: clip; overflow-x: hidden; padding: 7px 0; }
	.list .l .i div svg { width: 10px; height: 10px; color: #e0e0e0; margin-bottom: 2px; }
	.list .l.active .b span{ background-color: #ececec; }
</style>
