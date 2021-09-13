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
								<input style="width: 95%" v-model="student.firstname" placeholder="First Name" maxlength="32"/>
							</div>
							<div>
								<input style="width: 95%" v-model="student.middlename" placeholder="Middle Name" maxlength="32"/>
							</div>
							<div>
								<input style="width: 95%" v-model="student.lastname" placeholder="Last Name" maxlength="32"/>
							</div>
							<div style="display: grid; grid-template-columns: 32px auto">
								<span style="height: 28px; border-radius: 2px; color: #000; padding: 7px 8px 8px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer;border-style: solid; border-width: 1px 0 1px 1px; border-color: #a0a09a #90908a #70706a #90908a;"><v-icon name="id-card"></v-icon></span><button>{{ student.school_id }}</button>
							</div>
						</div>
					</div>
					<div class="r d">
						<div class="c">
							<div>
								<label for="">Gender</label>
								<ui-select @setValue="setStudentGender" :options="$store.state.forms.student.gender" :styles="['border-radius: 2px; width: 90%; padding: 5px 10px 5px 10px; border-color: #a0a09a #90908a #70706a #90908a;']"></ui-select>
							</div>
							<div>
								<label for="">Religion</label>
								<input style="width: 95%" placeholder="" v-model="student.religion" maxlength="32" />
							</div>
							<div>
								<label for="">Civil Status</label>
								<ui-select @setValue="setStudentCivilStatus" :options="$store.state.forms.student.civil_status" :styles="['border-radius: 2px; width: 90%; padding: 5px 10px 5px 10px; border-color: #a0a09a #90908a #70706a #90908a;', '']"></ui-select>
							</div>
							<div>
								<label for="">Date of Birth</label>
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
								<textarea v-model="student.home_address" style="width: 95%" placeholder="Home Address" maxlength="255" ></textarea>
								<div class="info"></div>
							</div>
							<div>
								<textarea v-model="student.campus_address" placeholder="Campus Address" maxlength="255" ></textarea>
								<div class="info"></div>
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
										<input style="width: 100%" v-model="studentx.father_fname" placeholder="First Name" maxlength="32" />
									</div>
									<div>
										<input style="width: 100%" v-model="studentx.father_mname" placeholder="Middle Name"  maxlength="32" />
									</div>
								</div>
								<div style="display: grid; grid-template-columns: 120px auto">
									<div style="padding-right: 10px">
										<input style="width: 100%" v-model="studentx.father_lname" placeholder="Last Name" maxlength="32" />
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
							<fieldset>
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
						</div>
					</div>
				</div>
				<date-picker class="dp-wrap" @selected="setBirthdateDP($event)" v-if="isDatePickerShow" format="yyyy-MM-dd" :inline="true"></date-picker>
				<div class="dp-back" v-if="isDatePickerShow"></div>
			</div>
			<div class="q">
				<div class="c">
					<div class="cam">
						<code v-if="device">{{ device.label }}</code>
						<div class="can" v-if="isCameraCapture">
							<vue-web-cam ref="webcam" :device-id="deviceId" width="100%" height="220px" @cameras="onCameras" @camera-change="onCameraChange"/>
						</div>
						<div class="pic" v-else>
							<img v-if="cameraCapturedImage != null" :src="cameraCapturedImage"/>
						</div>
						<div class="dev">
							<select v-model="camera">
								<option>-- Select Web Camera --</option>
								<option v-for="device in devices" :key="device.deviceId" :value="device.deviceId">{{ device.label }}</option>
							</select>
						</div>
					</div>
					<div class="but">
						<div class="m">
							<button @click="onCameraStart">Start</button> 
							<button @click="onCameraStop">Stop</button>
							<button @click="onCameraClear">Clear</button> 
							<button v-if="isCameraCapture" @click="onCameraCapture" style="float: right">Capture</button>
						</div>
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
	import { WebCam } from 'vue-web-cam';

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
			VueWebCam: WebCam,
			DatePicker
		},
		data() {
			return {
				isSavingForm: false,
				isGenSIDError: false,
				isSubmitError: false,
				student: { school_id: '', firstname: '', middlename: '', lastname: '', gender: '', religion: '', civil_status: '', birthdate: '', home_address: '', campus_address: ''},
				studentx: { mother_occupation: '', mother_lname: '', mother_mname: '', mother_fname: '', father_occupation: '', father_lname: '', father_mname: '', father_fname: '', telephone_number: '', mobile_number: '', email_address: '' },
				cameraCapturedImage: null,
				camera: null,
				deviceId: null,
				devices: [],
				isCameraCapture: true,
				isDatePickerShow: false
			}
		},
		computed: {
			isFormOkay() {
				let isStudFormOkay = true;
				for (let o in this.student)
					isStudFormOkay = isStudFormOkay && this.student[o] != '';
				return isStudFormOkay && this.student.school_id != 'Generate';
			},
			device: function() {
				return this.devices.find(n => n.deviceId === this.deviceId);
			}
		},
		methods: {
			genStudentID() {
				this.$http.get('gen_student_id/').then( res => {
					this.student.school_id = res.data.stud_id;
				}).catch( () => {
					this.isGenSIDError = true;
				}).finally( () => {
					this.isSavingForm = false;
				});
			},
			goSaveStudent() {
				this.isSavingForm = true;
				if (this.isFormOkay) {
					this.$http.post('student/', Object.assign({}, this.student, this.studentx)).then( res => {
						let data = res.data;
						this.$storageSet('stu_student', { id: data.id, fullname: data.lastname +', '+ data.firstname +' '+ data.middlename, school_id: data.school_id }, 'session');
						this.$router.push({ name: 'adm-create-student-admit' });
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
			onCameraCapture() {
				this.cameraCapturedImage = this.$refs.webcam.capture();
				this.onCameraStop();
				this.isCameraCapture = false;
				this.$storageSet('stud_photo_1', this.cameraCapturedImage, 'session');
			},
			onCameraStop() {
				this.isCameraCapture = false;
				this.$refs.webcam.stop();
			},
			onCameraClear() {
				this.cameraCapturedImage = null;
			},
			onCameraStart() {
				this.isCameraCapture = true;
				this.$refs.webcam.start();
			},
			onCameras(cameras) {
				this.devices = cameras;
			},
			onCameraChange(deviceId) {
				this.deviceId = deviceId;
				this.camera = deviceId;
			},
			getRandomInt(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			modalAClose(v) {
				this.isGenSIDError = false;
				this.genStudentID();
			},
			modalBClose(v) {
				this.isSubmitError = false;
			}
		},
		watch: {
			camera(id) {
				this.deviceId = id;
			},
			devices() {
				const [first, ...tail] = this.devices;
				if (first) {
					this.camera = first.deviceId;
					this.deviceId = first.deviceId;
				}
			},
			'$store.state.isReloadView'() {
				this.genStudentID();
			}
		},
		created() {
			this.$store.commit('setModuleName', 'Students – New Student');
		},
		mounted() {
			this.genStudentID();
			this.isCameraCapture = false;
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
	.p .u .r.d .c { grid-template-columns: 100px auto 158px 170px }
	.p .u .r.d .c > div { position: relative; }
	.p .u .r.b .c { grid-template-columns: auto 286px }
	
	.p .v .r.a { display: grid; grid-template-columns: 50% 50% }
	.p .v .r.a .c {}
	.p .v .r.a .c div { margin-bottom: 8px; position: relative; }
	.p .v .r.a .c fieldset legend { font-size: 11px; padding: 5px 8px; }
	.p .v .r.a .c fieldset { background-color: #fff; border: 1px solid #e0e0da; padding: 12px; }
	.p .v .r.a .c div svg { position: absolute; width: 12px; right: 12px; color: #505050; top: 6px; right: 8px; }

	.q .c { border-bottom: 1px solid #f0efef; padding: 8px; }
	.q .c .cam { height: 220px; background-color: #222; position: relative; }
	.q .c .cam code { position: absolute; font-size: 10px; color: #fff; text-shadow: 0 1px 1px #444; top: 4px; left: 12px; right: 4px; text-align: left; }
	.q .c .cam .dev { position: absolute; bottom: 4px; left: 12px; right: 4px; text-align: center; }
	.q .c .cam .dev select { color: #fff; padding: 2px 6px 2px 6px; border: 1px solid #f0f0f0;  background-color: rgba(0,0,0,0.15); font-size: 11px; border: none; outline: none; cursor: pointer; }

	.q .c .cam .can { height: 220px; }
	.q .c .cam .pic { height: 220px;  background-color: #222; }
	.q .c .cam .pic img { display: block; width: 100%; height: 220px; margin: 0 auto; }

	.q .c .but { padding: 4px 0; }
	.q .c .but .m button { height: 20px; font-size: 10px; border: none; box-shadow: 0 1px 3px rgba(0,0,0,0.12);  margin-right: 4px; background-color: #fff }
	.q .c .but .m {}
	.q .c .but .n { text-align: center }

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
