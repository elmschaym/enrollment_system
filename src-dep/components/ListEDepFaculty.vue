<template>
	<div class="_f">
		<div class="find">
			<div class="i">
				<input v-model="queryString" :placeholder="'Find Faculty  ['+ queryType +']'"/>
				<span v-if="queryString.length > 0" @click="queryString = ''">&times;</span>
			</div>
			<button>{{ queryType }}</button>
		</div>
		<div class="rslt">
			<div class="tabs">
				<div></div>
				<div>Name</div>
			</div>
			<div class="list" v-if="isFetchingList">
				<ui-loader></ui-loader>
			</div>
			<div class="list" v-else-if="faculties.length > 0">
				<div :class="['l', {'active': selectedId == f.id}]" :key="f.id" v-for="f in faculties" @click="setSelected(f)">
					<div class="i">
						<div style="text-align: center;"><v-icon name="square"></v-icon></div>
						<div style="font-size: 11px;">{{ f.last_name }}, {{ f.first_name }}</div>
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

	import 'vue-awesome/icons/book';
	import 'vue-awesome/icons/square';

	export default {
		emits: ['setValue'],
		components: {
			UiLoader: UILoader
		},
		data() {
			return {
				queryString: '',
				queryType: 'name',
				queryAction: 'lister',
				isFetchingList: false,
				isErrorConnect: false,
				selectedId: 0,
				faculties: [],
				departmentId: 0
			}
		},
		watch: {
			queryString(n) {
				this.queryAction =  n.length > 0 ? 'finder' : 'lister';
				this.$sleep(250).then(this.fetchFaculties);
			}
		},
		methods: {
			fetchFaculties() {
				this.isErrorConnect = false;
				this.isFetchingList = true;
				this.$http.get('faculty/?action='+ this.queryAction +'&query='+ this.queryString +'&faculty_fields=id,first_name,last_name,gender,position&facultyf_department='+ this.departmentId).then( res => {
					let data = res.data;
					this.faculties = data;
				}).catch( () => {
					this.isErrorConnect = true;
				}).finally( () => {
					this.isFetchingList = false;
				});
			},
			setSelected(v) {
				this.selectedId = v.id;
				this.$emit('setValue', v);
			}
		},
		created() {
			let d = this.$storageGet('user_info').department;
			this.departmentId = d.id;
		},
		mounted() {
			this.fetchFaculties();
		}
	}
</script>

<style scoped>
	._f { height: inherit; background-color: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); display: grid; grid-template-rows: 26px auto }

	.form { display: grid; grid-template-columns: auto 32px; } 
	.form input { width: 100%; color: #391e22; padding: 8px 10px; border: none; background-color: #fefefe; font-size: 11px; outline: none; cursor: pointer; }
	.form button { display: block; height: 27px; color: #000; padding: 2px 8px 2px 8px; border: none; background-color: #f5f5ed; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #f0f0f0 #eaeaea #d0d0d0 transparent; }
	.form button svg { width: 10px; height: 10px; }

	.rslt { position: relative; }
	.head { font-size: 8px; text-transform: uppercase; padding: 4px 12px; background-color: #fafafa; }

	.tabs, .list .l .i { display: grid; grid-template-columns: 28px auto }
	.tabs { margin: 2px 0 0 0; padding: 6px 0; font-size: 10px; color: #333; background-color: #fafaf9 }
	.list { height: inherit; min-height: 300px; overflow-y: scroll; }

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
