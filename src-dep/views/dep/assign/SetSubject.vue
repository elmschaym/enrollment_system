<template>
	<div class="form-o">
		<div class="w">
			<div class="p">
				<div class="g">
					<div class="r s">
						<div class="pixx">
							<v-icon name="user"></v-icon>
						</div>
						<div class="name">
							<div class="n">{{ student.lastname }}, {{ student.firstname }} {{ student.middlename }}</div>
							<div class="c">{{ student.school_id }}, &nbsp; {{ student.admission[0].course.program_type +' '+ student.admission[0].course.name_alias }}</div>
						</div>
						<div class="butt">
							<button @click="setStudentModalShow()">Switch <v-icon name="user"></v-icon></button>
						</div>
					</div>
					<div class="r o">
						<div class="x">
							<div class="a">Enrolled Subjects <span style="float: right" @click="fetchSubjectsEnrolled()">Refresh</span></div>
							<div class="b">
								<div>Code</div>
								<div>Section</div>
								<div>Week</div>
								<div>Time</div>
								<div>Room</div>
								<div style="text-align: center">Units</div>
							</div>
							<div class="d" v-if="subjects.length > 0">
								<div :class="selectIdH == s.id ? 'active': ''" :key="'subj'+ s.id" v-for="(s,i) in subjects" @contextmenu="subjectListCMenu($event, s, i)">
									<div>{{ s.subject.code }}</div>
									<div>{{ s.section.name }}</div>
									<div>{{ s.section.sched_days }}</div>
									<div>{{ s.section.sched_time }}</div>
									<div>{{ s.section.room.name }}</div>
									<div style="text-align: center">{{ s.subject.units }} </div>
								</div>
							</div>
							<div class="z" v-else>
								No Enrolled Subjects
							</div>
							<div class="e" v-if="student.admission[0].hasOwnProperty('enrollment')">
								<div>{{ totalSubjects }} Subject(s)</div>
								<div style="text-align: right">{{ enrolledUnits }} / {{ allowedUnits}} Allowed Units</div>
							</div>
						</div>
						<div class="y">
							<div class="a">Available Sections <span style="float: right" @click="fetchSections()">Refresh</span></div>
							<div class="b">
								<div></div>
								<div>Code</div>
								<div style="text-align: center">Slots</div>
							</div>
							<div class="d" v-if="sectionsAvailable.length > 0">
								<div :class="selectIdS == s.id ? 'active': ''" :key="'sect'+ s.id" v-for="(s,i) in sectionsAvailable" @click="enrolSection(s.id)" @contextmenu="sectionListCMenu($event, s, i)">
									<div style="text-align: center"><v-icon :class="s.stat == 1 ? 'rr' : (s.stat == 2) ? 'gg' : 'bb'" name="square"></v-icon></div>
									<div>{{ s.name }}</div>
									<div style="text-align: center">{{ s.slots }}</div>
								</div>
							</div>
							<div class="z" v-else>
								No Section Available
							</div>
							<div class="e">
								<span><v-icon class="bb" name="square"></v-icon> Available</span>
								<span><v-icon class="rr" name="square"></v-icon> Conflict</span>
								<span><v-icon class="gg" name="square"></v-icon> Enrolled</span>
							</div>
						</div>
					</div>
					<div class="r t">
						<o-time-schedule v-if="subjects" :subjects="subjects"></o-time-schedule>
					</div>
				</div>
			</div>
			<div class="q">
				<div class="t">
					<list-e-dep-subject @setValue="setSubjectFromSearch" :refer="'enrollment'" :stuid="student.id" :couid="student.admission[0].course.id"></list-e-dep-subject>
				</div>
				<div class="r">
					<div v-if="acadPreference.hasOwnProperty('is_enrollment_open') && !acadPreference.is_enrollment_open">Enrollment is CLOSED</div>
				</div>
				<div class="s">
					<button v-show="student.admission[0].hasOwnProperty('enrollment') && !student.admission[0].enrollment[0].is_confirmed" :class="['br-confirm', isFormOkay ? 'okay' : '']" @click="goSaveSubjects()" :disabled="isSavingForm || !isFormOkay"><v-icon name="plus"></v-icon> Confirm Subjects</button>
				</div>
			</div>
		</div>
		<ui-modal-listener v-if="isSetStudentModalShow" @modalClose="setStudentModalClose" @listenedYes="setStudentFromModal" :listenLabel="isSwitchStudent ? 'Switching...' : 'Switch Student'" :hasBG="true" class="moda-l">
			<div slot="text" style="width: 60%">
				<input v-model="studentID" placeholder="Enter Student ID" autofocus="" />
				<div v-show="isSwitchError" class="e">Student Not Found</div>
			</div>
		</ui-modal-listener>
		<ui-loader v-if="isSavingForm"></ui-loader>
	</div>
