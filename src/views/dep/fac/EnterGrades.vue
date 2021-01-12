<template>
	<div class="wrap-t">
		<div class="p">
			<div class="u">
				<div class="data" v-if="section.hasOwnProperty('id')">
					<div class="cc">{{ section.name }}</div>
					<div class="nn">
						<div class="tt">{{ section.sched_days }} {{ section.sched_time }}</div>
						<div class="ss">{{ section.subject.code }} – {{ section.subject.name }}</div>
					</div>
				</div>
				<div class="list" v-if="section.hasOwnProperty('id')">
					<div class="h">
						<div>ID</div>
						<div>Fullname</div>
						<div>Course</div>
						<div>Grade</div>
						<div>Final Grade</div>
					</div>
					<div class="l">
						<div :class="['i', studentIndex == i ? 'active': '']" v-for="(s,i) in sectEnrol" :key="'fac_eg_'+i" @click="gradeStudent(s,i)">
							<div>{{ s.student.school_id }}</div>
							<div>{{ s.student.lastname }}, {{ s.student.firstname }}</div>
							<div>{{ s.student.admission[0].course.program_type }} {{ s.student.admission[0].course.name_alias }}</div>
							<div>{{ s.grade }}</div>
							<div>{{ s.grade_final }}</div>
						</div>
						<ui-loader v-if="isFetchingList" styles="background-color: rgba(255,255,255,1);"></ui-loader>
					</div>
				</div>
			</div>
			<div class="v">
				<div class="f" v-if="student.hasOwnProperty('student')">
					<div class="nn">{{ student.student.lastname }}, {{ student.student.firstname }}</div>
					<div class="ii">{{ student.student.school_id }} – {{ student.student.admission[0].course.program_type }} {{ student.student.admission[0].course.name_alias }}</div>
				</div>
				<div class="g" v-if="student.hasOwnProperty('grade')">
					<div class="sg" style="padding-right: 4px">
						<ui-select @setValue="setGrade" :options="gradeList" :styles="['width: 100%;']" :changed="studentIndex"></ui-select>
						<span>Grade</span>
						<b v-if="student.grade != null"></b>
					</div>
					<div class="sf" style="padding-left: 4px">
						<ui-select @setValue="setGradeFinal" :options="gradeList" :styles="['width: 100%']" :changed="studentIndex"></ui-select>
						<span>Final Grade</span>
						<b v-if="student.grade != 'INC'"></b>
					</div>
				</div>
				<div class="h" v-if="student.hasOwnProperty('grade') && (student.grade == null || (student.grade == 'INC' && student.grade_final == null))">
					<button :disabled="grade.initial == '' && grade.final == ''" @click="goSubmitGrade()">Submit Grade</button>
					<ui-loader v-if="isSubmitGrade" styles="background-color: rgba(255,255,255,0.5);"></ui-loader>
				</div>
			</div>
		</div>
		<div class="q">
			<div class="t">
				<list-e-dep-section @setValue="setSectionFromSearch"></list-e-dep-section>
			</div>
		</div>        
	</div>
</template>

