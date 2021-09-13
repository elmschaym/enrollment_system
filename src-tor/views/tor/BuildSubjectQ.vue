<template>
	<div class="wrap-m">
		<div class="w-m">
			<div class="q">
				<div v-if="student.hasOwnProperty('id')" class="s">
					<div class="x">
						<b>{{ student.lastname }}, {{ student.firstname }} {{ student.middlename }}</b>
						<span>{{ student.school_id }}</span>
					</div>
					<div class="y">
						<div>Total Required Units: <span>0</span></div>
						<div style="padding-top: 2px;">Assigned Units: <span>{{ totalOverallAssignedUnits }}</span></div>
					</div>
				</div>
				<div v-if="student.hasOwnProperty('id')" class="t">
					<div class="u">
						<div class="w">
							<div class="a">
								<div class="x">
									<div class="g">
										Year Level
									</div>
									<div class="h">
										<button @click="changeYearLevel(1)" :class="year_level == 1 ? 'active' : ''">First</button>
										<button @click="changeYearLevel(2)" :class="year_level == 2 ? 'active' : ''">Second</button>
										<button @click="changeYearLevel(3)" :class="year_level == 3 ? 'active' : ''">Third</button>
										<button @click="changeYearLevel(4)" :class="year_level == 4 ? 'active' : ''">Fourth</button>
										<button @click="changeYearLevel(5)" :class="year_level == 5 ? 'active' : ''">Fifth</button>
									</div>
								</div>
								<div class="z">
								</div>
								<div class="y">
									<div class="g">
										Semester
									</div>
									<div class="h">
										<button @click="changeSemester(0)" :class="semester == 0 ? 'active' : ''">1st</button>
										<button @click="changeSemester(1)" :class="semester == 1 ? 'active' : ''">2nd</button>
										<button @click="changeSemester(2)" :class="semester == 2 ? 'active' : ''">3rd</button>
									</div>
								</div>
							</div>
							<div class="b">
								<div class="g">
									<div></div>
									<div>Name</div>
									<div>Description</div>
									<div>Grade</div>
									<div>Grade (Final)</div>
									<div>Taken</div>
									<div>Units</div>
									<div></div>
								</div>
								<div class="h" v-if="subjGrades.length > 0">
									<div class="i" v-for="(l,i) in subjGrades" :key="'sc_'+ i">
										<div class="j" @dblclick="changeEnterGradeIndex(i,l)">
											<div><v-icon :class="l.is_local ? 'l' : 'k'" name="square"></v-icon></div>
											<div>{{ l.subject.code }}</div>
											<div>{{ l.subject.name }}</div>
											<div>{{ l.grade }}</div>
											<div>{{ l.grade_final }}</div>
											<div>{{ l.taken }}</div>
											<div>{{ l.subject.units }}</div>
											<div>
												<span @click="removeSubject(l,i)">&times;</span>
											</div>
										</div>
										<div class="j edit" v-if="i == enterGradeIndex">
											<div></div>
											<div></div>
											<div></div>
											<div><ui-select @setValue="setGrade" :options="gradeList" :styles="['width: 90%;']" :changed="enterGradeIndex" :closer="false"></ui-select></div>
											<div><ui-select @setValue="setGradeFinal" :options="gradeList" :styles="['width: 90%;']" :changed="enterGradeIndex" :closer="false"></ui-select></div>
											<div><ui-select @setValue="setGradeTaken" :options="[{id: 1, name: 1}, {id: 2, name: 2}, {id: 3, name: 3}, {id: 4, name: 4}, {id: 5, name: 5}]" :styles="['width:90%;']" :changed="enterGradeIndex" :presets="{id: 1, name: 1}"></ui-select></div>
											<div><button @click="saveEnterGrades(i)">OK</button></div>
											<div></div>
										</div>
									</div>
								</div>
								<div class="h x" v-else>
									No Data Available
								</div>
							</div>
							<div class="c">
								<div class="i">
									<div>{{ totalSemestralSubjects }} &nbsp; Subject(s)</div>
									<div>Total Units: &nbsp; {{ totalSemestralUnits }}</div>
									<div style="text-align: right"><v-icon name="square" class="l"></v-icon> Local &nbsp; <v-icon name="square" class="k"></v-icon> Server</div>
								</div>
							</div>
							<div class="d">
								<button :class="numLocalChange > 0 ? 'okay': ''" :disabled="numLocalChange == 0" @click="commitLocalChange()"><v-icon :name="isCommitingChange ? 'spinner' : 'save'" :spin="isCommitingChange"></v-icon> {{ isCommitingChange ? '' : 'Commit' }}</button>
							</div>
						</div>
						<ui-modal-decider v-if="isModalDeciderShow" :hasBG="false" @modalClose="modalDeciderClose" @decidedYes="removeDecidedYes">
							<span slot="text">
								Do you want to remove <b style="font-weight: 600; padding: 0 2px">{{ queue_to_rem.code }}</b>?
							</span>
						</ui-modal-decider>
						<ui-loader v-if="isFetchingList"></ui-loader>
					</div>
					<div class="v">
						<list-e-subject v-if="departments.length > 0" @setValue="setSubjectFromList" :departments="departments"></list-e-subject>
					</div>
				</div>      
			</div>
			<ui-loader v-if="isFetchingStud"></ui-loader>
		</div>
	</div>