</template>

<script>
	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';
	import UIModalListener from '@/components/UIModalListener.vue';
	import OTimeSchedule from '@/components/OTimeSchedule.vue';
	import ListEDepSubject from '@/components/ListEDepSubject.vue';

	import 'vue-awesome/icons/user';
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/id-card';

	export default {
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			UiModalListener: UIModalListener,
			OTimeSchedule,
			ListEDepSubject
		},
		data() {
			return {
				isSetStudentModalShow: true,
				isSavingForm: false,
				isErrorConnect: false,
				isSwitchStudent: false,
				isSwitchError: false,
				studentID: '',
				student: { school_id: 0, firstname: '--', middlename: '--', lastname: '--', admission: [{ course: { program_type: '--', name: '--', name_alias: '--', enrollment: [{ id: 0, billing: [{ id: 0 }] }] }}] },
				sectionsAvailable: [],
				acadPreference: {},
				subjects: [],
				subject: {},
				selectIdH: -1,
				selectIdS: -1
			}
		},
		computed: {
			isFormOkay() {
				return this.subjects.length > 0; // && this.student.admission[0].enrollment[0].is_confirmed == false;
			},
			enrolledUnits() {
				let total = 0;
				this.subjects.forEach(x => { total += x.subject.units });
				return total;
			},
			allowedUnits() {
				return this.student.admission[0].enrollment[0].max_units;
			},
			totalSubjects() {
				return this.subjects.length;
			}
		}, 
		methods: {
			setSubjectFromSearch(v) {
				this.subject = v;
				this.fetchSections();
			},
			setStudentFromModal() {
				if (this.studentID.length > 0) {
					this.fetchStudent();
					this.isSwitchStudent = true;
				}
			},
			setStudentModalShow() {
				this.studentID = '';
				this.isSwitchError = false;
				this.isSetStudentModalShow = true;
			},
			setStudentModalClose(v) {
				if (this.student.school_id != 0) {
					this.isSetStudentModalShow = false;
					this.studentID = '';
				}
			},
			goSaveSubjects() {
				this.isSavingForm = true;
				this.$http.put('enrollment/'+ this.student.admission[0].enrollment[0].id +'/', { admission: this.student.admission[0].id, is_confirmed: true }).then(res => {
					this.$router.push({ name: 'dep-view-enrollee', params: { enrol_id: res.data.id }});
				}).catch( () => {
					this.isErrorConnect = true;
					this.isSavingForm = false;
				});
			},
			fetchSections() {
				this.selectIdS = -1;
				if (this.subject.hasOwnProperty('id')) {
					var irange = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt),
                        crange = (startChar, endChar) => String.fromCharCode(...irange(endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1, startChar.charCodeAt(0)));
					this.$http.get('section/?action=lister&refer=subject&subid='+ this.subject.id +'&section_fields=id,name,sched_days,sched_time,slots').then(res => {
						let data = res.data,
							predata = [];
						data.forEach( d => {
							let s = (this.subjects.length > 0 && this.subjects.some(s => s.section.name == d.name)) ? 1 : (this.subjects.length > 0 && this.subjects.some(s => s.subject.code == this.subject.code)) ? 2 : 0;
							if (this.subjects.length > 0 && s == 0) {
								let w = d.name.toUpperCase(),
									[b, t] = w.split('-');
                                this.subjects.forEach(r => {
									let k = r.section.name.toUpperCase(),
										[f, g] = k.split('-'),
										c = Array.from(f).some(v => b.includes(v));
									if (c && (crange(t[0], t[1]).indexOf(g[1]) > 0 || crange(g[0], g[1]).indexOf(t[1]) > 0))
                                        s = 1;
                                });
							}
							predata.push(Object.assign({}, d, { stat: s }));
						});
						this.sectionsAvailable = predata;
					});
				}
			},
			fetchStudent() {
				this.isSwitchStudent = true;
				this.$http.get('student/'+ this.studentID +'/?type=has-enrol&student_fields=id,school_id,firstname,lastname,middlename,admission&admission_fields=id,course,enrollment&course_fields=id,name,name_alias,program_type&enrollment_fields=id,is_confirmed,max_units,billing&billing_fields=id&admissionf_status=CUR&billingf_is_paid=false&enrollmentf_is_confirmed=false').then(res => {
					if (res.data.hasOwnProperty('id')) {
						this.student = res.data;
						this.isSetStudentModalShow = false;
						this.fetchSubjectsEnrolled();
						this.fetchAcadPreference();
					} else {
						this.isSwitchError = true;
					}
				}).catch( () => {
					this.isSwitchError = true;
				}).finally( () => {
					this.isSwitchStudent = false;
				});
			},
			fetchAcadPreference() {
				this.$http.get('academic_preference/?is_current=true').then(res => {
					if (res.status == 200)
						this.acadPreference = res.data;
				});
			},
			fetchSubjectsEnrolled() {
				this.$http.get('section_enroll/?action=lister&refer=student&stuid='+ this.student.school_id +'&sectenrol_fields=id,subject,section&section_fields=id,name,sched_days,sched_time,room&subject_fields=id,code,units&room_fields=id,name').then(res => {
					this.subjects = res.data;
				});
			},
			sectionListCMenu(e, s) {
				e.preventDefault();
				this.selectIdS = s.id;
				let cmenu = new window.nw.Menu(),
					items = [
						{ label: 'Enrol Section', click: () => this.enrolSection(s), key: 'e', modifiers: "ctrl", enabled: s.slots > 0 && s.stat == 0 && this.acadPreference.hasOwnProperty('is_enrollment_open') && this.acadPreference.is_enrollment_open && ((this.allowedUnits - this.enrolledUnits) >= this.subject.units) },
						{ label: 'Refresh', click: this.fetchSections },
						{ type: 'separator' },
						{ label: s.name + ', ' + s.sched_days +' '+ s.sched_time, enabled: false }
					];
				items.forEach( m => cmenu.append(new window.nw.MenuItem(m)) );
				let zoomFactor = Math.pow(1, window.nwWin.zoomLevel);
				cmenu.popup(
					Math.round(zoomFactor * e.clientX),
					Math.round(zoomFactor * e.clientY)
				);
			},
			subjectListCMenu(e, s) {
				e.preventDefault();
				this.selectIdH = s.id;
				let cmenu = new window.nw.Menu(),
					items = [
						{ label: 'Remove Subject', click: () => this.removeSubject(s), key: 'x', modifiers: "ctrl", enabled: this.acadPreference.hasOwnProperty('is_enrollment_open') && this.acadPreference.is_enrollment_open },
						{ label: 'Refresh', click: this.fetchSubjectsEnrolled },
						{ type: 'separator' },
						{ label: s.subject.code +' – '+ s.subject.units +' units', enabled: false }
					];
				items.forEach( m => cmenu.append(new window.nw.MenuItem(m)) );
				let zoomFactor = Math.pow(1, window.nwWin.zoomLevel);
				cmenu.popup(
					Math.round(zoomFactor * e.clientX),
					Math.round(zoomFactor * e.clientY)
				);
			},
			enrolSection(s,i) {
				this.selectIdS = -1;
				let isSubjectNotEnrolled = this.subjects.some(s => s.subject.code == this.subject.code);
				if (s.stat == 0 && s.slots > 0 && !isSubjectNotEnrolled && this.student.school_id != 0 && this.acadPreference.hasOwnProperty('is_enrollment_open') && this.acadPreference.is_enrollment_open && ((this.allowedUnits - this.enrolledUnits) >= this.subject.units)) {
					this.$http.post('section_enroll/', { section: s.id, billing: this.student.admission[0].enrollment[0].billing[0].id }).then(res => {
						s.slots -= 1;
						s.stat = 2;
						this.$set(this.sectionsAvailable, i, s);
						this.fetchSubjectsEnrolled();
					});
				}
			},
			removeSubject(s) {
				this.selectIdH = -1;
				if (this.acadPreference.hasOwnProperty('is_enrollment_open') && this.acadPreference.is_enrollment_open) {
					this.$http.delete('section_enroll/'+ s.id +'/?subid='+ s.subject.id +'&enrid='+ this.student.admission[0].enrollment[0].id).then(res => {
						this.fetchSubjectsEnrolled();
						this.fetchSections();
					});
				}
			}
		},
		created() {
			this.$store.commit('setModuleName', 'Department – Enrol Student');
		},
		mounted() {
			let stuid = this.$storageGet('dep_set_subject_stuid', 'session');
			if (stuid) {
				this.isSetStudentModalShow = false;
				this.studentID = stuid;
				this.fetchStudent();
				this.$storageDel('dep_set_subject_stuid', 'session');
			}			
		}
	}
