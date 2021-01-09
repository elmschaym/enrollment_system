<template>
	<div class="wrap-m">
		<div class="find-o">
			<div class="u">
				<span><v-icon class="c" name="square"></v-icon> Confirmed</span>
				<span><v-icon class="n" name="square"></v-icon> Unconfirmed</span>
				<span><v-icon class="s" name="square"></v-icon> No Subjects</span>
			</div>
			<div class="v">
				<input v-model="queryString" :placeholder="'Find Student \\'+ queryType"/>
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
						<div class="tth">Course</div>
						<div class="tth">Academic Year<v-icon class="s" name="sort"></v-icon></div>
						<div class="tth">Semester</div>
						<div class="tth">Academic Status</div>
					</div>
					<div class="tbd" v-if="isFetching">
						<ui-loader></ui-loader>
					</div>
					<div class="tbd" v-else-if="enrollees.length > 0">
						<div class="ttr" @click="$router.push({ name: 'dep-enr-view-enrollee', params: { enrol_id : l.id}})" :key="l.id" v-for="l in enrollees" @contextmenu="enrolleeListCMenu($event, l)">
							<div class="ttd"><v-icon  :class="l.is_confirmed ? 'c' : 'n'" name="square"></v-icon></div>
							<div class="ttd">{{ l.student.school_id}}</div>
							<div class="ttd">{{ l.student.lastname }}, {{ l.student.firstname }} {{ l.student.middlename }}</div>
							<div class="ttd">{{ l.admission.course.name }}</div>
							<div class="ttd">{{ l.acad_year }}</div>    
							<div class="ttd">{{ l.semester }}</div>
							<div class="ttd">{{ l.acad_status }}</div>
						</div>
					</div>
					<div class="tbd x" v-else>
						<div class="tno" style="text-align: center">{{ isErrorConnect ? 'Server Error Occured' : 'No Data Available'}}</div>
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
					<button :disabled="enrollees.length != listLimit" @click="goNextList()">NEXT <v-icon name="angle-right"></v-icon></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';
	import 'vue-awesome/icons/angle-right';
	import 'vue-awesome/icons/angle-left';
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/sort';
	import 'vue-awesome/icons/coffee';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/filter';
	import 'vue-awesome/icons/square';

	export default {
		emits: ['setViewName'],
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
				enrollees: [],
				listStart: 0,
				listLimit: 14
			}
		},
		methods: {
			fetchEnrollees() {
				this.isFetching = true;
				this.$http.get('enrollment/?action='+ this.queryAction +'&start='+ this.listStart +'&limit='+ this.listLimit +'&type='+ this.queryType +'&query='+ this.queryString +'&enrollment_fields=id,acad_year,acad_status,semester,is_confirmed,student,admission&student_fields=id,school_id,firstname,lastname,middlename,course&admission_fields=id,course&course_fields=id,name,name_alias').then( res => {
					let data = res.data;
					this.enrollees = data;
				}).catch( () => {
					this.isErrorConnect = true;
				}).finally( () => {
					this.isFetching = false;
				});
			},
			enrolleeListCMenu(e, l) {
				e.preventDefault();
				let cmenu = new window.nw.Menu(),
					items = [
						{ label: 'View Enrollment', click: () => this.enrollStudent(l) },
						{ label: 'Refresh', click: this.fetchEnrollees, key: 'F5', },
						{ label: 'Enroll Subjects', click: () => this.enrollStudent(l) },
						{ label: 'Student Profile', click: () => this.enrollStudent(l) },
						{ type: 'separator' },
						{ label: 'Delete', click: this.fetchEnrollees, key: 'x', modifiers: "ctrl"  }
					];
				items.forEach( m => cmenu.append(new window.nw.MenuItem(m)) );
                let zoomFactor = Math.pow(1, window.nwWin.zoomLevel);
                cmenu.popup(
                    Math.round(zoomFactor * e.clientX),
                    Math.round(zoomFactor * e.clientY)
                );
			},
			enrollStudent(s) {

			},
			switchQueryType() {
				this.queryType = this.queryType == 'name' ? 'id' : 'name';
			},
			goNextList() {
				this.listStart++;
				this.fetchEnrollees();
			},
			goPrevList() {
				if (this.listStart > 0)
					this.listStart--;
				this.fetchEnrollees();
			}
		},
		watch: {
			queryString(n) {
				this.queryAction =  n.length > 0 ? 'finder' : 'lister';
				this.listStart = 0;
				this.$sleep(250).then(this.fetchEnrollees);
			}
		},
		mounted() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Department – Enrollee List');
			this.fetchEnrollees();
		}
	}
</script>

<style scoped>
	.wrap-m { height: 100%; background-color: #fbfbf7; }

	.list-o { margin: 0 16px; background-color: #fff; border: 1px solid #edede9; font-size: 12px; }
	.list-o .data .tbl {}
	.list-o .data .tbl .thd, .list-o .data .tbl .ttr { display: grid; grid-template-columns: 28px 100px auto 220px 140px 100px 120px }
	.list-o .data .tbl .tbd { height: 440px; position: relative; overflow: hidden; }
	.list-o .data .tbl .tth { padding: 7px 10px; color: #202020; text-align: left; font-size: 11px; background-color: #f8f8f2; font-weight: 600 }
	.list-o .data .tbl .ttd { padding: 10px 0 10px 10px; height: 30px; font-size: 11px; text-overflow: clip; overflow-x: hidden; white-space: nowrap; }
	.list-o .data .tbl .tbd .ttr { border-bottom: 1px solid #f5f5f0; cursor: pointer; }
	.list-o .data .tbl .tbd .ttr:hover { background-color: #f6f6f0; }
	.list-o .data .tbl .ttd b {}
	.list-o .data .tbl .ttd svg { width: 10px; height: 10px; margin-bottom: 2px; color: #fff; border: 1px solid #c0c0ba; }
	.list-o .data .tbl .ttd svg.n { color: #fff; }
	.list-o .data .tbl .ttd svg.c { color: #ccc; }
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
	.list-o .page button { background: #fff; padding: 2px 10px; font-size: 8px; border: 1px solid #d0d0d0; }
	.list-o .page button svg { width: 10px; height: 10px; margin-bottom: -2px; }

	.find-o { margin: 0 16px 10px 16px; display: grid; grid-template-columns: auto 200px 50px; border: none; padding-top: 16px; }
	.find-o .u {}
	.find-o .u span { font-size: 11px; padding: 10px 0; display: inline-block; height: 24px; margin-right: 12px; }
	.find-o .u span svg { width: 10px; height: 10px; margin-right: 4px; }
	.find-o .u span svg.n { color: #fff; border: 1px solid #c0c0ba;  }
	.find-o .u span svg.c { color: #ccc; border: 1px solid #c0c0ba;  }
	.find-o .u span svg.s { color: #808080; border: 1px solid #c0c0ba;  }

	.find-o .v { position: relative; }
	.find-o .v input { width: 100%; height: 24px; border-radius: 2px; color: #391e22; padding: 7px 10px; background-color: #fdfdfd; font-size: 11px; border: 1px solid #e0e0da; outline: none; border-right: none;  }
	.find-o .v svg { position: absolute; top: 6px; right: 8px; height: 12px; width: 12px; }
	.find-o .w {}
	.find-o .w button { width: 100%; height: 24px; border-radius: 2px; color: #391e22; padding: 7px 10px; background-color: #fdfdfd; font-size: 11px; border: 1px solid #e0e0da; outline: none;  }
</style>
