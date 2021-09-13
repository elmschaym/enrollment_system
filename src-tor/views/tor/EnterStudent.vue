<template>
	<div class="form-o">
		<div class="w">
			<div class="p">
				<div class="u">
					<div class="h">
						<div class="name">Basic Information</div>
					</div>
					<div class="r a">
						<div class="c" style="padding-top: 10px">
							<div>
								<input style="width: 95%" v-model="student.firstname" placeholder="First Name*" maxlength="32"/>
							</div>
							<div>
								<input style="width: 95%" v-model="student.middlename" placeholder="Middle Name*" maxlength="32"/>
							</div>
							<div>
								<input style="width: 95%" v-model="student.lastname" placeholder="Last Name*" maxlength="32"/>
							</div>
							<div style="display: grid; grid-template-columns: 32px auto">
								<span style="height: 28px; border-radius: 2px; color: #000; padding: 7px 8px 8px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer;border-style: solid; border-width: 1px 0 1px 1px; border-color: #a0a09a #90908a #70706a #90908a;"><v-icon name="id-card"></v-icon></span><input type="number" placeholder="Student ID*" v-model.number="student.school_id"/>
							</div>
						</div>
					</div>
					<div class="r d">
						<div class="c">
							<div>
								<label for="">Gender*</label>
								<ui-select @setValue="setStudentGender" :options="$store.state.forms.student.gender" :styles="['border-radius: 2px; width: 90%; padding: 5px 10px 5px 10px; border-color: #a0a09a #90908a #70706a #90908a;']"></ui-select>
							</div>
							<div>
								<label for="">Religion*</label>
								<input style="width: 95%" placeholder="" v-model="student.religion" maxlength="32" />
							</div>
							<div>
								<label for="">Citizenship*</label>
								<input style="width: 95%" placeholder="" v-model="student.citizenship" maxlength="255" />
							</div>
							<div>
								<label for="">Civil Status*</label>
								<ui-select @setValue="setStudentCivilStatus" :options="$store.state.forms.student.civil_status" :styles="['border-radius: 2px; width: 90%; padding: 5px 10px 5px 10px; border-color: #a0a09a #90908a #70706a #90908a;', '']"></ui-select>
							</div>
							<div>
								<label for="">Date of Birth*</label>
								<div  style="display: grid; grid-template-columns: auto 24px">
									<input v-model="student.birthdate" placeholder="yyyy-mm-dd" maxlength="10"/>
									<button @click="isDatePickerShow = !isDatePickerShow" style="padding: 5px;"><v-icon name="calendar" style="width: 10px; height: 10px; color: #303030"></v-icon></button>
								</div>
							</div>
						</div>
					</div>
					<div class="r b">
						<div class="c" style="padding-top: 10px">
							<div>
								<textarea v-model="student.home_address" style="width: 95%" placeholder="Home Address*" maxlength="255" ></textarea>
								<div class="info"></div>
							</div>
							<div>
								<input style="width: 100%; margin-bottom: 12px;" v-model="student.birth_address" placeholder="Birth Address*" maxlength="255"/>
								<input style="width: 100%" v-model="student.campus_address" placeholder="Campus Address" maxlength="255"/>
							</div>
						</div>
					</div>
				</div>
				<div class="v">
					<div class="h">
						<div class="name">Other Information</div>
					</div>
					<div class="r a">
						<div class="c" style="padding-right: 8px">
							<fieldset style="margin-bottom: 10px">
								<legend>Father's Details</legend>
								<div style="display: grid; grid-template-columns: auto 100px">
									<div style="padding-right: 10px">
										<input style="width: 100%" v-model="studentx.father_fname" placeholder="First Name*" maxlength="32" />
									</div>
									<div>
										<input style="width: 100%" v-model="studentx.father_mname" placeholder="Middle Name*"  maxlength="32" />
									</div>
								</div>
								<div style="display: grid; grid-template-columns: 120px auto">
									<div style="padding-right: 10px">
										<input style="width: 100%" v-model="studentx.father_lname" placeholder="Last Name*" maxlength="32" />
									</div>
									<div>
										<input style="width: 100%" v-model="studentx.father_occupation" placeholder="Occupation" maxlength="32" />
									</div>
								</div>
							</fieldset>
							<fieldset>
								<legend>Mother's Details</legend>
								<div style="display: grid; grid-template-columns: auto 100px">
									<div style="padding-right: 10px">
										<input style="width: 100%" v-model="studentx.mother_fname" placeholder="First Name" maxlength="32" />
									</div>
									<div>
										<input style="width: 100%" v-model="studentx.mother_mname" placeholder="Middle Name" maxlength="32" />
									</div>
								</div>
								<div style="display: grid; grid-template-columns: 120px auto">
									<div style="padding-right: 10px">
										<input style="width: 100%" v-model="studentx.mother_lname" placeholder="Last Name" maxlength="32" />
									</div>
									<div>
										<input style="width: 100%" v-model="studentx.mother_occupation" placeholder="Occupation" maxlength="32" />
									</div>
								</div>
							</fieldset>
						</div>
						<div class="c" style="padding-left: 8px">
							<fieldset style="height: 120px; display: block; margin-bottom: 10px;">
								<legend>Contact Details</legend>
								<div style="display: grid; grid-template-columns: 50% 50%">
									<div style="padding-right: 10px">
										<input style="width: 100%" v-model="studentx.mobile_number" placeholder="Mobile Number (+639)" maxlength="16"/>
									</div>
									<div>
										<input style="width: 100%" v-model="studentx.telephone_number" placeholder="Telephone"  maxlength="16" />
									</div>
								</div>
								<div style="">
									<div>
										<input style="width: 100%" v-model="studentx.email_address" placeholder="Email Address" maxlength="64"/>
										<v-icon name="at"></v-icon>
									</div>
								</div>
							</fieldset>
							<fieldset style="height: 200px; display: block">
								<legend>Upload Photo*</legend>
								<div style="display: grid; grid-template-columns: auto 110px">
									<div>
										<input type="file" style="width: 100%" @change="setPhoto" placeholder="Photo" accept="image/*"/>
									</div>
									<div style="text-align: right;">
										<img v-if="studPhoto" :src="studPhoto.path" style="width: 96px; height: 96px; border: 1px outset #f0f0ea;"/>
										<span v-if="studPhoto" @click="studPhoto = null" style="display: block; width: 96px; border: 1px solid #909090; font-size: 10px; text-transform: uppercase; margin-left: 15px; margin-top: 4px; text-align: center;">Clear</span>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
				</div>
				<date-picker class="dp-wrap" @selected="setBirthdateDP($event)" v-if="isDatePickerShow" format="yyyy-MM-dd" :inline="true"></date-picker>
				<div class="dp-back" v-if="isDatePickerShow"></div>
			</div>
			<div class="q">
				<div class="t">
					<div class="a">
						<div class="h">
							Educational Attainment
						</div>
						<div class="g">
							<div>
								<input v-model="studenty.educ_elem_name" placeholder="Elementary" maxlength="255" /><input v-model="studenty.educ_elem_year" maxlength="10" placeholder="Year"/>
							</div>
							<div>
								<input v-model="studenty.educ_hsjr_name" placeholder="High School" maxlength="255" /><input v-model="studenty.educ_hsjr_year" maxlength="10" placeholder="Year"/>
							</div>
							<div>
								<input v-model="studenty.educ_col0_name" placeholder="College/University" maxlength="255" /><input v-model="studenty.educ_col0_year" maxlength="10" placeholder="Year"/>
							</div>
						</div>
					</div>
					<div class="b">
						<fieldset>
							<legend>Select Course</legend>
							<div class="list" v-if="courses.length > 0">
                                <div :class="['l', courseId == c.id ? 'active' : '']" v-for="(c,i) in courses" :key="'c_'+i" @click="setCourse(c.id)">
                                    <v-icon name="square"></v-icon>
                                    <span>{{ c.program_type }} {{ c.name }}</span>
                                    <i v-if="courseId == c.id">√</i>
                                    <i v-else>□</i>
                                </div>
                            </div>
						</fieldset>
					</div>
				</div>
				<div class="s">
					<button :class="['br-confirm', isFormOkay ? 'okay' : '']" @click="goSaveStudent()" :disabled="isSavingForm || !isFormOkay"><v-icon name="plus"></v-icon> Save Information</button>
				</div>
			</div>
		</div>
		<ui-modal-listener v-if="isGenSIDError" @modalClose="modalAClose" @listendYes="modalAClose" listenLabel="Reconnect" class="moda-l">
			<div slot="text">
				There was an error connecting on server. Please contact your server administrator to fix this issue. <br/><span style="font-size: 10px">Error Code: 400 No Connection</span>
			</div>
		</ui-modal-listener>
		<ui-modal-informer v-if="isSubmitError" @informedOkay="modalBClose" class="moda-l">
			<div slot="text">
				There was an error processing your request. Please contact your server administrator to fix this issue. <br/><span style="font-size: 10px">Error Code: 401 Bad Request</span>
			</div>
		</ui-modal-informer>
		<ui-loader v-if="isSavingForm"></ui-loader>
	</div>
