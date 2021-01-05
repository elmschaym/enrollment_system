<template>
	<div>
		<div class="find-o">
			<div class="u">
				<span><v-icon class="a" name="square"></v-icon> Admitted</span>
				<span><v-icon class="i" name="square"></v-icon> In-Active</span>
			</div>
			<div class="v">
				<input v-model="queryString" :placeholder="'Find student by '+ queryType"/>
				<v-icon name="search"></v-icon>
			</div>
			<div class="w">
				<button @click="switchQueryType()">{{ queryType }}</button>
			</div>
		</div>
		<div class="list-o">
			<div class="data">
				<div class="tbl">
					<div class="thd">
						<div class="tth"></div>
						<div class="tth">Student ID</div>
						<div class="tth">Full Name <v-icon class="s" name="sort"></v-icon></div>
						<div class="tth">Gender</div>
						<div class="tth">Home Address</div>
						<div class="tth">Campus Address<v-icon class="s" name="sort"></v-icon></div>
						<div class="tth">Civil Status</div>
						<div class="tth">Birthdate</div>
					</div>
					<div class="tbd" v-if="isFetching">
						<ui-loader></ui-loader>
					</div>
					<div class="tbd" v-else-if="students.length > 0">
						<div class="ttr" @click="$router.push({ name: 'stu-view-index', params: { stuid : l.school_id }})" :key="l.school_id +'_'+ l.id" v-for="l in students">
							<div class="ttd"><v-icon name="square"></v-icon></div>
							<div class="ttd">{{ l.school_id }}</div>
							<div class="ttd" style="font-weight: 600">{{ l.lastname +', '+ l.firstname +' '+ l.middlename }}</div>
							<div class="ttd">{{ parseGender(l.gender) }}</div>
							<div class="ttd">{{ l.home_address }}</div>    
							<div class="ttd">{{ l.campus_address }}</div>
							<div class="ttd">{{ parseCivilStatus(l.civil_status) }}</div>
							<div class="ttd">{{ l.birthdate }}</div>
						</div>
					</div>
					<div class="tbd x" v-else>
						<div class="tno" style="text-align: center">{{ isErrorConnect ? 'Failure Server Connection' : 'No Data Available'}}</div>
					</div>
				</div>
			</div>
			<div class="page">
				<div class="l">
					<button>RELOAD</button>
				</div>
				<div class="c">
				</div>
				<div class="r">
					<button :disabled="listStart == 0" @click="goPrevList()"><v-icon name="angle-left"></v-icon> PREV</button>
					<button :disabled="students.length != listLimit" @click="goNextList()">NEXT <v-icon name="angle-right"></v-icon></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UISelect from './UISelect.vue';
	import UILoader from './UILoader.vue';
	import 'vue-awesome/icons/angle-right';
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/sort';
	import 'vue-awesome/icons/ellipsis-v';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/search';
	import 'vue-awesome/icons/square';

	export default {
		props: ['viewName', 'admitType'],
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader
		},
		data() {
			return {
				queryString: '',
				queryAction: 'lister',
				queryType: 'name',
				isFetching: false,
				isErrorConnect: false,
				isListReachEnd: false,
				isDataReachEnd: false,
				students: [],
				listStart: 0,
				listLimit: 14
			}
		},
		methods: {
			parseGender(v) {
				return this.$store.state.forms.student.gender.find(x => x.id == v).name;
			},
			parseCivilStatus(v) {
				return this.$store.state.forms.student.civil_status.find(x => x.id == v).name;
			},
			fetchStudents() {
				this.isFetching = true;
				this.$http.get('student/?action='+ this.queryAction +'&start='+ this.listStart +'&limit='+ this.listLimit +'&type='+ this.queryType +'&query='+ this.queryString +'&student_fields=id,school_id,firstname,middlename,lastname,gender,home_address,campus_address,civil_status,birthdate').then( res => { 
					let data = res.data;
					this.students = data;
				}).catch( () => {
					this.isErrorConnect = true;
				}).finally( () => {
					this.isFetching = false
				});
			},
			switchQueryType() {
				this.queryType = this.queryType == 'name' ? 'id' : 'name';
			},
			goNextList() {
				this.listStart++;
				this.fetchStudents();
			},
			goPrevList() {
				if (this.listStart > 0)
					this.listStart--;
				this.fetchStudents();
			}
		},
		watch: {
			queryString(n) {
				this.queryAction =  n.length > 0 ? 'finder' : 'lister';
				this.listStart = 0;
				this.$sleep(250).then(this.fetchStudents);
			},
			'$store.isReloadView'() {
				this.fetchStudents();
			}
		},
		created() {
			this.fetchStudents();
		}
	}