</script>

<style scoped>
	.form-o { height: auto; position: relative; }
	.form-o .w { height: 100%; display: grid; grid-template-columns: auto 312px; }
	.form-o .w .p { height: 100%; }
	.form-o .w .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f2; display: grid; grid-template-rows: 420px auto 70px; }

	.p .g {}
	.p .r.s { display: grid; grid-template-columns: 36px auto 100px; padding: 8px 12px; border-bottom: 1px solid #f0f0ea; }
	.p .r.s .pixx { padding: 4px; }
	.p .r.s .pixx svg { height: 24px; width: 24px; margin-bottom: -2px; color: #444; }
	.p .r.s .name { padding: 4px; }
	.p .r.s .name div.n { font-size: 12px; color: #000; font-weight: 600; padding-bottom: 2px; }
	.p .r.s .name div.c { font-size: 12px; color: #222; }
	.p .r.s .name div.n svg { width: 16px; height: 11px; color: #444; margin-right: 2px;  }

	.p .r.s .butt { padding: 8px 0; }
	.p .r.s .butt button { width: 100%; border-radius: 2px; color: #000; padding: 4px 8px 4px 8px; border: none; background-color: #f5f5ed; font-size: 11px; outline: none; cursor: pointer; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.p .r.s .butt button svg { width: 10px; height: 10px; margin-left: 8px; }

	.p .r.o { margin: 10px; }
	.p .r.o { display: grid; grid-template-columns: auto 200px; padding: 8px 0; }
	.p .r.o .x { background-color: #fff; border-right: 1px solid #f0f0f0; iborder-bottom: 1px solid #f0f0f0; }    
	.p .r.o .x .a { font-size: 11px; color: #111; padding: 6px 7px; background-color: #fff; }
	.p .r.o .x .a span { font-size: 10px; background-color: #fff; padding: 2px 4px; border: 1px solid #e0e0da; cursor: pointer; display: inline-block; margin-top: -2px; }
	.p .r.o .x .b, .p .r.o .x .d > div { display: grid; grid-template-columns: 65px 65px 50px auto 60px 40px  }
	.p .r.o .x .z { height: 277px; text-align: center; padding: 16px; font-size: 11px; }
	.p .r.o .x .b { background-color: #f7f7f7; iborder-bottom: 1px solid #fafafa; }
	.p .r.o .x .b div { padding: 7px; font-size: 10px; }
	.p .r.o .x .d { height: 277px; overflow-y: scroll; }
	.p .r.o .x .d > div { cursor: pointer; }
	.p .r.o .x .d > div:hover, .p .r.o .x .d > div.active { background-color: #efefea }
	.p .r.o .x .d > div div { padding: 6px 7px; font-size: 11px; border-bottom: 1px solid #fafafa; }
	.p .r.o .x .e { display: grid; grid-template-columns: 40% 60%; font-size: 10px; color: #111; padding: 6px 7px; border-top: 1px solid #f0f0f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); height: 24px; }

	.p .r.o .y {}
	.p .r.o .y .a { font-size: 11px; color: #111; padding: 6px 0 6px 10px; background-color: #fff; }
	.p .r.o .y .a span { font-size: 10px; background-color: #fff; padding: 2px 4px; border: 1px solid #e0e0da; cursor: pointer; display: inline-block; margin-top: -2px; }
	.p .r.o .y .b, .p .r.o .y .d > div { display: grid; grid-template-columns: 30px auto 86px }
	.p .r.o .y .b { border-bottom: 1px solid #fafafa; background-color: #f7f7f7; }
	.p .r.o .y .b div { padding: 7px 12px; font-size: 10px; }
	.p .r.o .y .d { height: 276px; overflow-y: scroll; }
	.p .r.o .y .d > div div { padding: 6px 12px; font-size: 11px; }
	.p .r.o .y .d > div div svg { width: 10px; height: 10px; }
	.p .r.o .y svg.rr { color: #fa897b; }
	.p .r.o .y svg.bb { color: #9ee1e2; }
	.p .r.o .y svg.gg { color: #d0d0d0; }
	.p .r.o .y .d > div { cursor: pointer; border-bottom: 1px solid #fafafa; }
	.p .r.o .y .d > div:hover,	.p .r.o .y .d > div.active { background-color: #efefea }
	.p .r.o .y .z { height: 276px; text-align: center; padding: 16px; font-size: 11px; }
	.p .r.o .y .e { height: 24px; font-size: 10px; display: grid; grid-template-columns: 33% 34% 33%; padding: 6px 7px; border-top: 1px solid #f0f0f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.p .r.o .y .e span { display: block; text-align: center; }
	.p .r.o .y .e span svg { height: 10px; width: 10px; }

	.p .r.t { border-top: 4px solid #c0c0ba; padding: 0 0 10px 0; margin: 0 10px; }

	.q .t { position: relative; padding: 12px; }

	.q .r { height: 62px; padding: 12px; }
	.q .r div { color: #fd4646; background-color: #fde6e6; padding: 12px 6px; text-align: center; box-shadow: 0 1px 2px rgba(0,0,0,0.2); }

	.q .s { text-align: center; background-color: #f0f0ea; height: 70px; padding: 20px 0; }
	.q .s button {}
	.q .s button svg { height: 10px; width: 10px; color: #808080; }
	.q .s button.okay { border: 1px outset #e0e0d0; color: #000; }
	.q .s button.okay svg { color: #000; }

	.form-o .o {}

	.moda-l .n { font-size: 12px; }
	.moda-l input { width: 100%; display: block; text-align: center; color: #000; padding: 6px 8px 6px 8px; border: none; font-size: 14px; outline: none; cursor: pointer; margin: 10px auto; border-bottom: 1px solid #bebeb9; }
	.moda-l .e { color: #cd4646; text-align: center;padding: 6px; width: 90%; margin: 0 auto; }
	.moda-l input::placeholder { color: #222; }

	.v { position: relative; }
	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }
</style>
