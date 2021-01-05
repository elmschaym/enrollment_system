<template>
	<div>
		<div class="form-o">
			<div class="w">
				<div class="p">
					<div class="u">
						<div class="h">
							<div class="name">Basic Information</div>
						</div>
						<div class="r a">
							<div class="c">
								<div>
									<label for="">First Name</label>
									<input style="width: 95%" v-model="student.firstname"/>
								</div>
								<div>
									<label for="">Middle Name</label>
									<input style="width: 95%" v-model="student.middlename"/>
								</div>
								<div>
									<label for="">Last Name</label>
									<input style="width: 95%" v-model="student.lastname"/>
								</div>
								<div>
									<label for="">Student ID</label>
									<button>{{ student.school_id }}</button>
								</div>
							</div>
						</div>
						<div class="r d">
							<div class="c">
								<div>
									<label for="">Gender</label>
									<ui-select @setValue="setStudentGender" :options="$store.state.forms.student.gender" :styles="['border-radius: 2px; width: 90%; padding: 5px 10px 5px 10px']"></ui-select>
								</div>
								<div>
									<label for="">Religion</label>
									<input style="width: 95%" placeholder="" v-model="student.religion"/>
								</div>
								<div>
									<label for="">Civil Status</label>
									<ui-select @setValue="setStudentCivilStatus" :options="$store.state.forms.student.civil_status" :styles="['border-radius: 2px; width: 90%; padding: 5px 10px 5px 10px', '']"></ui-select>
								</div>
								<div>
									<label for="">Date of Birth</label>
									<input v-model="student.birthdate" type="date"/>
								</div>
							</div>
							
						</div>
						<div class="r b">
							<div class="c">
								<div>
									<label for="">Home Address</label>
									<textarea v-model="student.home_address" style="width: 95%"></textarea>
									<div class="info"></div>
								</div>
								<div>
									<label for="">Campus Address</label>
									<textarea v-model="student.campus_address"></textarea>
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
							<div class="c">
								<div>
									<label for="">First Name</label>
									<input style="width: 95%" v-model="studentx.mother_firstname" placeholder="Mother"/>
								</div>
								<div>
									<label for="">Middle Name</label>
									<input style="width: 95%" v-model="studentx.mother_middlename" placeholder="Mother"/>
								</div>
								<div>
									<label for="">Last Name</label>
									<input style="width: 95%" v-model="studentx.mother_lastname" placeholder="Mother"/>
								</div>
								<div>
									<label for="">Occupation</label>
									<input style="width: 95%" v-model="studentx.mother_occupation" placeholder="Mother"/>
								</div>
							</div>
						</div>
						<div class="r a">
							<div class="c">
								<div>
									<label for="">First Name</label>
									<input style="width: 95%" v-model="studentx.father_firstname" placeholder="Father"/>
								</div>
								<div>
									<label for="">Middle Name</label>
									<input style="width: 95%" v-model="studentx.father_middlename" placeholder="Father"/>
								</div>
								<div>
									<label for="">Last Name</label>
									<input style="width: 95%" v-model="studentx.father_lastname" placeholder="Father"/>
								</div>
								<div>
									<label for="">Occupation</label>
									<input style="width: 95%" v-model="studentx.father_occupation" placeholder="Father"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="q">
					<div class="r b">
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
					<div class="r a">
						<div class="sav">
							<button :class="isFormOkay ? 'okay' : ''" @click="goSaveStudent()" :disabled="isSavingForm || !isFormOkay"><v-icon name="plus"></v-icon> Save Information</button>
						</div>
					</div>
				</div>
			</div>
			<ui-modal v-if="isGenSIDError" @modalClose="modalAClose" class="moda-l">
				<span slot="name">Connection Error</span>
				<div slot="body-text">
					There was an error connecting on server. Please contact your server administrator to fix this issue. <br/><span style="font-size: 10px">Error Code: 400 No Connection</span>
				</div>
				<div slot="body-okay">
					<button @click="modalAClose()">Reconnect</button>
				</div>
			</ui-modal>
			<ui-modal v-if="isSubmitError" @modalClose="modalBClose" class="moda-l">
				<span slot="name">Internal Error</span>
				<div slot="body-text">
					There was an error processing your request. Please contact your server administrator to fix this issue. <br/><span style="font-size: 10px">Error Code: 401 Bad Request</span>
				</div>
				<div slot="body-okay">
					<button @click="modalBClose()">Okay</button>
				</div>
			</ui-modal>
			<ui-loader v-if="isSavingForm"></ui-loader>
		</div>
	</div>
</template>

<script>
	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';
	import UIModal from '@/components/UIModal.vue';
	import { WebCam } from 'vue-web-cam';

	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/chevron-right';

	export default {
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			UiModal: UIModal,
			VueWebCam: WebCam
		},
		data() {
			return {
				isSavingForm: false,
				isGenSIDError: false,
				isSubmitError: false,
				student: { school_id: '', firstname: '', middlename: '', lastname: '', gender: '', religion: '', civil_status: '', birthdate: '', home_address: '', campus_address: ''},
				studentx: { mother_occupation: '', mother_lastname: '', mother_middlename: '', mother_firstname: '', father_occupation: '', father_lastname: '', father_middlename: '', father_firstname: '' },
				cameraCapturedImage: null,
				camera: null,
				deviceId: null,
				devices: [],
				isCameraCapture: true
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
						this.$router.push({ name: 'stu-new-saved' });
					}).catch( () => {
						this.isSubmitError = true;
						this.isSavingForm = false;
					}).finally( () => {
						this.$sleep(2500).then( () => { this.isSavingForm = false });
					});
				}
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
			this.genStudentID();
			this.isCameraCapture = false;
		}
	}
