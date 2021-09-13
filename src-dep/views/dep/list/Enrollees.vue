<template>
	<div class="wrap-m">
		<div class="find-o">
			<div class="u">
				<div>
					<ui-select @setValue="setAcademicYear" :options="[{ id: '2020-2021', name: '2020-2021' }, { id: '2021-2022', name: '2021-2022' }, { id: '2022-2023', name: '2022-2023' }]" :presets="presetCalYear" :styles="['border-radius: 2px; padding: 6px 10px 6px 10px; border-color: #a0a09a #90908a #70706a #90908a; height: 24px; width: 95%', '']"></ui-select>
				</div>
				<div>
					<ui-select @setValue="setSemester" :options="[{ id: '1ST', name: '1ST' }, { id: '2ND', name: '2ND' }, { id: '3RD', name: '3RD' }]" :presets="presetCalSem" :styles="['border-radius: 2px; padding: 6px 10px 6px 10px; border-color: #a0a09a #90908a #70706a #90908a; height: 24px; width: 100%', '']"></ui-select>
				</div>
				<div></div>
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
						<div :class="['ttr', selectId == l.id ? 'active' : '']" @click="$router.push({ name: 'dep-view-enrollee', params: { enrol_id : l.id}})" :key="l.id" v-for="l in enrollees" @contextmenu="enrolleeListCMenu($event, l)">
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
					<button @click="fetchEnrollees()">RELOAD</button>
					<button :disabled="listStart == 0" @click="goPrevList()"><v-icon name="angle-left"></v-icon> PREV</button>
					<button :disabled="enrollees.length != listLimit" @click="goNextList()">NEXT <v-icon name="angle-right"></v-icon></button>
				</div>
				<div class="r">
					<span><v-icon class="c" name="square"></v-icon> Confirmed</span>
					<span><v-icon class="n" name="square"></v-icon> Unconfirmed</span>
					<span><v-icon class="s" name="square"></v-icon> No Subjects</span>
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
	import 'vue-awesome/icons/search';

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
				listLimit: 14,
				selectId: 0,
				departmentId: 0,
				calendar: { year: '', semester: '' },
				presetCalYear: '',
				presetCalSem: ''
			}
		},
		methods: {
			setSemester(v) {
				this.calendar.semester = v;
			},
			setAcademicYear(v) {
				this.calendar.year = v;
			},
			fetchEnrollees() {
				this.isFetching = true;
				this.$http.get('enrollment/?action='+ this.queryAction +'&start='+ this.listStart +'&limit='+ this.listLimit +'&type='+ this.queryType +'&query='+ this.queryString +'&depid='+ this.departmentId +'&calendar_year='+ this.calendar.year +'&calendar_sem='+ this.calendar.semester +'&enrollment_fields=id,acad_year,acad_status,semester,is_confirmed,student,admission&student_fields=id,school_id,firstname,lastname,middlename&admission_fields=id,course&course_fields=id,name,name_alias').then( res => {
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
				this.selectId = l.id;
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
			},
			'calendar.year'(n) {
				this.fetchEnrollees();
			},
			'calendar.semester'(n) {
				this.fetchEnrollees();
			}
		},
		created() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Department – Enrollee List');
			this.departmentId = this.$storageGet('user_info').department.id;
			let acad_prefer = this.$storageGet('acad_prefer');
			this.calendar.year = acad_prefer.academic_calendar || '';
			this.calendar.semester = acad_prefer.academic_semster || '';
			this.presetCalYear = { id: acad_prefer.academic_calendar, name: acad_prefer.academic_calendar };
			this.presetCalSem = { id: acad_prefer.academic_semester, name: acad_prefer.academic_semester };
		},
		mounted() {
			this.fetchEnrollees();
		}
	}
</script>

<style scoped>
	.wrap-m { height: 100%; background-color: #fbfbf7; }

	.list-o { margin: 0 16px; background-color: #fff; font-size: 12px; border: 1px solid #e0e0da; }
	.list-o .data .tbl {}
	.list-o .data .tbl .thd, .list-o .data .tbl .ttr { display: grid; grid-template-columns: 28px 100px auto 220px 140px 100px 120px }
	.list-o .data .tbl .tbd { height: 440px; position: relative; overflow: hidden; border-top: 1px solid #f0f0ea; border-bottom: 1px solid #f0f0ea; }
	.list-o .data .tbl .tth { padding: 7px 10px; color: #202020; text-align: left; font-size: 11px; background-color: #fbfbf7; font-weight: 600; }
	.list-o .data .tbl .ttd { padding: 10px 0 10px 10px; height: 30px; font-size: 12px; text-overflow: clip; overflow-x: hidden; white-space: nowrap; }
	.list-o .data .tbl .tbd .ttr { border-bottom: 1px solid #fbfbf7; cursor: pointer; }
	.list-o .data .tbl .tbd .ttr:hover, .list-o .data .tbl .tbd .ttr.active { background-color: #f6f6f0; }
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

	.list-o .page { display: grid; grid-template-columns: 40% 60%; padding: 5px 10px; border-top: 1px solid #f0f0f0; background-color: #fff; }
	.list-o .page .l { text-align: left; }
	.list-o .page .c { text-align: center; }
	.list-o .page .r { text-align: right; padding: 4px 0; }
	.list-o .page button { background: #fff; padding: 4px 10px; font-size: 8px; border: 1px solid #e0e0da; }
	.list-o .page button svg { width: 10px; height: 10px; margin-bottom: -2px; }
	.list-o .page .r span { font-size: 11px; display: inline-block; margin-right: 12px; }
	.list-o .page .r span svg { width: 10px; height: 10px; margin-right: 4px; }
	.list-o .page .r span svg.n { color: #fff; border: 1px solid #c0c0ba;  }
	.list-o .page .r span svg.c { color: #ccc; border: 1px solid #c0c0ba;  }
	.list-o .page .r span svg.s { color: #808080; border: 1px solid #c0c0ba;  }

	.find-o { margin: 0 16px 10px 16px; display: grid; grid-template-columns: auto 200px 50px; border: none; padding-top: 16px; }
	.find-o .u { display: grid; grid-template-columns: 120px 90px auto; }

	.find-o .v { position: relative; }
	.find-o .v input { width: 100%; height: 24px; color: #111; padding: 7px 10px; background-color: #fdfdfd; font-size: 11px; border: 1px solid #959793; outline: none; border-right: none;  }
	.find-o .v svg { position: absolute; top: 6px; right: 8px; height: 12px; width: 12px; }
	.find-o .w {}
	.find-o .w button { width: 100%; height: 24px; color: #fff; padding: 6px 10px; background-color: #959793; font-size: 11px; border: 1px solid #959793; outline: none; color: #fff; }
</style>
