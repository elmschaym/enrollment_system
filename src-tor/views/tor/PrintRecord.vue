<template>
	<div class="_wrp_m">
		<div class="_w">
			<div class="p">
				<div class="g">
					<find-e-student @setValue="setStudIDFromSearch" :query="'studentf_is_new=0'" :fields="'id,school_id,firstname,middlename,lastname,gender,birthdate,home_address,religion,citizenship,civil_status,father_fname,father_lname,father_mname,educ_elem_name,educ_elem_year,educ_hsjr_name,educ_hsjr_year,educ_hssr_name,educ_hssr_year,educ_col0_name,educ_col0_year,photo,studcourse&course_fields=id,name,name_alias,program_type'"></find-e-student>
				</div>
				<div class="h">
					<div class="a">
						<span>Select Transcript Type</span>
						<ui-select @setValue="setTranscriptRemakrs" :options="remarks" :styles="['width: 100%']" :presets="remarks[0]"></ui-select>
					</div>
				</div>
			</div>
			<div class="q">
				<div v-if="student.hasOwnProperty('id')" class="s">
				</div>
				<div v-if="student.hasOwnProperty('id')" class="t">
					<div class="u">
						<div class="w">
							<div class="g" v-if="subjGrades.length > 0">
								<div class="i" v-for="(y,i) in subjGrades" :key="'sc_y_'+ i" v-show="false">
									<div class="name"><v-icon name="square"></v-icon> {{ y.name }}</div>
									<div class="head">
										<div>Code</div>
										<div>Name</div>
										<div>Units</div>
										<div>Grade</div>
										<div>Grade (Final)</div>
										<div>Taken</div>
									</div>
									<div class="list" v-if="y.subs.length > 0">
										<div class="l" v-for="(s,i) in y.subs" :key="'sc_s_'+ y.name +'_'+ i">
											<div>{{ s.subject.code }}</div>
											<div>{{ s.subject.name }}</div>
											<div>{{ s.subject.units }}</div>
											<div>{{ s.grade }}</div>
											<div>{{ s.grade_final }}</div>
											<div>{{ s.taken }}</div>
										</div>
									</div>
								</div>
								<print-tor v-if="student.hasOwnProperty('id')" :subjGrades="subjGrades" :transcript="transcript" :student="student" :school="school"></print-tor>
							</div>
							<div v-else class="g"></div>
							<div class="h">
								<div class="x">Required Units: <span>0</span></div>
								<div class="x">Assigned Units: <span>{{ totalAssignedUnits }}</span></div>
								<div class="y">
									<button @click="printTranscript()"><v-icon name="print"></v-icon> Print</button>
								</div>
							</div>
						</div>
						<ui-loader v-if="isFetchingList || isSavingPrint" :opacity="0.8"></ui-loader>
					</div>
				</div>                
			</div>
		</div>
		<div id="print-tor">
			<print-tor v-if="student.hasOwnProperty('id')"  :subjGrades="subjGrades" :transcript="transcript" :student="student" :school="school"></print-tor>
		</div>
		<ui-modal-informer v-if="isNoDetails" @informedOkay="modalBClose" class="moda-l">
			<div slot="text">
				Error. Incomplete Transcript Details. Click <b>Okay</b> to proceed.
			</div>
		</ui-modal-informer>
		<ui-loader v-if="isSavingForm"></ui-loader>
	</div>
</template>

