<template>
	<div class="form-c">
		<div class="w">
			<div class="p">
				<div class="z">Registration Confirmation</div>
				<div class="a" v-if="enrollment.hasOwnProperty('id')">
					<div class="x">
						<div class="n">Account Holder</div><div class="v">{{ enrollment.student.lastname }}, {{ enrollment.student.firstname }} {{ enrollment.student.middlename }}</div>
						<div class="n">School ID</div><div class="v">{{ enrollment.student.school_id }}</div>
						<div class="n">Course</div><div class="v">{{ enrollment.course.program_type +' '+ enrollment.course.name }}</div>
						<div class="n">Academic Prog.</div><div class="v">{{ enrollment.academic_program.name }}</div>
					</div>
					<div class="y">
						<div class="n ta-r">Academic Year</div><div class="v ta-r">{{ enrollment.enrollment.acad_year }}</div>
						<div class="n ta-r">Semester</div><div class="v ta-r">{{ enrollment.enrollment.semester }}</div>
						<div class="n ta-r">Academic Stat</div><div class="v ta-r">{{ enrollment.enrollment.acad_status }}</div>
						<div class="n ta-r">Date Admitted</div><div class="v ta-r">{{ enrollment.date_admitted }}</div>
					</div>
				</div>
				<div class="b">
					<div class="x">
						<div class="h">
							<div></div>
							<div>Code</div>
							<div>Name</div>
							<div>Remarks</div>
							<div>Final Remarks</div>
						</div>
						<div class="g" v-if="enrollment.hasOwnProperty('enrollment') && enrollment.enrollment.hasOwnProperty('billing') && enrollment.enrollment.billing.length > 0 && enrollment.enrollment.billing[0].sect_enrol.length > 0">
							<div class="i" :key="i +'subj'+ s.id" v-for="(s,i) in enrollment.enrollment.billing[0].sect_enrol">
								<div class="ta-c"><v-icon name="square"></v-icon></div>
								<div>{{ s.subject.code }}</div>
								<div>{{ s.subject.name }}</div>
								<div>{{ s.grade }}</div>
								<div>{{ s.grade_final }}</div>
							</div>
						</div>
						<div class="g" v-else>
							<div style="text-align: center; padding: 20px">No Enrolled Subjects</div>
						</div>
						<div class="k">
							<div><span>{{ totalSubjects }}</span> Subject(s)</div>
							<div><span>{{ enrolledUnits }}</span> Total Units</div>
							<div></div>
							<div class="ta-r">Date Confirmed: <span>{{ enrollment.hasOwnProperty('enrollment') ? enrollment.enrollment.confirmed_at : '' }}</span></div>
						</div>
					</div>
				</div>
				<div class="dsbd" v-if="!enrollment.hasOwnProperty('id')"></div>
			</div>
			<div class="q">
				<div class="t">
					<div>
						<span>Semester</span>
						<ui-select @setValue="setSemester" :options="[{ id: '1ST', name: '1ST' }, { id: '2ND', name: '2ND' }, { id: '3RD', name: '3RD' }]" :presets="{ id: '1ST', name: '1ST' }" :styles="['border-radius: 2px; width: 100%; padding: 6px 10px 6px 10px; border-color: #a0a09a #90908a #70706a #90908a;', '']"></ui-select>
					</div>
					<div style="padding-left: 10px">
						<span>Academic Year</span>
						<ui-select @setValue="setAcademicYear" :options="[{ id: '2020-2021', name: '2020-2021' }, { id: '2021-2022', name: '2021-2022' }, { id: '2022-2023', name: '2022-2023' }]" :presets="{ id: '2020-2021', name: '2020-2021' }" :styles="['border-radius: 2px; width: 100%; padding: 6px 10px 6px 10px; border-color: #a0a09a #90908a #70706a #90908a;', '']"></ui-select>
					</div>
				</div>
				<div class="r">
					<div class="g">
						<find-e-admission @setValue="setAdmissionFromSearch" :filters="{ stat: false, mode: 'all' }" fields="admissionf_status=CUR"></find-e-admission>
					</div>
					<div class="h">
						<div class="e" v-if="isErrorConnect">
							{{ errorMessage }}
						</div>
					</div>
				</div>
				<div class="s">
					<button :class="['br-confirm', isFormOkay ? 'okay' : '']" @click="printCOR" :disabled="isSavingForm || !isFormOkay"><v-icon name="print"></v-icon> Print Slip</button>
				</div>
			</div>
		</div>
		<div id="print-g-slip">
			<print-g-slip v-if="isPrintable" :enrollment="enrollment" :tally="{ totalSubjects, allowedUnits, enrolledUnits }"></print-g-slip>
		</div>
	</div>
</template>

