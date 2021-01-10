<template>
	<div class="form-o">
		<div class="w">
			<div class="p">
				<div class="u">
					<div class="h">
						<div class="pixx">
							<v-icon name="user"></v-icon>
						</div>
						<div class="name">
							<div class="n">{{ fullname }}</div>
							<div class="m"><span>{{ student.school_id }}</span></div>
						</div>
						<div v-show="false" class="butt">
							<div>
								<div>Previous Admission: </div>
								<div>Date Last Ad</div>
							</div>
							<div>
								<div>Undergrad-4</div>
								<div>Undergra</div>
							</div>
						</div>
					</div>
					<div class="g">
						<div class="b">
							<span>Academic Program (Admission)</span>
						</div>
						<div class="c">
							<ui-select @setValue="setAcademicType" :options="acad_programs" :styles="['border-radius: 2px; width: 100%; padding: 6px 10px 6px 10px', '']"></ui-select>
							<div class="d">
								<div><span>Admission Date</span></div>
								<div>
									<input type="text" placeholder="yyyy-mm-dd" v-model="admission.date_admitted" maxlength="10"/> <button @click="setDateAdmittedNow()">now</button> <button @click="isDatePickerShow = !isDatePickerShow">open calendar</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="v">
					<div id="print-adm" v-if="printStudentData.hasOwnProperty('id')">
						<div style="font-family: 'Cairo'; font-size: 12px">
							<div style=" margin-bottom: 16px; text-align: center">
								<h4 style="margin: 0">Mindanao State University</h4>
								<h5 style="margin: 0; font-weight: normal">Marawi City, Philippines</h5>
								<h3 style="margin: 0">CERTIFICATE OF ADMISSION</h3>
							</div>
							<div style="display: grid; grid-template-columns: 120px auto 120px auto; width: 100%; padding: 16px 0; margin: 16px 0; border-bottom: 2px solid #e0e0e0; border-top: 2px solid #a0a090">
								<div style="text-align: right; padding-right: 8px">
									<div>Student Name:</div>
									<div>Gender</div>
									<div>Civil Status:</div>
									<div>Acad Type:</div>
								</div>
								<div style="color: #000">
									<div>{{ printStudentData.lastname }}, {{ printStudentData.firstname }} {{ printStudentData.middlename }}</div>
									<div>{{ getGender(printStudentData.gender) }}</div>
									<div>{{ getCivilStatus(printStudentData.civil_status) }}</div>
									<div>{{ printAcademicData.program_type }}</div>
								</div>
								<div style="text-align: right; padding-right: 8px">
									<div>School ID:</div>
									<div>Admitted:</div>
									<div>Acade Year:</div>
									<div>Semester:</div>
								</div>
								<div style="color: #000">
									<div>{{ printStudentData.school_id }}</div>
									<div>{{ printAcademicData.date_admitted }}</div>
									<div>2020-2020</div>
									<div>1st Semester</div>
								</div>
							</div>
							<div style="display: grid; grid-template-columns: 50% 50%; width: 100%; padding: 8px 0; font-size: 11px">
								<div>Date Printed: <span style="text-decoration: underline;">2020-11-21 13:47</span></div>
								<div style="text-align: right">Approved By: <span style="text-decoration: underline;">Caras, Paul Lauresta</span></div>
							</div>
						</div>
					</div>
				</div>
				<date-picker class="dp-wrap" @selected="setDateAdmittedDP($event)" v-if="isDatePickerShow" :format="'yyyy-MM-dd'" :inline="true"></date-picker>
				<div class="dp-back" v-if="isDatePickerShow"></div>
				<div class="dsbd" v-if="student.id == 0"></div>
			</div>
			<div class="q">
				<div class="t">
					<find-e-student @setValue="setStudIDFromSearch"></find-e-student>
				</div>
				<div class="s">
					<button :class="['br-confirm', isFormOkay ? 'okay' : '']" @click="goSaveAdmittee()" :disabled="isSavingForm || !isFormOkay"><v-icon name="plus"></v-icon> Admit Student</button>
				</div>
			</div>
		</div>
		<ui-modal-listener v-if="isModalShow && isSubmitOkay" @modalClose="modalClose" @listenedYes="printAdmission" listenLabel="Print Admission" class="moda-l">
			<div slot="text">
				Student admitted successfully. Proceed to preferred Department for Enrollment and Course selection.
			</div>
		</ui-modal-listener>
		<ui-modal-informer v-if="isModalShow && !isSubmitOkay" @informedOkay="modalClose" class="moda-l">
			<div slot="text">
				Student couldn't be admitted. There has been an existing admission and/or your request is invalid.<br/><span style="font-size: 10px">Error Code: 401 Bad Request</span>
			</div>
		</ui-modal-informer>
		<ui-loader v-if="isSavingForm"></ui-loader>
	</div>
</template>

