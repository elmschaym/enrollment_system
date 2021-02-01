<template>
	<div class="_com_leds">
		<div class="rslt">
			<div class="tabs">
				<div>Code</div>
				<div>Time</div>
				<div>Subject</div>
			</div>
			<div class="list" v-if="isFetchingList">
				<ui-loader></ui-loader>
			</div>
			<div class="list" v-else-if="subjects.length > 0">
				<div :class="['l', {'active': selectedId == l.id}]" :key="l.id" v-for="l in subjects" @click="setSelected(l)">
					<div class="i">
						<div style="font-size: 11px">{{ l.name }}</div>
						<div style="font-size: 11px;">{{ l.sched_days }} {{ l.sched_time }}</div>
						<div style="font-size: 11px">{{ l.subject.code }}</div>
					</div>
				</div>
			</div>
			<div class="list" v-else>
			</div>
		</div>
		<div class="find">
			<div class="i">
				<input v-model="queryString" :placeholder="'Find Section  ['+ queryType +']'"/>
				<span v-if="queryString.length > 0" @click="queryString = ''">&times;</span>
			</div>
			<button @click="switchQueryType()">{{ queryType }}</button>
		</div>
	</div>
</template>

<script>
	import UILoader from './UILoader.vue';
	import UISelect from '@/components/UISelect.vue';

	import 'vue-awesome/icons/book-reader';
	import 'vue-awesome/icons/square';

	export default {
		emits: ['setValue'],
		components: {
			UiLoader: UILoader,
			UiSelect: UISelect
		},
		props: {
			stuid: {
				type: Number
			}
		},
		data() {
			return {
				queryString: '',
				queryType: 'code',
				queryAction: 'lister',
				isFetchingList: false,
				isErrorConnect: false,
				selectedId: 0,
				subjects: [],
				faculty: { id: 0 }
			}
		},
		watch: {
			queryString(n) {
				this.queryAction =  n.length > 0 ? 'finder' : 'lister';
				this.$sleep(250).then(this.fetchSubjects);
			}
		},
		methods: {
			fetchSubjects() {
				this.isFetchingList = true;
				this.$http.get('section/?action='+ this.queryAction +'&query='+ this.queryString +'&type='+ this.queryType +'&refer=faculty&facid='+ this.faculty.id +'&section_fields=id,name,sched_time,sched_days,subject&subject_fields=id,name,code,units').then(res => {
					this.subjects = res.data;
				}).finally( () => {
					this.$sleep(500).then( () => { this.isFetchingList = false; });
				});
			},
			setSelected(v) {
				this.selectedId = v.id;
				this.$emit('setValue', v);
			},
			switchQueryType() {
				this.queryType = this.queryType == 'name' ? 'code' : 'name';
			}
		},
		created() {
			let d = this.$storageGet('user_info').id;
			this.faculty.id = d;
		},
		mounted() {
			this.fetchSubjects();
		}
	}
</script>

<style scoped>
	._com_leds { height: inherit; background-color: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); display: grid; grid-template-rows: auto 28px }

	.form { display: grid; grid-template-columns: auto 32px; } 
	.form input { width: 100%; color: #391e22; padding: 8px 10px; border: none; background-color: #fefefe; font-size: 11px; outline: none; cursor: pointer; }
	.form button { display: block; height: 26px; color: #000; padding: 2px 8px 2px 8px; border: none; background-color: #f5f5ed; font-size: 11px; outline: none; cursor: pointer; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.form button svg { width: 10px; height: 10px; }

	.rslt { position: relative; }
	.head { font-size: 8px; text-transform: uppercase; padding: 4px 12px; background-color: #fafafa; }

	.tabs, .list .l .i { display: grid; grid-template-columns: 50px auto 50px }
	.tabs { padding: 8px 11px 8px 7px; font-size: 10px; color: #333; background-color: #f8f8f2 }
	.list { height: inherit; min-height: 300px; overflow-y: scroll; }
	.list::-webkit-scrollbar { width: 4px; display: block; }
	.list::-webkit-scrollbar-track { background: transparent; }
	.list::-webkit-scrollbar-thumb { background-color: #56373c; }

	.list .l { border-bottom: 1px solid #f9f9f9; cursor: pointer; padding: 0 7px; }
	.list .l:hover, .l.active { background-color: #f7f7f5; }
	.list .l .i {}
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