</template>

<script>
	import ListESubject from '@/components/ListESubject.vue';
	import UILoader from '@/components/UILoader.vue';
	import UISelect from '@/components/UISelect.vue';
	import UIModalDecider from '@/components/UIModalDecider.vue';

	import 'vue-awesome/icons/spinner';
	import 'vue-awesome/icons/save';
	import 'vue-awesome/icons/square';

	export default {
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			UiModalDecider: UIModalDecider,
			ListESubject,
		},
		data() {
			return {
				isModalDeciderShow: false,
				isCommitingChange: false,
				isRemovingSubj: false,
				isFetchingList: false,
				isFetchingStud: false,
				departments: [],
				student: {},
				subject: {},
				subjGrades: [],
				year_level: 1,
				semester: 0,
				localChange: 0,
				queue_to_rem: { id: 0, pos: -1, code: '' },
				overallAssignedUnits: 0,
				gradeList: [],
				enterGradeIndex: -1,
				grade: { initial: '', final: '', taken: 1 }
			}
		},
		computed: {
			numLocalChange() {
				return this.localChange;
			},
			totalSemestralSubjects() {
				return this.subjGrades.length;
			},
			totalSemestralUnits() {
				let units = 0;
				if (this.subjGrades.length > 0)
					this.subjGrades.forEach(s => {
						units += s.subject.units;
					});
				return units;
			},
			totalOverallAssignedUnits() {
				return this.overallAssignedUnits;
			}
		},
		methods: {
			setGrade(v) {
				this.grade.initial = v == 0 ? '' : v;
			},
			setGradeFinal(v) {
				this.grade.final = v == 0 ? '' : v;
			},
			setGradeTaken(v) {
				this.grade.taken = v;
			},
			setSubjectFromList(v) {
				this.subject = v;
				if (this.subjGrades.length > 0) {
					if (!this.subjGrades.find(s => s.subject.id == v.id)) {
						this.localChange++;
						this.overallAssignedUnits += v.units;
						this.subjGrades.push({ id: 0, subject: v, is_local: true, grade: '', grade_final: '', taken: 1 });
					}
				} else {
					this.localChange++;
					this.overallAssignedUnits += v.units;
					this.subjGrades.push({ id: 0, subject: v, is_local: true, grade: '', grade_final: '', taken: 1 });
				}
			},
			changeEnterGradeIndex(i,l) {
				if (l.is_local) {
					if (this.enterGradeIndex == i)
						this.enterGradeIndex = -1;
					else
						this.enterGradeIndex = i;
				}
			},
			changeYearLevel(y) {
				this.year_level = y;
				this.fetchSubjGrades();
				this.localChange = 0;
			},
			changeSemester(s) {
				this.semester = s;
				this.fetchSubjGrades();
				this.localChange = 0;
			},
			removeSubject(l,i) {
				if (l.hasOwnProperty('is_local')) {
					this.isRemovingSubj = true;
					this.$sleep(500).then(() => {
						this.localChange--;
						this.subjGrades.splice(i,1);
						this.isRemovingSubj = false;
						this.overallAssignedUnits -= l.subject.units;						
					});
				} else {
					this.queue_to_rem.id = l.id;
					this.queue_to_rem.pos = i;
					this.queue_to_rem.code = l.code;
					this.queue_to_rem.unit = l.subject.units;
					this.isModalDeciderShow = true;
				}
			},
			hasChangedDept() {
				this.subject = {};
			},
			modalDeciderClose(v) {
				this.isModalDeciderShow = false;
			},
			removeDecidedYes() {
				this.isRemovingSubj = true;
				this.$http.delete('subject_grade/'+ this.queue_to_rem.id +'/?type=full').then(res => {
					this.subjGrades.splice(this.queue_to_rem.pos, 1);
					this.overallAssignedUnits -= this.queue_to_rem.unit;
				}).finally(() => {
					this.isRemovingSubj = false;
				});
				this.isModalDeciderShow = false;
			},
			fetchStudent() {
				let stuid = this.$route.query.stud_id;
                this.isFetchingStud = true;
                this.$http.get('student/'+ stuid +'/?type=profile-stu&student_fields=id,school_id,firstname,lastname,middlename&studentf_is_new=0').then( res => {
                        this.student = res.data;
                        this.fetchSubjGrades();
                        this.fetchAssignedUnits();
                    }).catch( () => {
                        this.isErrorConnect = true;
                    }).finally( () => {
                        this.isFetchingStud = false;
                    });
			},
			fetchDepartments() {
				this.$http.get('department/?action=lister').then(res => {
					this.departments = res.data;
				});
			},
			fetchAssignedUnits() {
				this.$http.get('subject_grade/?action=counter&refer=overall&stuid='+ this.student.id).then(res => {
					this.overallAssignedUnits = res.data.assigned_units != null ? res.data.assigned_units : 0;
				});
			},
			fetchSubjGrades() {
				this.isFetchingList = true;
				const semesters = ['1ST', '2ND', '3RD'], semester = semesters[this.semester];
				this.$http.get('subject_grade/?action=lister&subjgrade_fields=id,grade,grade_final,taken,subject&subject_fields=id,code,name,units&refer=semestral&stuid='+ this.student.id +'&year_level='+ this.year_level +'&semester='+ semester).then(res => {
					this.subjGrades = res.data;
				}).finally(() => {
					this.isFetchingList = false;
				});
			},
			commitLocalChange() {
				const locals = this.subjGrades.filter(s => s.hasOwnProperty('is_local')), semesters = ['1ST', '2ND', '3RD'], subjs = [];
				locals.forEach(s => {
					subjs.push({ subject: s.subject.id, student: this.student.id, grade: s.grade, grade_final: s.grade_final, taken: s.taken, recom_year_lvl: this.year_level, recom_semester: semesters[this.semester] });
				});
				if (subjs.length > 0) {
					this.isCommitingChange = true;
					this.$http.post('subject_grade/', subjs).then(res => {
						this.localChange = 0;
						this.fetchSubjGrades();
					}).catch(() => {
						console.log(0);
					}).finally(() => {
						this.isCommitingChange = false;
					});
				}
			},
			saveEnterGrades(i) {
				let row = this.subjGrades[i];
				row.grade = this.grade.initial;
				row.grade_final = this.grade.final;
				row.taken = this.grade.taken;
				this.$set(this.subjGrades, i, row);
				this.enterGradeIndex = -1;
			},
			populateGradeList() {
				this.gradeList.push({ id: '', name: '------' });
				for (let x = 1; x<=3; x+=0.25) {
					let g = x.toFixed(2);
					this.gradeList.push({ id: g.toString(), name: g.toString() });
				}
				this.gradeList.push({ id: '5.00', name: '5.00' });
				this.gradeList.push({ id: 'P', name: 'P' });
				this.gradeList.push({ id: 'INC', name: 'INC' });
			}
		},
		mounted() {
			this.fetchStudent();
			this.$store.commit('setModuleName', 'Student – Build Subjects');
			this.fetchDepartments();
			this.populateGradeList();
		}
	}
