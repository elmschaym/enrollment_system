<template>
	<div class="_f">
		<div class="form">
			<ui-select @setValue="setDepartment" :options="departments" :presets="presetDepartment" :styles="['border-radius: 0; padding: 7px 10px; border-color: #a0a09a #90908a #70706a #90908a; margin-left: -1px']"></ui-select>
			<button @click="fetchSubjects()"><v-icon name="book"></v-icon></button>
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
						<div style="font-size: 11px">{{ l.code }}</div>
						<div style="font-size: 11px;">{{ l.name }}</div>
						<div style="text-align: center; font-size: 10px">{{ l.units }}</div>
					</div>
				</div>
			</div>
			<div class="list" v-else>
			</div>
		</div>
		<div class="find">
			<div class="i">
				<input v-model="queryString" :placeholder="'Find Subject  ['+ queryType +']'"/>
				<span v-if="queryString.length > 0" @click="queryString = ''">&times;</span>
			</div>
			<button @click="switchQueryType()">{{ queryType }}</button>
		</div>
	</div>
</template>

<script>
	import UILoader from './UILoader.vue';
	import UISelect from '@/components/UISelect.vue';

	import 'vue-awesome/icons/book';
	import 'vue-awesome/icons/square';

	export default {
		emits: ['setValue'],
		components: {
			UiLoader: UILoader,
			UiSelect: UISelect
		},
		props: {
			stuid: {
				type: Number,
				required: false
			},
			couid: {
				type: Number,
				required: false
			},
			refer: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				queryString: '',
				queryType: 'code',
				queryAction: 'lister',
				isFetching: false,
				isErrorConnect: false,
				selectedId: 0,
				subjects: [],
				departments: [],
				departmentId: 0,
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
			},
			queryString(n) {
				this.queryAction =  n.length > 0 ? 'finder' : 'lister';
				this.$sleep(250).then(this.fetchSubjects);
			}
		},
		methods: {
			fetchSubjects() {
				this.isFetching = true;
				this.$http.get('subject/?action='+ this.queryAction +'&query='+ this.queryString +'&type='+ this.queryType +'&refer='+ this.refer +'&depid='+ this.departmentId +'&couid='+ this.couid +'&stuid='+ this.stuid +'&subject_fields=id,name,code,units').then(res => {
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
				this.$emit('setValue', v);
			},
			setDepartment(v) {
				this.departmentId = v;
			},
			switchQueryType() {
				this.queryType = this.queryType == 'name' ? 'code' : 'name';
			}
		},
		created() {
			let d = this.$storageGet('user_info').department;
			this.departmentId = d.id;
			this.userDepartment = d;
		},
		mounted() {
			this.fetchDepartments();
		},
	}
</script>

<style scoped>
	._f { height: inherit; background-color: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); display: grid; grid-template-rows: 26px auto 28px }

	.form { display: grid; grid-template-columns: auto 32px; } 
	.form input { width: 100%; color: #391e22; padding: 8px 10px; border: none; background-color: #fefefe; font-size: 11px; outline: none; cursor: pointer; }
	.form button { display: block; height: 27px; color: #fff; padding: 2px 8px 2px 8px; border: none; background-color: #555753; font-size: 11px; outline: none; cursor: pointer; border: 1px solid #555753; }
	.form button svg { width: 10px; height: 10px; }

	.rslt { position: }
	.head { font-size: 8px; text-transform: uppercase; padding: 4px 12px; background-color: #fafafa; }

	.tabs, .list .l .i { display: grid; grid-template-columns: 23px 50px auto 40px }
	.tabs { margin: 2px 0 0 0; padding: 6px 0; font-size: 10px; color: #333; background-color: #fafaf9 }
	.list { max-height: 500px; overflow-y: scroll; }

	.list .l { border-bottom: 1px solid #f9f9f9; cursor: pointer; }
	.list .l:hover, .l.active { background-color: #f7f7f5; }
	.list .l .i { padding: 0; }
	.list .l .i div { color: #000; white-space: nowrap; text-overflow: clip; overflow-x: hidden; padding: 7px 0; }
	.list .l .i div svg { width: 10px; height: 10px; color: #e0e0e0; margin-bottom: 2px; }
	.list .l.active .b span{ background-color: #ececec; }

	.find { display: grid; grid-template-columns: auto 60px; border-top: 1px solid #e0e0da; }
	.find .i { background-color: #fefefe; position: relative; }
	.find .i span { position: absolute;; top: 2px; right: 5px; padding: 5px; cursor: pointer; }
	.find .i input { width: 100%; height: 28px; display: block; color: #111; padding: 2px 10px; border: none; background-color: #fefefe; font-size: 11px; outline: none; }
	.find .i input::placeholder { color: #202020; }
	.find button { height: 28px; display: block; color: #111; padding: 8px 8px 8px 2px; border: none; border-left: 1px solid #f0f0f0; background-color: #fafafa; font-size: 11px; outline: none; cursor: pointer; }
	.find button svg { width: 12px; height: 12px; float: right; }
</style>
