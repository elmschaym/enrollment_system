<template>
	<div class="wrap-m">
		<div class="w-m">
			<div class="p">
				<list-e-course v-if="departments.length > 0" @setValue="setCourseFromList" :departments="departments" @hasChangedDept="hasChangedDept"></list-e-course>
			</div>
			<div class="q">
				<div v-if="course.hasOwnProperty('id')" class="s">
					<div class="x">
						<b>{{ course.program_type }} &nbsp; {{ course.name }}</b>
						<span>{{ course.acadprogram.name }}</span>
					</div>
					<div class="y">
						<div>Total Required Units: <span>{{ course.total_units }}</span></div>
						<div style="padding-top: 2px;">Assigned Units: <span>{{ totalOverallAssignedUnits }}</span></div>
					</div>
				</div>
				<div v-if="course.hasOwnProperty('id')" class="t">
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
										<button @click="changeSemester(2)" :class="semester == 2 ? 'active' : ''">SMR</button>
									</div>
								</div>
							</div>
							<div class="b">
								<div class="g">
									<div>Name</div>
									<div>Description</div>
									<div>Units</div>
									<div></div>
								</div>
								<div class="h" v-if="subjCourses.length > 0">
									<div class="i" v-for="(l,i) in subjCourses" :key="'sc_'+ i">
										<div>{{ l.subject.code }}</div>
										<div>{{ l.subject.name }}</div>
										<div>{{ l.subject.units }}</div>
										<div>
											<span v-if="!isRemovingSubj" @click="removeSubject(l,i)">&times;</span>
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
									<div style="text-align: right">Total Units: &nbsp;</div>
									<div>{{ totalSemestralUnits }}</div>
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
		</div>
	</div>
</template>

