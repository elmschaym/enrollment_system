<template>
	<div class="wrap-e">
		<div class="p">
			<div class="h" v-if="enrollment.hasOwnProperty('id')">
				<div class="pixx">
					<v-icon name="user"></v-icon>
				</div>
				<div class="name">
					<div class="n">{{ enrollment.student.lastname }}, {{ enrollment.student.firstname }} {{ enrollment.student.middlename }}</div>
					<div class="m">
						<div class="d">
							<div>School ID</div>
							<div>Course & Year</div>
							<div>Academic Year</div>
						</div>
						<div class="e">
							<div>{{ enrollment.student.school_id }}</div>
							<div>{{ enrollment.admission.course.program_type +' '+ enrollment.admission.course.name }},</div>
							<div>{{ enrollment.acad_year }}, {{ enrollment.semester }}</div>
						</div>
					</div>
					
				</div>
				<div class="butt">
					<div class="d">
						<div>Academic Program</div>
						<div>Maximum Units</div>
						<div>Date Admitted</div>
						<div>Academic Status</div>
					</div>
					<div class="e">
						<div>{{ enrollment.admission.academic_program.name }}</div>
						<div>{{ enrollment.max_units }}</div>
						<div>{{ enrollment.admission.date_admitted }}</div>
						<div>{{ enrollment.acad_status }}</div>
					</div>
				</div>
			</div>
			<div class="h" v-else>
			</div>
		</div>
		<div class="q">
			<div class="r o">
				<div class="x">
					<div class="a">Enrolled Subjects</div>
					<div class="b">
						<div></div>
						<div>Code</div>
						<div>Name</div>
						<div>Section</div>
						<div>Schedule</div>
						<div>Room</div>
						<div style="text-align: center">Units</div>
					</div>
					<div class="d" v-if="enrollment.hasOwnProperty('billing') && enrollment.billing.length > 0 && enrollment.billing[0].sect_enrol.length > 0">
						<div :key="i +'subj'+ s.id" v-for="(s,i) in enrollment.billing[0].sect_enrol">
							<div style="text-align: center"><v-icon name="square"></v-icon></div>
							<div>{{ s.subject.code }}</div>
							<div>{{ s.subject.name }}</div>
							<div>{{ s.section.name }}</div>
							<div>{{ s.section.sched_days +' '+ s.section.sched_time }}</div>
							<div>{{ s.section.room.name }}</div>
							<div style="text-align: center">{{ s.subject.units }} </div>
						</div>
					</div>
					<div class="z" v-else>
						No Enrolled Subjects
					</div>
					<div class="e" v-if="enrollment.hasOwnProperty('id')">
						<div>{{ totalSubjects }} Subject(s)</div>
						<div style="text-align: right">{{ enrolledUnits }} Enrolled Units / {{ allowedUnits}} Allowed Units</div>
					</div>
					<div class="f" v-if="enrollment.hasOwnProperty('id')">
						<div><button :disabled="enrollment.is_confirmed" @click="modifySubjects()"><v-icon name="edit"></v-icon> Modify Subjects</button></div>
						<div style="text-align: right"><button @click="fetchEnrollment()">Refresh</button> <button :disabled="!enrollment.is_confirmed" style="margin-left: 10px;" @click="printEBF()">Print EBF <v-icon name="print"></v-icon></button></div>
					</div>
				</div>
				<div class="y">
					<div class="a">Miscellaneous</div>
					<div class="b">
						<div>Name</div>
						<div>Fee</div>
					</div>
					<div class="d" v-if="enrollment.hasOwnProperty('billing') && enrollment.billing.length > 0 && enrollment.billing[0].misc_bills.length > 0">
						<div :key="'misc'+ m.id" v-for="m in enrollment.billing[0].misc_bills">
							<div>{{ m.misc.name }}</div>
							<div style="text-align: right">{{ m.misc.amount | currency }}</div>
						</div>
					</div>
					<div class="z" v-else>
						For Billing Office Only
					</div>
					<div class="t">
						<div>Total Payment</div>
						<div style="font-weight: bold ">{{ totalFees | currency }}</div>
					</div>
				</div>
			</div>
			<div id="print-ebf">
				EBF
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/caret-down';
	import 'vue-awesome/icons/tag';
	import 'vue-awesome/icons/print';
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/user';

	export default {
		data() {
			return {
				isErrorConnect: false,
				isFetching: false,
				enrollment: {}
			}
		},
		computed: {
			totalFees() {
				let total = 0;
				if (this.enrollment.hasOwnProperty('billing') && this.enrollment.billing.length > 0 && this.enrollment.billing[0].misc_bills.length > 0)
					this.enrollment.billing[0].misc_bills.forEach(f => { total += f.misc.amount } );
				return total;
			},
			totalSubjects() {
				if (this.enrollment.hasOwnProperty('billing') && this.enrollment.billing.length > 0)
					return this.enrollment.billing[0].sect_enrol.length;
				return 0;
			},
			allowedUnits() {
				if (this.enrollment.hasOwnProperty('max_units'))
					return this.enrollment.max_units;
				return 0;
			},
			enrolledUnits() {
				let total = 0;
				if (this.enrollment.hasOwnProperty('billing') && this.enrollment.billing.length > 0 && this.enrollment.billing[0].sect_enrol.length > 0)
					this.enrollment.billing[0].sect_enrol.forEach(x => { total += x.subject.units });
				return total;
			}
		},
		methods: {
			fetchEnrollment() {
				this.$http.get('enrollment/'+ this.$route.params.enrol_id +'/?type=profile&enrollment_fields=id,acad_year,acad_status,semester,max_units,is_confirmed,student,admission,billing&admission_fields=id,date_admitted,course,academic_program&acadprogram_fields=name&course_fields=id,name,name_alias,program_type&student_fields=id,school_id,firstname,lastname,middlename&billing_fields=id,sect_enrol,misc_bills&sectenrol_fields=id,subject,section&miscbill_fields=id,misc&misc_fields=id,name,amount&subject_fields=id,code,name,units&section_fields=id,name,sched_days,sched_time,room&room_fields=name').then(res => {
					if (res.data.hasOwnProperty('id')) {
						this.enrollment = res.data;
					}
				});
			},
			modifySubjects() {
				this.$storageSet('dep_set_subject_stuid', this.enrollment.student.school_id, 'session');
				this.$router.push({ name: 'dep-set-subject' });
			},
            printEBF() {
                this.$htmlToPaper('print-ebf');
            }
		},
		created() {
			this.$store.commit('setModuleName', 'Enrollee Manifest');
		},
		mounted() {
			this.fetchEnrollment();
			
		}
	}