</script>

<style scoped>
	.form-o { position: relative; height: calc(100vh - 48px);  }
	.form-o .w { display: grid; grid-template-columns: auto 312px; }
	.form-o .w .p { padding: 0 16px; }
	.form-o .w .q { border-left: 1px solid #f0f0f0; height: calc(100vh - 48px); background: linear-gradient(to right, #f8f8f8, #fcfcfc); }

	.form-o .w .p input { width: 100%; height: 28px; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
	.form-o .w .p select { border-radius: 5px; color: #000; padding: 5px 12px 5px 12px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; font-size: 11px; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; outline: none; cursor: pointer; }
	.form-o .w .p textarea { width: 100%; height: 50px; border-radius: 2px; color: #000; padding: 5px 8px; background-color: #fdfdfd; font-size: 11px; border: none; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
	.form-o .w .p label { display: block; font-size: 11px; margin: 10px 0 4px 2px; color: #111; }
	.form-o .w .p button { width: 100%; height: 28px; border-radius: 2px; color: #000; padding: 7px 8px 8px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer;border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
	.form-o .w div.info { font-size: 10px; padding: 2px 8px; }

	.p .h { padding: 0 0 8px 0; border-bottom: 1px solid #f0f0f0; display: grid; grid-template-columns: 418px 200px; margin-bottom: 0px; color: #505040; }
	.p .h .name { font-weight: bold; }
	.p .h .butt { text-align: right }
	.p .h .butt button { border-width: 1px; border-style: outset; border-color: #f0f0f0; font-size: 11px; background: linear-gradient(to bottom, #e6d1d8, #f5f5dc); padding: 2px 8px; }

	.w .p .r { position: relative; }
	.w .p .r .c { display: grid; margin-bottom: 5px; }
	.p .r.a .c { grid-template-columns: 200px 140px 170px 125px }
	.p .r.d .c { grid-template-columns: 100px 207px 158px 170px }
	.p .r.d .c > div { position: relative; }
	.p .r.b .c { grid-template-columns: 350px 286px }
	.p .u {}
	.p .u, .p .v {  padding: 16px 16px 0 16px; }

	.w .q .r { position: relative; }
	.q .r .h { padding: 8px 6px; position: relative; }
	.q .r .h span { width: 22px; height: 14px; display: inline-block; border: 1px solid #b0b0b0; margin-right: 8px; float: right; font-size: 8px; text-transform: uppercase; padding: 2px; cursor: pointer; text-align: center; }
	.q .r .h span.active { background-color: #808080; color: #fff; }
	.q .r .h b { display: inline-block; padding: 2px 8px; color: #808080; font-weight: normal; font-size: 10px; }
	.q .r .h b.active { color: #202020; }
	.q .r .g { margin: 0 12px; }

	.q .r.a { height: 347px; }

	.q .r.b { border-bottom: 1px solid #f0efef; padding: 8px; }
	.q .r.b .cam { height: 220px; background-color: #222; position: relative; }
	.q .r.b .cam code { position: absolute; font-size: 10px; color: #fff; text-shadow: 0 1px 1px #444; top: 4px; left: 12px; right: 4px; text-align: left; }
	.q .r.b .cam .dev { position: absolute; bottom: 4px; left: 12px; right: 4px; text-align: center; }
	.q .r.b .cam .dev select { color: #fff; padding: 2px 6px 2px 6px; border: 1px solid #f0f0f0;  background-color: rgba(0,0,0,0.15); font-size: 11px; border: none; outline: none; cursor: pointer; }

	.q .r.b .cam .can { height: 220px; }
	.q .r.b .cam .pic { height: 220px;  background-color: #222; }
	.q .r.b .cam .pic img { display: block; width: 100%; height: 220px; margin: 0 auto; }

	.q .r.b .but { padding: 4px 0; }
	.q .r.b .but .m button { height: 20px; font-size: 10px; border: none; box-shadow: 0 1px 3px rgba(0,0,0,0.12);  margin-right: 4px; background-color: #fff }
	.q .r.b .but .m {}
	.q .r.b .but .n { text-align: center }

	.q .r.a .sav { position: absolute; bottom: 0; left: 0; right: 0; text-align: center; background-color: #f0f0ea; height: 70px; padding: 20px 0; }
	.q .r.a .sav button { height: 24px; padding: 4px 12px; border: 1px solid #e0e0d0; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0); border-radius: 2px; font-size: 10px; color: #888; }
	.q .r.a .sav button svg { height: 10px; width: 10px; color: #808080; }
	.q .r.a .sav button.okay { border: 1px outset #e0e0d0; color: #000; }
	.q .r.a .sav button.okay svg { color: #000; }

	.form-o .o {}

	.v { position: relative; }
	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }
</style>