<script>
	import ListEDepSection from '@/components/ListEDepSection.vue';
	import UILoader from '@/components/UILoader.vue';
	import UISelect from '@/components/UISelect.vue';

	export default {
		emits: ['setViewName'],
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			ListEDepSection
		},
		data() {
			return {
				isFetchingList: false,
				isSubmitGrade: false,
				section: {},
				sectEnrol: [],
				student: {},
				studentIndex: -1,
				gradeList: [],
				grade: { initial: '', final: '' }
			}
		},
		methods: {
			setSectionFromSearch(v) {
				this.section = v;
				this.student = {};
				this.studentIndex = -1;
				this.fetchStudents();
			},
			setGrade(v) {
				this.grade.initial = v;
			},
			setGradeFinal(v) {
				this.grade.final = v;
			},
			gradeStudent(s, i) {
				this.student = s;
				this.studentIndex = i;
			},
			fetchStudents() {
				this.isFetchingList = true;
				this.$http.get('section/'+ this.section.id +'/?section_fields=id,sect_enrol&sectenrol_fields=id,grade,grade_final,student&student_fields=id,school_id,firstname,middlename,lastname,admission&admission_fields=id,course&course_fields=id,name_alias,program_type&admissionf_status=CUR').then(res => {
					if (res.data.hasOwnProperty('sect_enrol'))
						this.sectEnrol = res.data.sect_enrol;
				}).finally(() => {
					this.isFetchingList = false;
				});
			},
			goSubmitGrade() {
				if ((this.student.grade == null && this.grade.initial != '') || (this.student.grade == 'INC' && this.student.grade_final == null && this.grade.final != '')) {
					this.isSubmitGrade= true;
					let data = { grade: this.grade.initial }, action = 'submit-grade-initial';
					if (this.student.grade == 'INC' && (this.grade.final != '')) {
						data = { grade_final: this.grade.final };
						action = 'submit-grade-final';
					}
					this.$http.put('section_enroll/'+ this.student.id +'/?action='+ action, data).then(res => {
						const s = this.sectEnrol[this.studentIndex];
						if (action == 'submit-grade-initial')
							s.grade = this.grade.initial;
						else if (action == 'submit-grade-final')
							s.grade_final = this.grade.final;
						this.sectEnrol[this.studentIndex] = s;
					}).finally(() => {
						this.isSubmitGrade = false;
					});
				}
			},
			populateGradeList() {
				for (let x = 1; x<=3; x+=0.25) {
					let g = x.toFixed(2);
					this.gradeList.push({ id: g, name: g });
				}
				this.gradeList.push({ id: '5.00', name: '5.00' });
				this.gradeList.push({ id: 'P', name: 'P' });
				this.gradeList.push({ id: 'INC', name: 'INC' });
			}
		},
		mounted() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Department – Enter Grades');
			this.populateGradeList();
		}
	}
</script>

<style scoped>
	.wrap-t { height: auto; display: grid; grid-template-columns: auto 270px; }
	.wrap-t .p { height: 100%; position: relative; display: grid; grid-template-columns: auto 270px; padding: 16px;  background-color: #fbfbf7; }
	.wrap-t .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f0 }

	.q .t { padding: 12px; }

	.p .u { height: inherit; }

	.p .u .list { background-color: #fff; }
	.p .u .list .h, .p .u .list .l .i { display: grid; grid-template-columns: 60px auto 70px 50px 60px }
	.p .u .list .h { padding: 4px 6px; background-color: #fbfbf7; font-size: 11px; }
	.p .u .list .h div { font-weight: normal }
	.p .u .list .l { height: 460px; max-height: 460px; overflow-y: hidden; position: relative;  border-bottom: 1px solid #f0f0ea; border-top: 1px solid #f0f0ea; }
	.p .u .list .l .i { padding: 7px 6px; font-size: 11px; border-bottom: 1px solid #fbfbf7; cursor: pointer; }
	.p .u .list .l .i:hover, .p .u .list .l .i.active { background-color: #f8f8f2 }
	.p .u .list .l .i div { white-space: nowrap; text-overflow: clip; overflow: hidden }

	.p .u .data { display: grid; grid-template-columns: 70px auto; padding: 0 0 12px 0; }
	.p .u .data .cc { display: flex; justify-content: center; align-items: center; font-size: 14px; background-color: #f0f0ea; font-weight: 600 }
	.p .u .data .nn { padding: 0 12px; }
	.p .u .data .nn .tt { font-size: 14px; font-weight: 600; color: #111; }
	.p .u .data .nn .ss { color: #222; }

	.p .v { margin: 30px 0 0 16px; }

	.p .v .f { background-color: #fff; padding: 16px 16px 8px 16px; }
	.p .v .f .nn { font-size: 13px; font-weight: 600; color: #111; padding-bottom: 2px;  }
	.p .v .f .ii { font-size: 11px; color: #222; }

	.p .v .g { background-color: #fff; display: grid; grid-template-columns: 50% 50%; padding: 10px 16px 20px 16px; }
	.p .v .g div { position: relative }
	.p .v .g div span { display: block; padding: 5px 0; text-align: center; font-size: 11px; }
	.p .v .g div b { display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0;  background-color: rgba(255,255,255,0.3); }

	.p .v .h { padding: 0; position: relative; height: 280px; }
	.p .v .h button { height: 28px; display: block; border: none; background-color: #fbfbf7; font-size: 11px; font-weight: 600; width: 100% }
	.p .v .h button:hover { background-color: #f0f0ea; }
</style>