</template>

<script>
	import DatePicker from 'vuejs-datepicker';

	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';
	import UIModalListener from '@/components/UIModalListener.vue';
	import UIModalInformer from '@/components/UIModalInformer.vue';

	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/chevron-right';
	import 'vue-awesome/icons/calendar';
	import 'vue-awesome/icons/at';
	import 'vue-awesome/icons/id-card';

	export default {
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			UiModalListener: UIModalListener,
			UiModalInformer: UIModalInformer,
			DatePicker
		},
		data() {
			return {
				isSavingForm: false,
				isGenSIDError: false,
				isSubmitError: false,
				isFetchingList: false,
				student: { school_id: null, firstname: '', middlename: '', lastname: '', gender: '', religion: '', civil_status: '', birthdate: '', home_address: '', birth_address: '', citizenship: 'FILIPINO', course: 0 },
				studentx: { mother_occupation: '', mother_lname: '', mother_mname: '', mother_fname: '', father_occupation: '', father_lname: '', father_mname: '', father_fname: '', telephone_number: '', mobile_number: '', email_address: '', campus_address: '', is_new: false },
				studenty: { educ_elem_name: '', educ_elem_year: '', educ_hsjr_name: '', educ_hsjr_year: '', educ_col0_name: '', educ_col0_year: '' },
				studPhoto: null,
				isDatePickerShow: false,
				courses: [],
				courseId: 0
			}
		},
		computed: {
			isFormOkay() {
				let isStudFormOkay = true;
				for (let o in this.student)
					isStudFormOkay = isStudFormOkay && this.student[o] != '';
				return isStudFormOkay;
			}
		},
		methods: {
			setCourse(id) {
				this.student.course = id;
				this.courseId = id;
			},
			setPhoto(e) {
				this.studPhoto = e.target.files[0];
			},
			fetchCourses() {
                this.isFetchingList = true;
                this.$http.get('course/?action=lister&start=0&limit=100&refer=department-old&course_fields=id,name,name_alias,program_type,acadprogram&acadprogram_fields=id,name&coursef_is_available=false').then( res => { 
                    this.courses = res.data;
                }).catch( () => {
                    this.isErrorConnect = true;
                }).finally( () => {
                    this.isFetchingList = false
                });
            },
			goSaveStudent() {
				this.isSavingForm = true;
				let studFields = Object.assign({}, this.student, this.studentx, this.studenty), formData = new FormData();
				for (let v in studFields) {
					formData.append(v, studFields[v]);
				}
				formData.append('photo', this.studPhoto);
				if (this.isFormOkay) {
					this.$http.post('student/', formData, { headers: { 'Content-Type': 'multipart/form-data' }}).then( res => {
						let data = res.data;
						this.$router.push({ name: 'list-student' });
					}).catch( () => {
						this.isSubmitError = true;
						this.isSavingForm = false;
					}).finally( () => {
						this.$sleep(2500).then( () => { this.isSavingForm = false });
					});
				}
			},
			setBirthdateDP(event) {
				this.isDatePickerShow = false;
				let dd = event.getDate() < 10 ? 0 + event.getDate().toString() : event.getDate(),
					nn = event.getMonth() + 1,
					mm = nn < 10 ? 0 + nn.toString() : nn;
				this.student.birthdate = event.getFullYear().toString() +'-'+ mm +'-'+ dd;
			},
			setStudentGender(v) {
				this.student.gender = v;
			},
			setStudentCivilStatus(v) {
				this.student.civil_status = v;
			},
			getRandomInt(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			modalAClose(v) {
				this.isGenSIDError = false;
			},
			modalBClose(v) {
				this.isSubmitError = false;
			}
		},
		created() {
			this.$store.commit('setModuleName', 'Students – New Student');
		},
		mounted() {
			this.fetchCourses();
		}
	}