</script>

<style scoped>
	.wrap-e { height: 100%; background-color: #f9f9f9; }
	.p { padding: 16px; }

	.p .h { display: grid; grid-template-columns: 72px auto 300px; margin-bottom: 0px; height: 72px; }
	.p .h .pixx { height: 72px; width: 72px; border-radius: 36px; background-color: #f5f5f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.p .h .pixx svg { height: 64px; width: 64px; margin: 4px; color: #d5d5d0; }
	.p .h .name { padding: 4px 0 0 12px; }
	.p .h .name .n { font-size: 12px; font-weight: 600;  }
	.p .h .name .m { display: grid; grid-template-columns: 100px auto }
	.p .h .name .m .d > div { margin-top: 5px; font-size: 11px; color: #444; }
	.p .h .name .m .e > div { margin-top: 5px; font-size: 11px; color: #111; }
	.p .h .butt { display: grid; grid-template-columns: 120px auto }
	.p .h .butt .d > div { margin-top: 5px; font-size: 11px; color: #444; }
	.p .h .butt .e > div { margin-top: 5px; font-size: 11px; color: #111; }

	.q .r.o {}
	.q .r.o { display: grid; grid-template-columns: auto 350px; margin: 8px 16px; }
	.q .r.o .x { margin-right: 16px;}
	.q .r.o .x .a { font-size: 11px; color: #111; padding: 6px 7px; border-top: 1px solid #f0f0f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); background-color: #fff; font-weight: 600; text-align: center }
	.q .r.o .x .b, .q .r.o .x .d > div { display: grid; grid-template-columns: 20px 70px auto 55px 155px 60px 40px  }
	.q .r.o .x .z { text-align: center; padding: 16px; font-size: 11px; }
	.q .r.o .x .b { background-color: #fefefe; margin-top: 2px; iborder-bottom: 1px solid #fafafa; }
	.q .r.o .x .b div { padding: 7px; font-size: 10px; }
	.q .r.o .x .d { height: 270px; overflow-y: scroll; background-color: #fff; }
	.q .r.o .x .d > div {}
	.q .r.o .x .d > div  div { padding: 6px 7px; font-size: 11px; border-bottom: 1px solid #fafafa; }
	.q .r.o .x .d > div div svg { width: 10px; height: 10px; color: #b0b0b0; }
	.q .r.o .x .z { height: 270px; background-color: #fff; }
	.q .r.o .x .e { display: grid; grid-template-columns: 40% 60%; font-size: 10px; color: #111; padding: 6px 7px; border-top: 1px solid #fbfbfb; background-color: #fdfdfd; box-shadow: 0 1px 1px rgba(0,0,0,0.24); height: 24px; }
	
	.q .r.o .x .f { padding: 16px 0; display: grid; grid-template-columns: 50% 50%; }
	.q .r.o .x .f button { border-radius: 2px; color: #000; padding: 4px 12px; border: none; background-color: #f5f5ed; font-size: 11px; outline: none; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
	.q .r.o .x .f button:disabled { box-shadow: 0 1px 3px rgba(0,0,0,0.12); }
	.q .r.o .x .f button svg { width: 10px; height: 10px; margin-left: 8px; }

	.q .r.o .y { background-color: #fff; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.q .r.o .y .a { font-size: 11px; color: #111; padding: 6px 0; text-align: center; border-top: 1px solid #f0f0f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); background-color: #fff; font-weight: 600 }
	.q .r.o .y .b, .q .r.o .y .d > div { display: grid; grid-template-columns: auto 86px }
	.q .r.o .y .b { border-bottom: 1px solid #fafafa; background-color: #fefefe; margin-top: 2px; }
	.q .r.o .y .b div { padding: 7px 12px; font-size: 10px; }
	.q .r.o .y .d { height: 370px; overflow-y: scroll;  }
	.q .r.o .y .d > div div { padding: 6px 12px; font-size: 11px; }
	.q .r.o .y .d > div div svg { width: 10px; height: 10px; color: #b0b0b0; }
	.q .r.o .y .d > div { border-bottom: 1px solid #fafafa; }
	.q .r.o .y .z { height: 370px; text-align: center; padding: 16px; font-size: 11px; }

	.q .r.o .y .t { display: grid; grid-template-columns: auto 86px; border-top: 1px solid #eaeaea; }
	.q .r.o .y .t div { padding: 7px 12px; font-size: 11px; }
</style>