</script>

<style scoped>
	.list-o { margin: 0 16px; background-color: #fbfbfb; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); font-size: 12px; }
	.list-o .data .tbl { position: relative; }
	.list-o .data .tbl .thd, .list-o .data .tbl .ttr { display: grid; grid-template-columns: 28px 72px 186px 68px auto 166px 90px 100px }
	.list-o .data .tbl .tbd { height: 440px; overflow: hidden; position: relative; }
	.list-o .data .tbl .tbd::-webkit-scrollbar { width: 6px; display: block; }
	.list-o .data .tbl .tbd::-webkit-scrollbar-track { background: #f6f6f0; }
	.list-o .data .tbl .tbd::-webkit-scrollbar-thumb { background-color: #d7d7d0; border-radius: 3px; }

	.list-o .data .tbl .tth { padding: 7px 10px; color: #202020; text-align: left; font-size: 11px; font-weight: 600; background-color: #efefef }
	.list-o .data .tbl .ttd { padding: 10px 10px 10px 10px; height: 30px; font-size: 11px; text-overflow: clip; overflow: hidden; white-space: nowrap; }
	.list-o .data .tbl .tbd .ttr { border-bottom: 1px solid #f5f5f0; cursor: pointer; }
	.list-o .data .tbl .tbd .ttr:hover { background-color: #f6f6f0; }
	.list-o .data .tbl .ttd b {}
	.list-o .data .tbl .ttd svg { width: 10px; height: 10px; margin-bottom: 2px; color: #fff; border: 1px outset #fff; }
	.list-o .data .tbl .ttd svg.a { color: #ccc; }
	.list-o .data .tbl .tth svg { width: 12px; height: 12px; color: #404040; margin-bottom: -3px; }
	.list-o .data .tbl .tth svg.s { float: right; width: 10px; height: 10px; color: #404040; margin-bottom: -2px; }

	.list-o .data .tbl .tbd.x { display: flex; justify-content: center; align-items: center; flex-direction: column; }
	.list-o .data .tbl .tno { background-color: #f8f8f8; padding: 5px; font-size: 10px; color: #a0a090; text-transform: uppercase; }
	.list-o .data .tbl .rel { display: block; cursor: pointer; font-size: 9px; text-transform: uppercase; padding: 7px 12px;  }
	.list-o .data .tbl .rel svg { width: 9px; height: 9px; color: #404040; margin-bottom: -2px; }

	.list-o .page { display: grid; grid-template-columns: 40% 20% 40%; padding: 4px 12px; border-top: 1px solid #f0f0f0; background-color: #fff; }
	.list-o .page .l { text-align: left; }
	.list-o .page .c { text-align: center; }
	.list-o .page .r { text-align: right; }
	.list-o .page .r button { margin-left: 4px; }
	.list-o .page button { background: #fff; padding: 2px 10px; font-size: 8px; border: 1px outset #fff; }
	.list-o .page button svg { width: 10px; height: 10px; margin-bottom: -2px; }
	.list-o .page button:disabled { border: 1px solid #fff; color: #777; cursor: default; }
	.list-o .page .r span { background: #fff; padding: 0 10px; font-size: 9px; border: 1px solid #fff; }

	.find-o { margin: 16px 16px 10px 16px; display: grid; grid-template-columns: auto 200px 50px; border: none; }
	.find-o .u {}
	.find-o .u span { font-size: 11px; padding: 10px 0; display: inline-block; height: 24px; margin-right: 12px; }
	.find-o .u span svg { width: 10px; height: 10px; margin-right: 4px; }
	.find-o .u span svg.a { color: #fff; border: 1px outset #fff;  }
	.find-o .u span svg.o { color: #ccc; border: 1px outset #fff;  }
	.find-o .u span svg.i { color: #808080; border: 1px outset #fff;  }

	.find-o .v { position: relative; }
	.find-o .v input { width: 100%; height: 24px; border-radius: 2px; color: #391e22; padding: 7px 10px; background-color: #fdfdfd; font-size: 11px; border: 1px outset #f5f5f5; outline: none; border-right: none;  }
	.find-o .v svg { position: absolute; top: 6px; right: 8px; height: 12px; width: 12px; }
	.find-o .w {}
	.find-o .w button { width: 100%; height: 24px; border-radius: 2px; color: #391e22; padding: 7px 10px; background-color: #fdfdfd; font-size: 11px; border: 1px outset #f5f5f5; outline: none;  }
</style>