</script>

<style scoped>
	.wrap-m { height: 100%; position: relative; }
	.wrap-m .w-m { height: 100%; }
	.wrap-m .w-m .p { height: 100%; background: #f8f8f2; padding: 16px; }
	.wrap-m .w-m .q { height: 100%; border-left: 1px solid #f0f0f0; display: grid; grid-template-rows: 48px auto }

	.q .s { border-bottom: 1px solid #f0f0ea; display: grid; grid-template-columns: auto 320px; }
	.q .s .x { padding: 10px; }
	.q .s .x b { display: block; color: #111; font-size: 12px; font-weight: 600; }
	.q .s .x span { display: block; color: #7404040; font-size: 11px; font-weight: normal; padding-top: 2px; }
	.q .s .y { border-left: 1px solid #f0f0ea; padding: 10px; }
	.q .s .y div { font-size: 11px; }
	.q .s .y div span { float: right; font-weight: 600 }

	.q .t { height: 100%; display: grid; grid-template-columns: auto 320px; background-color: #fff; }
	.q .t .u { height: 100%; position: relative; }
	.q .t .u .w { height: 100%; display: grid; grid-template-rows: 50px auto 70px 32px; }
	.q .t .u .w .a { display: grid; grid-template-columns: auto 10px 200px; }
	.q .t .u .w .a .x {}
	.q .t .u .w .a .g { height: 24px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #f0f0ea; background-color: #fbfbf7; font-size: 11px; }
	.q .t .u .w .a .h button { border: none; font-size: 10px; height: 24px; background-color: #fff }
	.q .t .u .w .a .h button.active { background-color: #f0f0ea; }
	.q .t .u .w .a .x .h { display: grid; grid-template-columns: 20% 20% 20% 20% 20%; border-bottom: 1px solid #f0f0ea; }
	.q .t .u .w .a .y {}
	.q .t .u .w .a .y .h { display: grid; grid-template-columns: 33.33% 33.33% 33.33%; border-bottom: 1px solid #f0f0ea; }
	.q .t .u .w .a .z { border-left: 1px solid #f0f0ea; border-right: 1px solid #f0f0ea; background-color: #fbfbf7; }

	.q .t .u .w .b { border-bottom: 1px solid #f0f0ea; }
	.q .t .u .w .b .g, .q .t .u .w .b .h .i .j { display: grid; grid-template-columns: 26px 70px auto 70px 80px 50px 40px 20px }
	.q .t .u .w .b .g { padding: 6px 10px; font-size: 10px; background-color: #fbfbf7; border-bottom: 1px solid #f0f0ea; }
	.q .t .u .w .b .h { height: 320px; }
	.q .t .u .w .b .h.x { display: flex; align-items: center; justify-content: center; font-size: 11px; color: #909090; }
	.q .t .u .w .b .h .i .j { font-size: 11px; padding: 7px 10px; border-bottom: 1px solid #fbfbf7; }
	.q .t .u .w .b .h .i .j div span { padding: 2px 4px; cursor: pointer; background-color: #f0f0ea }
	.q .t .u .w .b .h .i .j div svg.k { width: 10px; height: 10px; margin-bottom: -1px; color: #b0b0b0; }
	.q .t .u .w .b .h .i .j div svg.l { width: 10px; height: 10px; margin-bottom: -1px; color: #fff; border: 1px solid #c0c0ba; }
	.q .t .u .w .b .h .i .j:hover { background-color: #fbfbf7; }

	.q .t .u .w .b .h .i .j.edit button { background-color: #656763; border: 1px solid #555753; height: 26px; color: #fff; font-size: 11px; box-shadow: 1px 1px 1px rgba(0,0,0,0.24); width: 100%; }

	.q .t .u .w .c { background-color: #fff }
	.q .t .u .w .c .i { display: grid; grid-template-columns: 80px auto 200px; padding: 5px 10px; }
	.q .t .u .w .c .i div { font-size: 11px; color: #444; }
	.q .t .u .w .c .i div svg.k { width: 10px; height: 10px; margin-bottom: -1px; color: #b0b0b0; margin-right: 4px; }
	.q .t .u .w .c .i div svg.l { width: 10px; height: 10px; margin-bottom: -1px; color: #fff; border: 1px solid #c0c0ba; margin-right: 4px; }

	.q .t .u .w .d { background-color: #fff }
	.q .t .u .w .d button { display: block; border: none; width: 100%; height: 100%; font-size: 11px; background-color: #fbfbf7; color: #909090; }
	.q .t .u .w .d button svg { width: 10px; height: 10px; margin-right: 6px }
	.q .t .u .w .d button.okay { background-color: #555753; color: #fff; }

	.q .t .v { height: 100%; padding: 16px 12px; background-color: #fbfbf7; border-left: 1px solid #f0f0ea; }

</style>