<script>
	import FindEStudent from '@/components/FindEStudent.vue';
	import UILoader from '@/components/UILoader.vue';
	import UISelect from '@/components/UISelect.vue';
	import PrintTOR from '@/components/PrintTOR.vue';
	import UIModalInformer from '@/components/UIModalInformer.vue';

	import 'vue-awesome/icons/print';
	import 'vue-awesome/icons/square';

	export default {
		emits: ['setViewName'],
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			FindEStudent,
			PrintTor: PrintTOR,
			UiModalInformer: UIModalInformer,
		},
		data() {
			return {
				isFetchingList: false,
				isGenRIDError: false,
				isSavingPrint: false,
				isConnectError: false,
				isNoDetails: false,
				departments: [],
				student: {},
				subjGrades: [],
				totalAssignedUnits: 0,
				remarks: [
					{ id: 'GTC', name: 'GRANTED TRANSFER CREDENTIALS' },
					{ id: 'LBE', name: 'LICENSURE BOARD EXAMINATION' },
					{ id: 'FJA', name: 'FOR JOB APPLICATION' }
				],
				transcript: { remarks: 'GTC', ref_id: 0 },
				transcriptPrint: {},
				school: { address: 'Amai Manabilang St., Raya Madaya, Marawi City, Lanao del Sur, 9700, Philippines', tel_no: '0917-7106-654', fax_no: '', website: '', email: 'jpi_50@yahoo.com', checked_by: '', prepared_by: '', registrar_oic: '' }
			}
		},
		methods: {
			setTranscriptRemakrs(v) {
				this.transcript.remarks = v;
			},
			setStudIDFromSearch(v) {
				this.student = v;
				this.subjGrades = [];
				this.totalAssignedUnits = 0;
				this.genTORRefID();
				this.fetchSubjGrades();
			},
			genTORRefID() {
				this.$http.get('gen_torref_id/').then( res => {
					this.transcript.ref_id = res.data.ref_id;
				}).catch( () => {
					this.isGenRIDError = true;
				}).finally( () => {
				});
			},
			fetchSubjGrades() {
				this.isFetchingList = true;
				this.$http.get('subject_grade/?action=lister&subjgrade_fields=id,subject,recom_year_lvl,recom_semester,grade,grade_final,taken&subject_fields=id,code,name,units&subjrequisite_fields=id,requisite&subject_fields_alt=id,code&refer=transcript&stuid='+ this.student.id).then(res => {
					let data = [], names = ['Preparatory', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
					res.data.forEach(d => {
						let pos = -1;
						if (data.length > 0)
							pos = data.findIndex(s => s.code == (d.recom_year_lvl +'_'+ d.recom_semester));
						if (pos == -1) {
							data.push({
								code: d.recom_year_lvl +'_'+ d.recom_semester,
								name: names[d.recom_year_lvl] +' Year – '+ d.recom_semester +' Semester',
								subs: []
							});
							pos = data.findIndex(s => s.code == (d.recom_year_lvl +'_'+ d.recom_semester));
						}
						this.totalAssignedUnits += d.subject.units;
						data[pos].subs.push(d);
					});
					data.forEach(d => {
						d.subs.sort((a, b) => {
							if ( a.recom_semester < b.recom_semester ) return -1;
							if ( a.recom_semester > b.recom_semester ) return 1;
							return 0;
						});
					});
					data.sort((a, b) => {
						if ( a.code < b.code ) return -1;
						if ( a.code > b.code ) return 1;
						return 0;
					});
					this.subjGrades = data;
				}).finally(() => {
					this.isFetchingList = false;
				});
			},
			printTranscript() {
				if (!this.transcriptPrint.hasOwnProperty('id') || (this.transcriptPrint.hasOwnProperty('reference_id') && this.transcriptPrint.reference_id != this.transcript.ref_id)) {
					this.isSavingPrint = true;
					this.$http.post('transcript_print/', { remarks_type: this.transcript.remarks, student: this.student.id, reference_id: this.transcript.ref_id } ).then(res => {
						this.transcriptPrint = res.data;
						this.$htmlToPaper('print-tor');
					}).catch(() => {
						this.isConnectError = true;
					}).finally(() => {
						this.isSavingPrint = false;
					});
				} else {
					this.$htmlToPaper('print-tor');
				}
			},
			modalBClose(v) {
				this.$router.push({ name: 'transcript-details' });
			}
		},
		mounted() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Transcript – Print Records');
			let info = this.$storageGet('tor_details', 'local') || {};
			if (info.hasOwnProperty('address')) {
				this.school = info;
			} else {
				this.isNoDetails = true;
			}
		}
	}
</script>

<style scoped>
	._wrp_m { height: 100%; position: relative; }
	._wrp_m ._w { height: 100%; display: grid; grid-template-columns: 270px auto; }
	._wrp_m ._w .p { height: 100%; background: #f8f8f2; padding: 16px; }
	._wrp_m ._w .q { height: 100%; border-left: 1px solid #f0f0f0; display: grid; grid-template-rows: 32px auto }

	.p .g { height: 270px; }

	.p .h { padding: 20px 0;  }
	.p .h .a span { display: block; font-size: 10px; text-transform: uppercase; padding: 2px 10px; }

	.q .s { padding: 10px; font-size: 12px; font-weight: 600; border-bottom: 1px solid #f0f0ea; }
	.q .t {}
	.q .t .u { height: 100%; position: relative; }
	.q .t .u .w { height: inherit; display: grid; grid-template-columns: auto 200px; position: relative; }
	.q .t .u .w .g { height: 100%; max-height: 560px; overflow-y: scroll; }
	.q .t .u .w .g .i { border-bottom: 1px solid #f8f8f2; padding-bottom: 20px;}
	.q .t .u .w .g .i .name { background-color: #fbfbf7; padding: 5px 10px; font-size: 11px; }
	.q .t .u .w .g .i .name svg { width: 10px; height: 10px; color: #d0d0cc; margin-right: 10px; }
	.q .t .u .w .g .i .head, .q .t .u .w .g .i .list .l { display: grid; grid-template-columns: 75px auto 50px 70px 80px 50px }
	.q .t .u .w .g .i .head div { padding: 5px 10px; font-size: 11px; color: #505050; }
	.q .t .u .w .g .i .list {}
	.q .t .u .w .g .i .list .l {}
	.q .t .u .w .g .i .list .l div { padding: 5px 10px; white-space: nowrap; text-overflow: clip; overflow: hidden; font-size: 11px; }

	.q .t .u .w .h { height: 100%; border-left: 1px solid #f0f0ea; padding: 16px 10px; }
	.q .t .u .w .h div.x { padding-bottom: 6px; color: #222; font-size: 11px; }
	.q .t .u .w .h div.x span { float: right }
	.q .t .u .w .h div.y { padding-bottom: 6px; color: #222; font-size: 11px; }
	.q .t .u .w .h div.y button { background: #fff; border: 1px solid #656763; color: #656763; padding: 2px 5px; border-radius: 2px; font-size: 12px; font-weight: 600; }
	.q .t .u .w .h div.y svg { width: 10px; height: 10px; margin-right: 6px; }

	#print-tor { display: none; }
</style>