</script>

<style scoped>
	.form-o { position: relative; height: auto;  }
	.form-o .w { height: 100%; display: grid; grid-template-columns: auto 312px; }
	.form-o .w .p { height: 100%; position: relative; display: grid; grid-template-rows: 230px auto; }
	.form-o .w .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f2; display: grid; grid-template-rows: auto 70px; }

	.form-o .w .p input { width: 100%; height: 28px; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #a0a09a #90908a #70706a #90908a; }
	.form-o .w .p ::placeholder { color: #222; }
	.form-o .w .p select { border-radius: 5px; color: #000; padding: 5px 12px 5px 12px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; font-size: 11px; border-width: 1px; border-style: solid; border-color: #a0a09a #90908a #70706a #90908a; outline: none; cursor: pointer; }
	.form-o .w .p textarea { width: 100%; height: 72px; border-radius: 2px; color: #000; padding: 5px 8px; background-color: #fdfdfd; font-size: 11px; border: none; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #a0a09a #90908a #70706a #90908a; }
	.form-o .w .p label { display: block; font-size: 11px; margin: 10px 0 4px 2px; color: #111; }
	.form-o .w .p button { width: 100%; height: 28px; border-radius: 2px; color: #000; padding: 7px 8px 8px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer;border-style: solid; border-width: 1px; border-color: #a0a09a #90908a #70706a #90908a; }
	.form-o .w div.info { font-size: 10px; padding: 2px 8px; }

	.p .h { iborder-bottom: 1px solid #f0f0f0; display: grid; grid-template-columns: auto 200px; margin-bottom: 0px; color: #505040; }
	.p .h .name { font-weight: 600; }
	.p .h .butt { text-align: right }
	.p .h .butt button { border-width: 1px; border-style: outset; border-color: #f0f0f0; font-size: 11px; background: linear-gradient(to bottom, #e6d1d8, #f5f5dc); padding: 2px 8px; }

	.p .u { padding: 16px; border-bottom: 1px solid #f8f8f2; }
	.p .v { padding: 16px; background-color: #fbfbf7; }

	.p .r { position: relative; }
	.p .r .c { display: grid; margin-bottom: 5px; }
	.p .u .r.a .c { grid-template-columns: auto 140px auto 125px }
	.p .u .r.d .c { grid-template-columns: 100px auto 158px 108px 120px }
	.p .u .r.d .c > div { position: relative; }
	.p .u .r.b .c { grid-template-columns: auto 286px }
	
	.p .v .r.a { display: grid; grid-template-columns: 50% 50% }
	.p .v .r.a .c {}
	.p .v .r.a .c div { margin-bottom: 8px; position: relative; }
	.p .v .r.a .c fieldset legend { font-size: 11px; padding: 5px 8px; }
	.p .v .r.a .c fieldset { background-color: #fff; border: 1px solid #e0e0da; padding: 12px; }
	.p .v .r.a .c div svg { position: absolute; width: 12px; right: 12px; color: #505050; top: 6px; right: 8px; }

	.q .t .a { padding: 12px; }
	.q .t .a .h { padding: 5px 0 0 0; font-weight: 600; color: #303030; }
	.q .t .a .g {}
	.q .t .a .g div { display: grid; grid-template-columns: auto 70px; margin: 8px 0; }
	.q .t .a .g div input { height: 28px; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #a0a09a #90908a #70706a #90908a; }
	.q .t .a .g div ::placeholder { color: #222; }

	.q .t .b { padding: 12px; }
	.q .t .b fieldset legend { font-size: 11px; padding: 5px 8px; }
	.q .t .b fieldset { background-color: #fff; border: 1px solid #e0e0da; padding: 12px; }
    .q .t .b fieldset .list { height: 220px; background-color: #fff; border: 1px solid #f8f8f2; overflow-y: scroll; }
    .q .t .b fieldset .list .l { padding: 7px 4px; border-bottom: 1px solid #f8f8f2; position: relative; color: #222; }
    .q .t .b fieldset .list .l svg { width: 10px; height: 10px; color: #c0c0c0; }
    .q .t .b fieldset .list .l span { margin-left: 10px; font-size: 11px; }
    .q .t .b fieldset .list .l i { font-style: normal; position: absolute; top: 8px; right: 8px; font-size: 10px; color: #222; }
    .q .t .b fieldset .list .l:hover, .p .b .f.h fieldset .list .l.active { background-color: #f0f0ea; color: #222; }
	.q .t .b div svg { position: absolute; width: 12px; right: 12px; color: #505050; top: 6px; right: 8px; }

	.q .s {text-align: center; background-color: #f0f0ea; height: 70px; padding: 20px 0; }
	.q .s button {}
	.q .s button svg { height: 10px; width: 10px; color: #808080; }
	.q .s button.okay { border: 1px outset #e0e0d0; color: #000; }
	.q .s button.okay svg { color: #000; }

	.v { position: relative; }

	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }
	.dp-wrap { position: absolute; top: 150px; left: calc((100% - 300px) / 2); z-index: 9999; }
	.dp-back { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.15) }

</style>