<script>
    import PrintGSlip from '@/components/PrintGSlip.vue';
	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';
	import FindEAdmission from '@/components/FindEAdmission.vue';

	import 'vue-awesome/icons/user';
	import 'vue-awesome/icons/id-card';
	import 'vue-awesome/icons/print';
	import 'vue-awesome/icons/square';

	export default {
		emits: ['setViewName'],
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			FindEAdmission,
			PrintGSlip
		},
		data() {
			return {
				errorMessage: '',
				isModalShow: false,
				isSavingForm: false,
				isErrorConnect: false,
				admission: {},
				enrollment: {},
				calendar: { year: '', semester: '' }
			}
		},
		computed: {
			isFormOkay() {
				return true;
			},
			totalSubjects() {
				if (this.enrollment.hasOwnProperty('enrollment') && this.enrollment.enrollment.billing.length > 0)
					return this.enrollment.enrollment.billing[0].sect_enrol.length;
				return 0;
			},
			allowedUnits() {
				if (this.enrollment.hasOwnProperty('enrollment'))
					return this.enrollment.enrollment.max_units;
				return 0;
			},
			enrolledUnits() {
				let total = 0;
				if (this.enrollment.hasOwnProperty('enrollment') && this.enrollment.enrollment.billing.length > 0 && this.enrollment.enrollment.billing[0].sect_enrol.length > 0)
					this.enrollment.enrollment.billing[0].sect_enrol.forEach(x => { total += x.subject.units });
				return total;
			},
			isPrintable() {
				return this.enrollment.hasOwnProperty('enrollment') && this.enrollment.enrollment.billing.length > 0 && this.enrollment.enrollment.billing[0].sect_enrol.length > 0;
			}
		},
		methods: {
			setAdmissionFromSearch(v) {
				this.admission = v;
				this.enrollment = {};
				this.fetchEnrollment();
			},
			setSemester(v) {
				this.calendar.semester = v;
			},
			setAcademicYear(v) {
				this.calendar.year = v;
			},
			fetchEnrollment() {
				this.$http.get('admission/'+ this.admission.id +'/?type=for-cor&enrollment_fields=id,acad_year,acad_status,semester,max_units,is_confirmed,confirmed_at,billing&admission_fields=id,date_admitted,course,academic_program,student,enrollment&acadprogram_fields=name&course_fields=id,name,name_alias,program_type&student_fields=id,school_id,firstname,lastname,middlename,civil_status,religion,gender&billing_fields=id,sect_enrol,misc_bills&sectenrol_fields=id,grade,grade_final,subject,section&miscbill_fields=id,misc&misc_fields=id,name,amount&subject_fields=id,code,name,units&section_fields=id,name,sched_days,sched_time,room&room_fields=name&admissionf_status=CUR&billingf_to_bill=ENR&billingf_is_paid=true&enrollmentf_acad_year='+ this.calendar.year +'&enrollmentf_semester='+ this.calendar.semester).then(res => {
					if (res.data.hasOwnProperty('id')) {
						this.enrollment = res.data;
					}
				});
			},
            printCOR() {
                this.$htmlToPaper('print-g-slip');
            }
		},
		created() {
			this.$store.commit('setModuleName', 'Admission – Grade Slip');
		}
	}
</script>

<style scoped>
	.form-c { height: 100%; position: relative; }
	.form-c .w { height: 100%; display: grid; grid-template-columns: auto 270px; }
	.form-c .w .p { height: 100%; position: relative; display: }
	.form-c .w .q { height: 100%; display: grid; grid-template-rows: 60px auto 70px; border-left: 1px solid #f0f0f0; background: #f8f8f2; }

	.p { background-color: #fff; height: 50px; }
	.p .z { padding: 12px; font-weight: 600; text-align: center; font-size: 14px; border-bottom: 4px solid #f8f8f2; }
	.p .a { height: 88px; padding: 12px; display: grid; grid-template-columns: 60% 40%; }
	.p .a .x, .p .a .y { display: grid; grid-template-columns: 140px auto }
	.p .a .x div, .p .a .y div { padding-bottom: 4px; font-size: 11px; }

	.p .a .x .n, .p .a .y .n { color: #222; }
	.p .a .x .v, .p .a .y .v { color: #000; font-weight: 600 }

	.p .b {}
	.p .b .x {}
	.p .b .x .h, .p .b .x .g .i { display: grid; grid-template-columns: 28px 70px auto 120px 150px }
	.p .b .x .h { background-color: #f8f8f2; }
	.p .b .x .h div { font-size: 11px; padding: 6px 0; }
	.p .b .x .g { border-bottom: 1px solid #f8f8f0; height: 240px; overflow-y: scroll; }
	.p .b .x .g .i { border-bottom: 1px solid #fbfbf7; }
	.p .b .x .g .i div { font-size: 11px; padding: 6px 0; }
	.p .b .x .g .i div svg { width: 10px; height: 10px; color: #c0c0c0; }

	.p .b .x .k { padding: 5px 12px; display: grid; grid-template-columns: 98px 120px auto 170px }
	.p .b .x .k div { font-size: 11px; }
	.p .b .x .k div span { font-weight: 600; }

	.q .t { display: grid; grid-template-columns: 80px auto; margin: 12px; }
	.q .t span { display: block; font-size: 11px; color: #222; padding-bottom: 4px; }
	.q .r { position: relative; }
	.q .r .h { position: absolute; bottom: 20px; left: 12px; right: 12px; }
	.q .r .h .e { color: #fd4646; background-color: #fde6e6; padding: 12px 6px; text-align: center; box-shadow: 0 1px 2px rgba(0,0,0,0.2); }
	.q .r .g { margin: 12px; }

	.q .s { text-align: center; background-color: #f0f0ed; height: 70px; padding: 20px 0; }
	.q .s button {}
	.q .s button svg { height: 10px; width: 10px; color: #808080; }
	.q .s button.okay { border: 1px outset #e0e0d0; color: #000; }
	.q .s button.okay svg { color: #000; }


	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff }
	#print-g-slip { display: none; }
</style>