<script>
	import DatePicker from 'vuejs-datepicker';
	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';
	import FindEStudent from '@/components/FindEStudent.vue';
	import UIModalListener from '@/components/UIModalListener.vue';
	import UIModalInformer from '@/components/UIModalInformer.vue';

	import 'vue-awesome/icons/user';

	export default {
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			FindEStudent,
			UiModalListener: UIModalListener,
			UiModalInformer: UIModalInformer,
			DatePicker
		},
		data() {
			return {
				isSavingForm: false,
				isModalShow: false,
				isDatePickerShow: false,
				isSubmitOkay: false,
				student: { id: 0, school_id: '', firstname: '', middlename: '', lastname: '' },
				acad_programs: [],
				acad_program_id: 0,
				admission: { date_admitted: '' },
				printStudentData: {},
				printAcademicData: { program_type: '', date_damitted: '' }
			}
		},
		computed: {
			isFormOkay() {
				let isStudFormOkay = true, isAdmitFormOkay = true;
				for (let o in this.student) isStudFormOkay = isStudFormOkay && this.student[o] != '';
				for (let o in this.admission) isAdmitFormOkay = isAdmitFormOkay && this.admission[o] != '';
				return isStudFormOkay && isAdmitFormOkay && this.acad_program_id > 0;
			},
			fullname() {
				return this.student.lastname +', '+ this.student.firstname +' '+ this.student.middlename;
			}
		},
		methods: {
			setAcademicType(v) {
				this.acad_program_id = v;
				this.printAcademicData.program_type = this.acad_programs.length > 0 ? this.acad_programs.find(x => x.id === v).name : '';
			},
			setStudIDFromSearch(v) {
				this.student = v;
			},
			getGender(v) {
				return this.$store.state.forms.student.gender.find(x => x.id == v).name;
			},
			getCivilStatus(v) {
				return this.$store.state.forms.student.civil_status.find(x => x.id == v).name;
			},
			setDateAdmittedNow() {
				this.admission.date_admitted = this.formatDate(new Date());
			},
			setDateAdmittedDP(event) {
				this.isDatePickerShow = false;
				this.admission.date_admitted = this.formatDate(event);
			},
			formatDate(d) {
				let dd = d.getDate() < 10 ? 0 + d.getDate().toString() : d.getDate(),
					nn = d.getMonth() + 1,
					mm = nn < 10 ? 0 + nn.toString() : nn;
				return d.getFullYear().toString() +'-'+ mm +'-'+ dd;
			},
			goSaveAdmittee() {
				this.isSavingForm = true;
				if (this.isFormOkay) {
					this.$http.post('admission/?school_id='+ this.student.school_id +'&student_fields=id,school_id,firstname,middlename,lastname,gender,civil_status', Object.assign({}, this.admission, { student: this.student.id, academic_program: this.acad_program_id, course: 1 })).then( res => {
						if (res.status == 201) {
							this.printStudentData = res.data;
							this.printAcademicData.date_admitted = this.admission.date_admitted;
							this.isModalShow = true;
							this.isSubmitOkay = true;
						} else {
							this.isModalShow = true;
							this.isSubmitOkay = false;
						}
					}).catch( () => {
						this.isModalShow = true;
						this.isSubmitOkay = false;
					}).finally( () => {
						this.isSavingForm = false;
					});
				}
			},
			fetchAcademicProgram() {
				this.$http.get('academic_program/').then( res => {
					this.acad_programs = res.data;
				});
			},
			modalClose(v) {
				this.student = { id: 0, school_id: '', firstname: '', middlename: '', lastname: '' };
				this.isModalShow = false;
			},
			printAdmission() {
				this.$htmlToPaper('print-adm');
			}
		},
		watch: {
			'$store.isReloadView'() {
				this.fetchAcademicProgram();
			}
		},
		created() {
			this.fetchAcademicProgram();
			this.$store.commit('setModuleName', 'Admission – New Admittee');
		}
	}
</script>

<style scoped>
	.form-o { position: relative; height: auto;  }
	.form-o .w { height: 100%; display: grid; grid-template-columns: auto 280px; }
	.form-o .w .p { height: 100%; padding: 16px; position: relative; }
	.form-o .w .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f2; display: grid; grid-template-rows: auto 70px; }

	.p .u { position: relative; }

	.p .h { padding: 0 0 8px 0; border-bottom: 1px solid #d0d0c0; display: grid; grid-template-columns: 40px auto 200px; margin-bottom: 0px;}
	.p .h .pixx { height: 40px; width: 40px; background-color: #f5f5f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.p .h .pixx svg { height: 32px; width: 32px; margin: 4px; color: #d5d5d0; }
	.p .h .name { padding: 0 0 0 12px; }
	.p .h .name .n { font-size: 12px; font-weight: 600; margin: 4px 0; }
	.p .h .name .m { font-size: 11px;  }
	.p .h .butt { display: grid; grid-template-columns: 50% 50%; }

	.p .g { padding: 16px 0; display: grid; grid-template-columns: 200px auto }
	.p .g .b {}
	.p .g .b span { display: block; padding: 7px 0; }
	.p .g .c {}
	.p .g .c .d { padding: 12px 0; display: grid; grid-template-columns: 100px auto }
	.p .g .c .d div span { display: block; padding: 6px 0; }
	.p .g .c .d div input { border: none; height: 24px; border-bottom: 1px solid #c0c0ba; font-size: 11px; }
	.p .g .c .d div button { margin-left: 10px; height: 24px; padding: 0px 12px; border: 1px solid #e0e0d0; background: #fbfbf7; border-radius: 2px; font-size: 11px; color: #444; }

	.q .t { padding: 16px 12px; }

	.q .s { text-align: center; background-color: #f0f0ea; height: 70px; padding: 20px 0; }
	.q .s button {}
	.q .s button svg { height: 10px; width: 10px; color: #808080; }
	.q .s button.okay { border: 1px outset #e0e0d0; color: #000; }
	.q .s button.okay svg { color: #000; }

	.dp-wrap { position: absolute; top: 150px; left: calc((100% - 300px) / 2); z-index: 9999; }
	.dp-back { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.15) }

	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff }

	#print-adm { display: none }
	.v { position: relative; }
</style>