<script>
	import ListESubject from '@/components/ListESubject.vue';
	import ListECourse from '@/components/ListECourse.vue';
	import UILoader from '@/components/UILoader.vue';
	import UIModalDecider from '@/components/UIModalDecider.vue';

	import 'vue-awesome/icons/spinner';
	import 'vue-awesome/icons/save';

	export default {
		emits: ['setViewName'],
		components: {
			UiLoader: UILoader,
			UiModalDecider: UIModalDecider,
			ListESubject,
			ListECourse
		},
		data() {
			return {
				isModalDeciderShow: false,
				isCommitingChange: false,
				isRemovingSubj: false,
				isFetchingList: false,
				departments: [],
				course: {},
				subject: {},
				subjCourses: [],
				year_level: 1,
				semester: 0,
				localChange: 0,
				queue_to_rem: { id: 0, pos: -1, code: '' },
				overallAssignedUnits: 0
			}
		},
		computed: {
			numLocalChange() {
				return this.localChange;
			},
			totalSemestralSubjects() {
				return this.subjCourses.length;
			},
			totalSemestralUnits() {
				let units = 0;
				if (this.subjCourses.length > 0)
					this.subjCourses.forEach(s => {
						units += s.subject.units;
					});
				return units;
			},
			totalOverallAssignedUnits() {
				return this.overallAssignedUnits;
			}
		},
		methods: {
			setCourseFromList(v) {
				this.course = v;
				this.subject = {};
				this.subjCourses = [];
				this.localChange = 0;
				this.year_level = 1;
				this.semester = 0;
				this.fetchSubjCourses();
				this.fetchAssignedUnits();
			},
			setSubjectFromList(v) {
				this.subject = v;
				if (this.subjCourses.length > 0) {
					if (!this.subjCourses.find(s => s.subject.id == v.id)) {
						this.localChange++;
						this.overallAssignedUnits += v.units;
						this.subjCourses.push({ id: 0, subject: v, is_local: true });
					}
				} else {
					this.localChange++;
					this.overallAssignedUnits += v.units;
					this.subjCourses.push({ id: 0, subject: v, is_local: true });
				}
			},
			changeYearLevel(y) {
				this.year_level = y;
				this.fetchSubjCourses();
				this.localChange = 0;
			},
			changeSemester(s) {
				this.semester = s;
				this.fetchSubjCourses();
				this.localChange = 0;
			},
			removeSubject(l,i) {
				if (l.hasOwnProperty('is_local')) {
					this.isRemovingSubj = true;
					this.$sleep(1000).then(() => {
						this.localChange--;
						this.subjCourses.splice(i,1);
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
				this.course = {};
				this.subject = {};
			},
			modalDeciderClose(v) {
				this.isModalDeciderShow = false;
			},
			removeDecidedYes() {
				this.isRemovingSubj = true;
				this.$http.delete('subject_course/'+ this.queue_to_rem.id +'/?type=full').then(res => {
					this.subjCourses.splice(this.queue_to_rem.pos, 1);
					this.overallAssignedUnits -= this.queue_to_rem.unit;
				}).finally(() => {
					this.isRemovingSubj = false;
				});
				this.isModalDeciderShow = false;
			},
			fetchDepartments() {
				this.$http.get('department/?action=lister').then(res => {
					this.departments = res.data;
				});
			},
			fetchAssignedUnits() {
				this.$http.get('subject_course/?action=counter&refer=overall&couid='+ this.course.id).then(res => {
					this.overallAssignedUnits = res.data.assigned_units != null ? res.data.assigned_units : 0;
				});
			},
			fetchSubjects() {
				this.isFetchingList = true;
				this.$http.get('course/'+ this.course.id +'/?action=get-subjects&course_fields=id,subjcourse&subjcourse_fields=id,subject&subject_fields=id,code,name,units').then(res => {
					console.log(res.data);
				}).finally(() => {
					this.isFetchingList = false;
				});
			},
			fetchSubjCourses() {
				this.isFetchingList = true;
				const semesters = ['1ST', '2ND', '3RD'], semester = semesters[this.semester];
				this.$http.get('subject_course/?action=lister&subjcourse_fields=id,subject&subject_fields=id,code,name,units&refer=semestral&couid='+ this.course.id +'&year_level='+ this.year_level +'&semester='+ semester).then(res => {
					this.subjCourses = res.data;
				}).finally(() => {
					this.isFetchingList = false;
				});
			},
			commitLocalChange() {
				const locals = this.subjCourses.filter(s => s.hasOwnProperty('is_local')), semesters = ['1ST', '2ND', '3RD'], subjs = [];
				locals.forEach(s => {
					subjs.push({ subject: s.subject.id, course: this.course.id, recom_year_lvl: this.year_level, recom_semester: semesters[this.semester] });
				});
				if (subjs.length > 0) {
					this.isCommitingChange = true;
					this.$http.post('subject_course/', subjs).then(res => {
						this.localChange = 0;
						this.fetchSubjCourses();
					}).catch(() => {
						console.log(0);
					}).finally(() => {
						this.isCommitingChange = false;
					});
				}
			}
		},
		mounted() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Courses – Assign Subjects');
			this.fetchDepartments();
		}
	}
</script>

<style scoped>
	.wrap-m { height: 100%; position: relative; }
	.wrap-m .w-m { height: 100%; display: grid; grid-template-columns: 312px auto; }
	.wrap-m .w-m .p { height: 100%; background: #f8f8f2; padding: 16px; }
	.wrap-m .w-m .q { height: 100%; border-left: 1px solid #f0f0f0; display: grid; grid-template-rows: 48px auto }

	.q .s { border-bottom: 1px solid #f0f0ea; display: grid; grid-template-columns: auto 350px; }
	.q .s .x { padding: 10px; }
	.q .s .x b { display: block; color: #111; font-size: 12px; font-weight: 600; }
	.q .s .x span { display: block; color: #7404040; font-size: 11px; font-weight: normal; padding-top: 2px; }
	.q .s .y { border-left: 1px solid #f0f0ea; padding: 10px; }
	.q .s .y div { font-size: 11px; }
	.q .s .y div span { float: right; font-weight: 600 }

	.q .t { height: 100%; display: grid; grid-template-columns: auto 350px; background-color: #fff; }
	.q .t .u { height: 100%; position: relative; }
	.q .t .u .w { height: 100%; display: grid; grid-template-rows: 50px auto 70px 32px; }
	.q .t .u .w .a { display: grid; grid-template-columns: auto 10px 160px; }
	.q .t .u .w .a .x {}
	.q .t .u .w .a .g { height: 24px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #f0f0ea; background-color: #fbfbf7; font-size: 11px; }
	.q .t .u .w .a .h button { border: none; font-size: 10px; height: 24px; background-color: #fff }
	.q .t .u .w .a .h button.active { background-color: #f0f0ea; }
	.q .t .u .w .a .x .h { display: grid; grid-template-columns: 20% 20% 20% 20% 20%; border-bottom: 1px solid #f0f0ea; }
	.q .t .u .w .a .y {}
	.q .t .u .w .a .y .h { display: grid; grid-template-columns: 33.33% 33.33% 33.33%; border-bottom: 1px solid #f0f0ea; }
	.q .t .u .w .a .z { border-left: 1px solid #f0f0ea; border-right: 1px solid #f0f0ea; background-color: #fbfbf7; }

	.q .t .u .w .b { border-bottom: 1px solid #f0f0ea; }
	.q .t .u .w .b .g, .q .t .u .w .b .h .i { display: grid; grid-template-columns: 70px auto 50px 20px }
	.q .t .u .w .b .g { padding: 6px 10px; font-size: 10px; background-color: #fbfbf7; border-bottom: 1px solid #f0f0ea; }
	.q .t .u .w .b .h { height: 320px; }
	.q .t .u .w .b .h.x { display: flex; align-items: center; justify-content: center; font-size: 11px; color: #909090; }
	.q .t .u .w .b .h .i { font-size: 11px; padding: 7px 10px; border-bottom: 1px solid #fbfbf7; }
	.q .t .u .w .b .h .i div span { padding: 2px 4px; cursor: pointer; background-color: #f0f0ea }
	.q .t .u .w .b .h .i:hover { background-color: #fbfbf7; }

	.q .t .u .w .c { background-color: #fff }
	.q .t .u .w .c .i { display: grid; grid-template-columns: 70px auto 70px; padding: 5px 10px; }
	.q .t .u .w .c .i div { font-size: 11px; color: #444; }

	.q .t .u .w .d { background-color: #fff }
	.q .t .u .w .d button { display: block; border: none; width: 100%; height: 100%; font-size: 11px; background-color: #fbfbf7; color: #909090; }
	.q .t .u .w .d button svg { width: 10px; height: 10px; margin-right: 6px }
	.q .t .u .w .d button.okay { background-color: #f0f0ea; color: #222; }

	.q .t .v { height: 100%; padding: 16px 12px; background-color: #fbfbf7; border-left: 1px solid #f0f0ea; }

</style>
